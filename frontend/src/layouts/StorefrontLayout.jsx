import React from 'react';
import { Outlet } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown } from 'lucide-react';

export default function StorefrontLayout({ storeData, categories = [] }) {
  const isApparelFocused = storeData?.name?.toLowerCase().includes('ajil') || storeData?.name?.toLowerCase().includes('apparel');

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="storefront-body">
      {/* Flipkart-Style Header */}
      <header className="storefront-header">
        <div className="storefront-header-content">
          <div className="storefront-logo">
            <span className="storefront-logo-text">{storeData.name}</span>
            <div className="storefront-logo-sub">Explore <span className="plus-icon">Plus</span></div>
          </div>

          <div className="storefront-search-bar">
            <input
              type="text"
              placeholder={`Search for products, brands and more in ${storeData.name}`}
              className="storefront-search-input"
            />
            <button className="storefront-search-btn">
              <Search size={18} style={{ color: '#2874f0' }} />
            </button>
          </div>

          <div className="storefront-nav-actions">
            <button className="storefront-login-btn">Login</button>

            <div className="storefront-nav-item">
              Become a Seller
            </div>

            <div className="storefront-nav-item">
              More <ChevronDown size={14} />
            </div>

            <div className="storefront-nav-item cart-item">
              <ShoppingCart size={18} />
              <span>Cart</span>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Sub-header */}
      <div className="storefront-categories-nav">
        <div className="storefront-categories-content">
          {categories && categories.length > 0 ? (
            categories.map(cat => {
              const sectionId = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]/g, '');
              return (
                <a
                  key={cat.id || cat.name}
                  href={`#${sectionId}`}
                  onClick={(e) => scrollToSection(e, sectionId)}
                  className="category-item text-decoration-none"
                >
                  {cat.name} <ChevronDown size={12} />
                </a>
              );
            })
          ) : (
            <div className="category-placeholder">No categories defined</div>
          )}
        </div>
      </div>

      <main className="storefront-main-content">
        <Outlet />
      </main>

      <footer className="storefront-footer">
        <div className="storefront-footer-content">
          <div className="footer-col">
            <h4>ABOUT</h4>
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Careers</p>
          </div>
          <div className="footer-col">
            <h4>HELP</h4>
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation & Returns</p>
          </div>
          <div className="footer-col">
            <h4>POLICY</h4>
            <p>Return Policy</p>
            <p>Terms Of Use</p>
            <p>Security</p>
          </div>
          <div className="footer-col border-left">
            <h4>Mail Us:</h4>
            <p>{storeData.name} Internet Private Limited,</p>
            <p>Buildings Alyssa, Begonia &</p>
            <p>Clove Embassy Tech Village,</p>
            <p>Bengaluru, 560103,</p>
            <p>Karnataka, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
