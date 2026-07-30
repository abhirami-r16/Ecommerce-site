import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Trash2 } from 'lucide-react';
import { useStorefrontCart } from '../../context/StorefrontCartContext';
import { useStorefrontAuth } from '../../context/StorefrontAuthContext';

export default function Wishlist() {
  const { wishlistItems, toggleWishlist, addToCart } = useStorefrontCart();
  const { requireAuth } = useStorefrontAuth();

  return (
    <div className="storefront-container py-5 min-vh-100">
      <h1 className="fs-2 font-bold mb-4">My Wishlist</h1>

      {wishlistItems && wishlistItems.length > 0 ? (
        <div className="storefront-product-grid">
          {wishlistItems.map(product => (
            <div key={product.id} className="storefront-product-card position-relative">
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark d-block">
                <div className="storefront-product-image-container">
                  <img 
                    src={product.image || product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"} 
                    alt={product.name} 
                    className="storefront-product-image"
                  />
                </div>
                <div className="storefront-product-details pb-5">
                  <div className="storefront-product-title">{product.name}</div>
                  <div className="storefront-product-rating">
                    <span className="rating-badge">
                      {product.rating || "4.5"} ★
                    </span>
                    <span className="rating-count">(1,234)</span>
                  </div>
                  <div className="storefront-product-price-row">
                    <span className="storefront-product-price">{typeof product.price === 'string' ? product.price : `₹${Math.floor(product.price * 80)}`}</span>
                  </div>
                  <div className="storefront-product-delivery text-success fs-8 mt-1">In Stock</div>
                </div>
              </Link>
              
              {/* Remove from Wishlist Button */}
              <button 
                className="btn position-absolute top-0 end-0 m-2 rounded-circle shadow-sm bg-white border"
                style={{ width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                title="Remove from wishlist"
              >
                <Trash2 size={14} color="#ff4757" />
              </button>

              {/* Add to Cart Button */}
              <div className="position-absolute bottom-0 start-0 w-100 p-2" style={{ zIndex: 2 }}>
                <button 
                  className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#ff9f00', color: '#fff', border: 'none', fontSize: '0.85rem', padding: '8px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    requireAuth(() => addToCart(product, 1));
                  }}
                >
                  <ShoppingCart size={16} /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-5 rounded shadow-sm border border-light text-center">
          <div className="mb-4 text-secondary">
            <Heart size={48} opacity={0.5} />
          </div>
          <h2 className="fs-4 fw-bold mb-3">Your wishlist is empty</h2>
          <p className="text-secondary mb-4">Save items that you like in your wishlist. Review them anytime and easily move them to the cart.</p>
          <Link to="/" className="btn btn-primary px-4 py-2">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
