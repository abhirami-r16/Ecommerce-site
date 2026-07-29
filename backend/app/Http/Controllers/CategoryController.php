<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::withCount('products');

        if ($request->has('store_id') && $request->store_id) {
            $query->where('store_id', $request->store_id);
        }

        if ($request->has('owner_id') && $request->owner_id) {
            $query->whereHas('store', function ($q) use ($request) {
                $q->where('user_id', $request->owner_id);
            });
        }

        $categories = $query->orderBy('name', 'asc')->get();

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'store_id' => 'nullable|exists:stores,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'featured' => 'nullable|boolean',
        ]);

        $category = Category::create([
            'store_id' => $validated['store_id'] ?? null,
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? '',
            'featured' => $validated['featured'] ?? false,
        ]);

        $category->loadCount('products');

        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = Category::with('products')->withCount('products')->findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'store_id' => 'nullable|exists:stores,id',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'featured' => 'nullable|boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);
        $category->loadCount('products');

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
