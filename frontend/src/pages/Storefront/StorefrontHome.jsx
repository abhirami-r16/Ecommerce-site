import React, { useEffect } from 'react';

export default function StorefrontHome({ storeData, products, categories = [] }) {
  // Determine if this is the apparel-focused store (Ajil Store)
  const isApparelFocused = storeData?.name?.toLowerCase().includes('ajil') || storeData?.name?.toLowerCase().includes('apparel');

  // Get unique category names from products (default to 'Uncategorized' if missing)
  const productCategories = [];
  products.forEach(p => {
    const pCat = p.category || 'Uncategorized';
    if (!productCategories.some(existing => existing.toLowerCase() === pCat.toLowerCase())) {
      productCategories.push(pCat);
    }
  });
  
  // Create a combined list of categories to render
  const categoriesToRender = [];
  
  // First, add all explicit custom categories
  if (categories && categories.length > 0) {
    categories.forEach(cat => {
      categoriesToRender.push({
        id: cat.id,
        name: cat.name,
        slug: cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        isCustom: true
      });
    });
  }
  
  // Then, add any categories from products that aren't already in the list
  productCategories.forEach(catName => {
    if (!categoriesToRender.some(c => (c.name || '').toLowerCase() === catName.toLowerCase() || String(c.id) === String(catName))) {
      categoriesToRender.push({
        id: catName,
        name: catName,
        slug: catName.toLowerCase().replace(/[^a-z0-9]/g, ''),
        isCustom: false
      });
    }
  });

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  const renderProductGrid = (items) => (
    items && items.length > 0 ? (
      <div className="storefront-product-grid">
        {items.map(product => (
          <div key={product.id} className="storefront-product-card">
            <div className="storefront-product-image-container">
              <img 
                src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"} 
                alt={product.name} 
                className="storefront-product-image"
              />
              <div className="storefront-product-heart">♥</div>
            </div>
            <div className="storefront-product-details">
              <div className="storefront-product-title">{product.name}</div>
              <div className="storefront-product-rating">
                <span className="rating-badge">
                  {product.rating || "4.5"} ★
                </span>
                <span className="rating-count">(1,234)</span>
              </div>
              <div className="storefront-product-price-row">
                <span className="storefront-product-price">{typeof product.price === 'string' ? product.price : `₹${Math.floor(product.price * 80)}`}</span>
                {typeof product.price === 'number' && (
                  <span className="storefront-product-original-price">₹{Math.floor((product.price * 80) * 1.5)}</span>
                )}
                <span className="storefront-product-discount">33% off</span>
              </div>
              <div className="storefront-product-delivery">Free delivery</div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="storefront-empty-state">
        <p>No products found in this category.</p>
      </div>
    )
  );

  return (
    <div className="storefront-home">
      {/* Banner Carousel Placeholder */}
      <div className="storefront-banner-slider">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=300&fit=crop" 
          alt="Sale Banner" 
          className="storefront-banner-img"
        />
      </div>

      {categoriesToRender.length > 0 ? (
        categoriesToRender.map(cat => {
          const catProducts = products.filter(p => {
            const pCat = (p.category || 'Uncategorized').toLowerCase();
            return String(pCat) === String(cat.id).toLowerCase() || pCat === (cat.name || '').toLowerCase() || pCat === (cat.slug || '').toLowerCase();
          });
          
          if (catProducts.length === 0) return null;

          const sectionId = cat.slug;
          return (
            <div id={sectionId} key={cat.id || cat.name} className="storefront-section scroll-mt">
              <div className="storefront-section-header">
                <h3>{cat.isCustom ? `Best of ${cat.name}` : `Trending in ${cat.name}`}</h3>
                <button className="storefront-view-all-btn">VIEW ALL</button>
              </div>
              {renderProductGrid(catProducts)}
            </div>
          );
        })
      ) : (
        <div className="storefront-empty-state" style={{ padding: "60px 20px", textAlign: "center" }}>
          <h2>Welcome to {storeData.name}</h2>
          <p>This store doesn't have any collections or products yet.</p>
        </div>
      )}
    </div>
  );
}
