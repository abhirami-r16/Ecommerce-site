<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    public function handleGoogleCallback(Request $request)
    {
        try {
            $token = $request->input('token');
            
            // Retrieve user details from Google using the access token
            $googleUser = Socialite::driver('google')->userFromToken($token);
            
            $user = User::where('email', $googleUser->getEmail())->first();
            
            if (!$user) {
                // Register new user as 'owner'
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'password' => Hash::make(Str::random(24)),
                    'role' => 'owner',
                ]);
            }
            
            $tokenResult = $user->createToken('auth_token')->plainTextToken;
            
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $tokenResult
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Authentication failed. Please try again.',
                'error' => $e->getMessage()
            ], 401);
        }
    }
}
