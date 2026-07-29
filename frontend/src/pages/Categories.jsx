import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useStore } from '../context/StoreContext';
import useSEO from '../hooks/useSEO';

export default function Categories() {
  const { activeStore } = useStore();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({ title: 'Collection Management', description: 'Organize products into store collections.' });

  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const storeId = activeStore?.id || 1;
      const res = await api.get(`/categories?store_id=${storeId}`);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setCategories(res.data);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.debug('Failed to fetch categories', err);
    }
    const saved = localStorage.getItem("aureum_owner_categories");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCategories(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {}
    }
    setCategories([]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [activeStore]);

  const handleOpenCreate = () => {
    setEditingCat(null);
    setName('');
    setDescription('');
    setFeatured(false);
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCat(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setFeatured(cat.featured || false);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const newCategoryItem = {
      id: editingCat?.id || Date.now(),
      name,
      description,
      featured,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      products_count: editingCat?.products_count || 0
    };

    try {
      const payload = {
        store_id: activeStore?.id || 1,
        name,
        description,
        featured,
      };

      if (editingCat) {
        await api.put(`/categories/${editingCat.id}`, payload);
      } else {
        await api.post('/categories', payload);
      }
    } catch (err) {
      console.debug('API category save fallback to local state', err);
    }

    setCategories(prev => {
      let updated;
      if (editingCat) {
        updated = prev.map(c => c.id === editingCat.id ? { ...c, ...newCategoryItem } : c);
      } else {
        updated = [newCategoryItem, ...prev];
      }
      localStorage.setItem("aureum_owner_categories", JSON.stringify(updated));
      return updated;
    });

    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category? Associated products will be un-categorized.')) {
      try {
        await api.delete(`/categories/${id}`);
      } catch (err) {
        console.debug('API delete category fallback', err);
      }
      setCategories(prev => {
        const updated = prev.filter(c => c.id !== id);
        localStorage.setItem("aureum_owner_categories", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark m-0">Collection Management</h2>
          <p className="text-muted fs-7 m-0">Organize items for <strong>{activeStore?.name || 'My Store'}</strong></p>
        </div>
        <button className="btn btn-shopify" onClick={handleOpenCreate}>
          + Add Collection
        </button>
      </div>

      <div className="shopify-card p-4">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-success" role="status"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-5 text-center my-2 rounded-3" style={{ background: "#0e0d0b", border: "1px dashed rgba(212,175,55,0.4)" }}>
            <div className="w-16 h-16 rounded-circle bg-warning bg-opacity-15 text-warning d-inline-flex align-items-center justify-content-center mb-3 fs-3">
              🏷️
            </div>
            <h2 className="fs-4 font-bold text-white mb-2">No Collections Created Yet</h2>
            <p className="fs-7 text-muted max-w-md mx-auto mb-4" style={{ maxWidth: 460, lineHeight: 1.6 }}>
              Your store catalog doesn't have any collections yet. Click the button below to add your first product collection with custom description and slug.
            </p>
            <button onClick={handleOpenCreate} className="btn btn-shopify py-2.5 px-4 font-bold fs-7">
              + Add Your First Collection
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="shopify-table">
              <thead>
                <tr>
                  <th>Collection Name</th>
                  <th>Slug</th>
                  <th>Description</th>
                  <th>Products Count</th>
                  <th>Featured</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No collections created yet.</td>
                  </tr>
                ) : (
                  categories.map(cat => (
                    <tr key={cat.id}>
                      <td className="fw-bold text-dark">{cat.name}</td>
                      <td className="text-muted fs-7">/{cat.slug}</td>
                      <td className="text-secondary fs-7">{cat.description || '—'}</td>
                      <td>
                        <span className="badge badge-shopify-info">
                          {cat.products_count ?? 0} Products
                        </span>
                      </td>
                      <td>
                        {cat.featured ? (
                          <span className="badge badge-shopify-success">⭐ Featured</span>
                        ) : (
                          <span className="text-muted fs-8">Standard</span>
                        )}
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate(`/products?categoryId=${cat.id}`)}>
                          View Products
                        </button>
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleOpenEdit(cat)}>
                          ✏️ Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat.id)}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Category Modal */}
      {showModal && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shopify-card border-0">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold">
                  {editingCat ? '✏️ Edit Collection' : '🗂️ Add New Collection'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {errorMsg && <div className="alert alert-danger py-2 fs-7 mb-3">{errorMsg}</div>}

                  <div className="mb-3">
                    <label className="form-label fw-semibold fs-7">Collection Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="e.g. Beauty & Cosmetics"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold fs-7">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Optional collection summary..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="featuredCheck"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                    />
                    <label className="form-check-label fs-7 fw-semibold" htmlFor="featuredCheck">
                      Feature on Storefront Navigation
                    </label>
                  </div>
                </div>

                <div className="modal-footer border-top">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-shopify">
                    Save Collection
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
