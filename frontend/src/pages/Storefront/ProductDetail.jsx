import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { useStorefrontCart } from '../../context/StorefrontCartContext';
import { useStorefrontAuth } from '../../context/StorefrontAuthContext';

export default function ProductDetail({ storeData, products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useStorefrontCart();
  const { requireAuth } = useStorefrontAuth();

  const product = products.find(p => String(p.id) === String(id) || String(p.backend_id) === String(id) || String(p.slug) === String(id));

  if (!product) {
    return (
      <div className="storefront-container py-5 text-center">
        <h2>Product not found</h2>
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/')}>
          Return to Store
        </button>
      </div>
    );
  }

  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    requireAuth(() => addToCart(product, 1));
  };

  const handleBuyNow = () => {
    requireAuth(() => {
      addToCart(product, 1);
      navigate('/checkout');
    });
  };

  return (
    <div className="storefront-container py-5">
      <button 
        className="btn btn-link text-decoration-none text-secondary mb-4 d-flex align-items-center gap-2 p-0"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} /> Back to Store
      </button>

      <div className="row g-5">
        <div className="col-md-6">
          <div className="product-image-container p-4 bg-white rounded-3 shadow-sm border border-light text-center h-100 d-flex align-items-center justify-content-center position-relative">
            <img 
              src={product.image || product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'} 
              alt={product.name} 
              className="img-fluid rounded" 
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
            <button 
              className="btn position-absolute top-0 end-0 m-3 rounded-circle shadow-sm bg-white"
              style={{ width: '40px', height: '40px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: inWishlist ? '#ff4757' : '#ced4da' }}
              onClick={() => requireAuth(() => toggleWishlist(product))}
            >
              <Heart size={20} fill={inWishlist ? '#ff4757' : 'none'} />
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-info-details">
            {categoryName && (
              <span className="text-uppercase text-muted fs-8 fw-bold mb-2 d-block tracking-wider">
                {categoryName}
              </span>
            )}
            <h1 className="display-6 fw-bold mb-3">{product.name}</h1>
            
            <div className="d-flex align-items-baseline gap-3 mb-4">
              <span className="fs-2 fw-bold text-dark">${Number(product.price).toFixed(2)}</span>
            </div>

            <p className="text-secondary fs-6 mb-4 lh-lg">
              {product.description || 'This premium product is part of our exclusive collection. Crafted with the finest materials and designed to exceed your expectations. Experience the perfect blend of style and functionality.'}
            </p>

            <div className="d-flex gap-3 mb-5">
              <button 
                className="btn btn-lg fw-bold d-flex align-items-center justify-content-center gap-2 flex-grow-1"
                style={{ backgroundColor: '#ff9f00', color: '#fff', border: 'none' }}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button 
                className="btn btn-lg fw-bold d-flex align-items-center justify-content-center gap-2 flex-grow-1"
                style={{ backgroundColor: '#fb641b', color: '#fff', border: 'none' }}
                onClick={handleBuyNow}
              >
                <Zap size={20} /> Buy Now
              </button>
            </div>

            <div className="border-top pt-4">
              <div className="d-flex flex-column gap-2 text-muted fs-7">
                <div className="d-flex gap-2">
                  <strong>Availability:</strong> 
                  <span className={product.stock > 0 || product.stock_quantity > 0 ? 'text-success' : 'text-danger'}>
                    {product.stock > 0 || product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                {product.brand && (
                  <div className="d-flex gap-2">
                    <strong>Brand:</strong> {product.brand}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
