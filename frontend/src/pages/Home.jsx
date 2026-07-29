import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles, ArrowRight, Play, Shield, Clock, RefreshCw, Search, Bell, User,
  ChevronDown, Store, Package, Users, ShoppingCart, DollarSign, Globe,
  CheckCircle, Star, Heart, Layers, ShieldCheck, Zap, Headphones, X, Plus,
  TrendingUp, BarChart2, Eye, Activity, Check, Crown, Flame, Mail, Send, Award, Gift, Truck, Tag, ExternalLink, Rocket
} from "lucide-react";

const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F3D675";
const GOLD_DEEP = "#B8860B";

export default function Home() {
  const navigate = useNavigate();

  // Modals & States
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  const [wishlist, setWishlist] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState("overview");

  // Flash Sale Countdown Timer (State in seconds)
  const [timeLeft, setTimeLeft] = useState(8130); // 2h 15m 30s

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 8130));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}h : ${mins.toString().padStart(2, "0")}m : ${secs.toString().padStart(2, "0")}s`;
  };

  const revenueChartPoints = "0,160 50,140 100,145 150,110 200,120 250,80 300,50";

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (e, prod) => {
    e.stopPropagation();
    setCartCount((prev) => prev + 1);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <div style={{ backgroundColor: "#040404", color: "#f6f1e4", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      
      {/* 🌟 LUXURY BLACK & GOLD AMBIENT BACKGROUND GLOWS & GOLDEN PARTICLE WAVES */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -150, left: "50%", transform: "translateX(-50%)", width: 1200, height: 700, background: "radial-gradient(ellipse at center, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.09) 45%, rgba(4,4,4,0) 75%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: 350, right: "2%", width: 600, height: 600, background: "radial-gradient(circle, rgba(243,214,117,0.15) 0%, rgba(4,4,4,0) 70%)", filter: "blur(70px)" }} />
        <div style={{ position: "absolute", top: 1100, left: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(4,4,4,0) 70%)", filter: "blur(70px)" }} />

        {/* SVG Golden Wave Stream */}
        <svg style={{ position: "absolute", top: 100, left: 0, width: "100%", height: 650, opacity: 0.45 }} viewBox="0 0 1440 650" fill="none">
          <defs>
            <linearGradient id="goldWave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#f3d675" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#b8860b" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="goldWave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8a6d1f" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#f3d675" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M-100 480 C 250 300, 550 550, 950 320 C 1200 200, 1450 380, 1600 300" stroke="url(#goldWave1)" strokeWidth="2.5" />
          <path d="M-100 510 C 250 330, 550 580, 950 350 C 1200 230, 1450 410, 1600 330" stroke="url(#goldWave2)" strokeWidth="1.5" strokeDasharray="6 8" />
        </svg>

        {/* Floating Sparkles */}
        <div style={{ position: "absolute", top: 180, left: "12%", color: "#f3d675", opacity: 0.8, fontSize: 14 }}>✦</div>
        <div style={{ position: "absolute", top: 280, left: "45%", color: "#d4af37", opacity: 0.9, fontSize: 16 }}>✨</div>
        <div style={{ position: "absolute", top: 140, right: "25%", color: "#f3d675", opacity: 0.9, fontSize: 18 }}>✦</div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky-top border-bottom py-3" style={{ backgroundColor: "rgba(4,4,4,0.92)", borderColor: "rgba(212,175,55,0.25)", backdropFilter: "blur(16px)", zIndex: 40 }}>
        <div className="container-xl d-flex align-items-center justify-content-between">
          
          {/* Logo */}
          <div className="d-flex align-items-center gap-3" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <div className="brand-icon-box">
              <Sparkles size={16} style={{ color: "#d4af37" }} />
            </div>
            <span className="fs-4 font-bold tracking-widest text-white font-serif gold-gradient-text">AUREUM</span>
          </div>

          {/* Navigation Links */}
          <nav className="d-none d-lg-flex align-items-center gap-4">
            <a href="#hero" className="home-nav-link text-warning font-bold">Home</a>
            <a href="#features-pillars" className="home-nav-link text-warning font-bold">Features</a>
            <a href="#stores" className="home-nav-link text-warning font-bold">Stores</a>
            <a href="#categories" className="home-nav-link text-warning font-bold">Categories</a>
            <a href="#products" className="home-nav-link text-warning font-bold">Products</a>
            <a href="#pricing" className="home-nav-link text-warning font-bold">Pricing</a>
            <a href="#testimonials" className="home-nav-link text-warning font-bold">Reviews</a>
          </nav>

          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate("/customer-dashboard")} className="btn btn-sm btn-outline-warning rounded-circle p-2 position-relative" title="View Customer Dashboard Cart">
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark font-bold fs-9">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate("/login")} className="btn btn-sm btn-outline-warning rounded-pill px-3 fw-semibold">
              Signin
            </button>
            <button onClick={() => navigate("/owner/dashboard")} className="btn-gold-pill btn-sm">
              <Rocket size={14} /> Launch Your Store
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER */}
      <section id="hero" className="position-relative py-5 px-3 my-4 text-center" style={{ zIndex: 10 }}>
        <div className="container-xl max-w-4xl mx-auto">
          <div className="gold-badge-amber mb-3 px-3 py-1.5 rounded-pill border d-inline-flex align-items-center gap-2" style={{ borderColor: "rgba(212,175,55,0.4)" }}>
            <Sparkles size={14} /> The Next-Generation Multi-Vendor Commerce System
          </div>

          <h1 className="display-3 font-serif font-bold text-white mb-4" style={{ lineHeight: 1.15 }}>
            Commerce, <br />
            <span className="gold-gradient-text italic">minted in gold.</span>
          </h1>

          <p className="fs-5 text-muted mb-5 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
            Discover thousands of luxury products from verified independent merchant stores. A complete multi-vendor ecosystem built for scale, prestige, and seamless customer shopping.
          </p>

          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-5">
            <button onClick={() => navigate("/customer-dashboard")} className="btn-gold-pill fs-6 py-3 px-5">
              Explore Marketplace <ArrowRight size={18} />
            </button>
            <a href="#stores" className="btn-outline-gold-pill fs-6 py-3 px-5">
              Browse Stores Directory
            </a>
          </div>

          <div className="d-flex flex-wrap align-items-center justify-content-center gap-5 fs-7 text-muted border-top pt-4" style={{ borderColor: "rgba(212,175,55,0.15)", maxWidth: 650, margin: "0 auto" }}>
            <div className="d-flex align-items-center gap-2"><ShieldCheck size={18} style={{ color: GOLD }} /> 100% Verified Merchants</div>
            <div className="d-flex align-items-center gap-2"><Truck size={18} style={{ color: GOLD }} /> Worldwide Express Shipping</div>
            <div className="d-flex align-items-center gap-2"><Zap size={18} style={{ color: GOLD }} /> 256-Bit SSL Checkout</div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE AUREUM - VALUE PILLARS SECTION */}
      <section id="features-pillars" className="py-5 px-3 position-relative" style={{ zIndex: 10 }}>
        <div className="container-xl">
          <div className="text-center max-w-3xl mx-auto mb-5">
            <div className="gold-badge-amber mb-2"><Crown size={14} /> PLATFORM CAPABILITIES</div>
            <h2 className="fs-2 font-serif font-bold text-white mb-2">Engineered for Multi-Vendor Supremacy</h2>
            <p className="fs-8 text-muted mb-0">Empowering store merchants, marketplace administrators, and luxury shoppers with enterprise infrastructure.</p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: Store,
                title: "Instant Storefront Creation",
                desc: "Merchants launch customized storefronts with unique subdomains, category catalogs, and branded checkout in under 60 seconds."
              },
              {
                icon: DollarSign,
                title: "Automated Commission Payouts",
                desc: "Integrated multi-merchant revenue splitting, Stripe & PayPal automated commission payouts, and live earnings analytics."
              },
              {
                icon: ShieldCheck,
                title: "Enterprise SSL & Security",
                desc: "Bank-grade 256-bit SSL encryption, automated inventory synchronization, and comprehensive audit logs across all stores."
              },
              {
                icon: ShoppingCart,
                title: "Unified Customer Shopping",
                desc: "Shoppers can explore multiple merchant stores, manage cross-store orders, track shipments, and claim reward coupons."
              }
            ].map((pillar, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-3">
                <div className="home-card-gold p-4 h-100 d-flex flex-column justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-3 mb-3 d-flex align-items-center justify-content-center" style={{ background: "rgba(212,175,55,0.15)", color: GOLD }}>
                      <pillar.icon size={24} />
                    </div>
                    <h3 className="fs-5 font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="fs-8 text-muted mb-0" style={{ lineHeight: 1.6 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED CATEGORIES GRID */}
      <section id="categories" className="py-5 px-3 position-relative" style={{ zIndex: 10 }}>
        <div className="container-xl">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-2">
            <div>
              <div className="gold-badge-amber mb-1"><Tag size={14} /> EXPLORE MARKETPLACE</div>
              <h2 className="fs-2 font-serif font-bold text-white mb-0">Featured Product Categories</h2>
            </div>
            <button onClick={() => navigate("/customer-dashboard")} className="btn btn-outline-warning btn-sm rounded-pill px-4 fs-8">
              Explore All Categories ➔
            </button>
          </div>

          <div className="row g-3">
            {[
              { name: "Apparel & Fashion", count: "5,890 Items", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400" },
              { name: "Watches & Luxury", count: "1,840 Items", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400" },
              { name: "Luxury Decor", count: "2,150 Items", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400" },
              { name: "Electronics & Tech", count: "3,420 Items", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" },
              { name: "Beauty & Cosmetics", count: "2,980 Items", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
              { name: "Kicks & Footwear", count: "1,420 Items", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400" },
            ].map((cat, idx) => (
              <div key={idx} className="col-6 col-md-4 col-lg-2">
                <div
                  onClick={() => navigate("/customer-dashboard")}
                  className="home-card-gold text-center p-3 cursor-pointer h-100 d-flex flex-column justify-between"
                >
                  <div>
                    <img src={cat.img} alt={cat.name} className="w-100 rounded-3 mb-2 object-cover" style={{ height: 110 }} />
                    <div className="font-bold fs-7 text-white mb-0.5">{cat.name}</div>
                    <div className="fs-9 text-warning font-mono">{cat.count}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED MERCHANT STORES DIRECTORY */}
      <section id="stores" className="py-5 px-3 position-relative" style={{ zIndex: 10 }}>
        <div className="container-xl">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <div className="gold-badge-amber mb-1"><Store size={13} /> VERIFIED SHOPS</div>
              <h2 className="fs-3 font-serif font-bold text-white mb-0">Featured Merchant Stores</h2>
            </div>
            <button onClick={() => navigate("/customer-dashboard")} className="btn btn-link text-warning fs-8 p-0 text-decoration-none">View All Stores →</button>
          </div>

          <div className="row g-3">
            {[
              { name: "Coastal Threads Store", owner: "Sarah Jenkins", category: "Fashion & Apparel", rating: "4.9", prods: "24 Products", subdomain: "coastal-threads", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300" },
              { name: "Margas Store", owner: "Marcus Vance", category: "Bespoke Outerwear", rating: "4.9", prods: "36 Products", subdomain: "margas-store", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300" },
              { name: "Sheikh Home Decor", owner: "Fatima Sheikh", category: "Luxury Furniture", rating: "4.7", prods: "18 Products", subdomain: "sheikh-home", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300" },
              { name: "Aureum Boutique", owner: "Elena Rostova", category: "Watches & Jewelry", rating: "4.9", prods: "15 Products", subdomain: "aureum-boutique", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300" },
            ].map((store, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="home-card-gold p-3 d-flex flex-column justify-between h-100">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <img src={store.img} alt={store.name} className="rounded-3 object-cover" style={{ width: 50, height: 50 }} />
                      <div>
                        <div className="fw-bold text-white fs-7 d-flex align-items-center gap-1">
                          {store.name} <CheckCircle size={12} className="text-warning" />
                        </div>
                        <div className="fs-8 text-warning font-mono">https://{store.subdomain}.storemanager.app</div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between fs-8 text-muted mb-2">
                      <span>Owner: <strong className="text-white">{store.owner}</strong></span>
                      <span className="gold-badge-amber fs-9">{store.category}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between pt-2 border-top" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
                    <div className="fs-9 text-warning font-bold">
                      <Star size={10} className="fill-warning me-1" /> {store.rating} ({store.prods})
                    </div>
                    <button
                      onClick={() => navigate("/customer-dashboard")}
                      className="btn btn-sm btn-outline-warning fs-9 py-1 px-2.5 d-flex align-items-center gap-1"
                    >
                      Visit Store ➔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CURATED CATALOG - TRENDING STORE ITEMS (BELOW SECTION) */}
      <section id="products" className="py-5 px-3 position-relative border-top" style={{ borderColor: "rgba(212,175,55,0.15)", zIndex: 10 }}>
        <div className="container-xl">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <div className="gold-badge-amber mb-1"><Package size={13} /> CURATED CATALOG</div>
              <h2 className="fs-3 font-serif font-bold text-white mb-0">Products Created by Store Owners</h2>
            </div>
            <button onClick={() => navigate("/products")} className="btn btn-link text-warning fs-8 p-0 text-decoration-none">View All Products →</button>
          </div>

          {(() => {
            const saved = localStorage.getItem("aureum_owner_products");
            let ownerProducts = [];
            if (saved) {
              try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) ownerProducts = parsed;
              } catch (e) {}
            }

            if (ownerProducts.length === 0) {
              return (
                <div className="home-card-gold p-5 rounded-3 text-center w-100 my-2">
                  <div className="w-16 h-16 rounded-circle bg-warning bg-opacity-15 text-warning d-inline-flex align-items-center justify-content-center mb-3">
                    <Package size={34} />
                  </div>
                  <h3 className="fs-4 font-serif font-bold text-white mb-2">No Store Products Listed Yet</h3>
                  <p className="fs-7 text-muted max-w-md mx-auto mb-4" style={{ maxWidth: 480, lineHeight: 1.6 }}>
                    Store owners have not published any products to the storefront catalog yet. Register as a store manager to create your store and list your products!
                  </p>
                  <button onClick={() => navigate("/owner/dashboard")} className="btn btn-gold-primary py-2 px-4 font-bold fs-7 d-inline-flex align-items-center gap-2">
                    <Rocket size={16} /> Launch Your Store & List Products
                  </button>
                </div>
              );
            }

            return (
              <div className="row g-3">
                {ownerProducts.map((prod) => (
                  <div key={prod.id} className="col-12 col-sm-6 col-md-3">
                    <div className="home-card-gold p-3 d-flex flex-column justify-between h-100 cursor-pointer" onClick={() => setQuickViewProduct(prod)}>
                      <div>
                        <div className="position-relative mb-2">
                          <img src={prod.image || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"} alt={prod.name} className="w-100 rounded-3 object-cover" style={{ height: 160 }} />
                          <span className="position-absolute bottom-0 start-0 m-2 gold-badge-amber fs-9 font-mono">
                            {prod.category || "Catalog"} • {prod.status || "In Stock"}
                          </span>
                        </div>
                        <div className="fw-bold fs-7 text-white mb-1 line-clamp-1" style={{ color: "#f3d675" }}>{prod.name}</div>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="fw-bold fs-6" style={{ color: "#f3d675" }}>{prod.price}</span>
                          <span className="fs-8 text-muted d-flex align-items-center me-1"><Star size={11} className="text-warning fill-warning me-1" /> 4.9</span>
                        </div>
                      </div>
                      <button onClick={(e) => handleAddToCart(e, prod)} className="btn btn-gold-primary btn-sm w-100 py-1.5 font-bold">
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 9. PRICING SECTION */}
      <section id="pricing" className="py-5 px-3 position-relative" style={{ zIndex: 10 }}>
        <div className="container-xl">
          <div className="text-center max-w-3xl mx-auto mb-5">
            <div className="gold-badge-amber mb-2"><Sparkles size={14} /> TRANSPARENT SUBSCRIPTIONS</div>
            <h2 className="fs-2 font-serif font-bold text-white mb-2">Minted for Every Scale of Enterprise</h2>
            <p className="fs-8 text-muted mb-0">Choose a seller plan tailored to your merchant volume with zero hidden fees.</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-4">
              <div className="home-card-gold p-4 h-100 d-flex flex-column justify-between">
                <div>
                  <h3 className="fs-5 text-white font-serif mb-1">Starter Merchant</h3>
                  <div className="fs-8 text-muted mb-3">Independent boutique store owners</div>
                  <div className="fs-2 font-bold text-white mb-4">$29 <span className="fs-8 font-normal text-muted">/ mo</span></div>
                  <ul className="list-unstyled fs-8 text-muted space-y-2 mb-4">
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> Up to 5 Merchant Stores</li>
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> 500 Product Catalog Limit</li>
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> Standard Support & Analytics</li>
                  </ul>
                </div>
                <button onClick={() => setShowRoleModal(true)} className="btn btn-outline-warning rounded-pill w-100 font-bold py-2">Get Started</button>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="home-card-gold p-4 h-100 d-flex flex-column justify-between border-warning" style={{ borderWidth: 2, background: "#0e0c08" }}>
                <div>
                  <span className="badge bg-warning text-dark font-bold mb-2">MOST POPULAR</span>
                  <h3 className="fs-5 text-warning font-serif mb-1">Business Scale</h3>
                  <div className="fs-8 text-muted mb-3">Growing multi-vendor networks</div>
                  <div className="fs-2 font-bold text-white mb-4">$79 <span className="fs-8 font-normal text-muted">/ mo</span></div>
                  <ul className="list-unstyled fs-8 text-muted space-y-2 mb-4">
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> Up to 25 Merchant Stores</li>
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> Unlimited Product Catalogs</li>
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> Real-time Payouts & Commission Analytics</li>
                  </ul>
                </div>
                <button onClick={() => setShowRoleModal(true)} className="btn-gold-pill justify-content-center w-100 py-2">Start 14-Day Free Trial</button>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="home-card-gold p-4 h-100 d-flex flex-column justify-between">
                <div>
                  <h3 className="fs-5 text-white font-serif mb-1">Enterprise Gold</h3>
                  <div className="fs-8 text-muted mb-3">Global multi-merchant enterprise</div>
                  <div className="fs-2 font-bold text-white mb-4">$199 <span className="fs-8 font-normal text-muted">/ mo</span></div>
                  <ul className="list-unstyled fs-8 text-muted space-y-2 mb-4">
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> Unlimited Stores & Merchants</li>
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> Custom SSL & Domain Subdomains</li>
                    <li className="d-flex align-items-center gap-2"><Check size={14} className="text-warning" /> Dedicated Account Manager</li>
                  </ul>
                </div>
                <button onClick={() => setShowRoleModal(true)} className="btn btn-outline-warning rounded-pill w-100 font-bold py-2">Contact Sales</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. REVIEWS & TESTIMONIALS */}
      <section id="testimonials" className="py-5 px-3 position-relative" style={{ zIndex: 10 }}>
        <div className="container-xl">
          <div className="text-center max-w-3xl mx-auto mb-4">
            <div className="gold-badge-amber mb-2"><Star size={14} /> REVIEWS & PRAISE</div>
            <h2 className="fs-2 font-serif font-bold text-white">Loved by Buyers & Merchant Owners</h2>
          </div>

          <div className="row g-3">
            {[
              { quote: "AUREUM transformed our boutique apparel brand. Managing 18 store locations under one dashboard with gold precision is unbelievable.", name: "Meera Nair", role: "Owner, Coastal Threads Store" },
              { quote: "Shopping on AUREUM feels like a high-end luxury boutique. Smooth checkout, verified sellers, and fast shipping every time.", name: "Sara Ahmed", role: "VIP Customer" },
              { quote: "The platform analytics and commission tracking make managing our multi-merchant ecosystem effortless. Outstanding software.", name: "Marcus Vance", role: "Super Admin Merchant" },
            ].map((rev, i) => (
              <div key={i} className="col-12 col-md-4">
                <div className="home-card-gold p-4 h-100 d-flex flex-column justify-between">
                  <p className="fs-8 text-muted italic mb-3" style={{ lineHeight: 1.6 }}>"{rev.quote}"</p>
                  <div>
                    <div className="text-warning mb-2">★★★★★</div>
                    <div className="border-top pt-2" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
                      <div className="fw-bold text-white fs-7">{rev.name}</div>
                      <div className="fs-9 text-warning">{rev.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. NEWSLETTER SECTION */}
      <section className="py-5 px-3 position-relative" style={{ zIndex: 10 }}>
        <div className="container max-w-2xl text-center">
          <div className="home-card-gold p-5">
            <Mail size={28} className="text-warning mb-2" />
            <h3 className="fs-4 font-bold text-white mb-2">Subscribe for Exclusive Merchant Deals</h3>
            <p className="fs-8 text-muted mb-4">Get early access to flash sales, luxury merchant discounts, and marketplace news.</p>

            {newsletterSuccess ? (
              <div className="alert alert-success bg-dark text-success border-success fs-7">
                ✨ Thank you for subscribing to AUREUM updates!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="d-flex flex-column flex-sm-row gap-2 max-w-md mx-auto">
                <input
                  required
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="form-control bg-dark text-white border-secondary fs-8 rounded-pill px-3"
                />
                <button type="submit" className="btn-gold-pill py-2 px-4 fs-8">
                  Subscribe <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer id="contact" className="py-4 border-top" style={{ backgroundColor: "#040404", borderColor: "rgba(212,175,55,0.2)", zIndex: 10 }}>
        <div className="container-xl d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 fs-8 text-muted">
          <div>
            <span className="font-bold text-white font-serif me-2">AUREUM</span>
            <span>© 2026 AUREUM Multi-Vendor Platform. Built for excellence.</span>
          </div>
          <div className="d-flex gap-4 fs-9">
            <a href="#privacy" className="text-muted text-decoration-none">Privacy Policy</a>
            <a href="#terms" className="text-muted text-decoration-none">Terms of Service</a>
            <a href="#security" className="text-muted text-decoration-none">Security Audit</a>
          </div>
        </div>
      </footer>

      {/* ROLE SELECTOR MODAL */}
      {showRoleModal && (
        <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center p-3" style={{ zIndex: 1050 }}>
          <div className="gold-panel w-100" style={{ maxWidth: 420 }}>
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
              <h3 className="fs-6 font-bold text-warning mb-0">Select Workspace Portal</h3>
              <button onClick={() => setShowRoleModal(false)} className="btn btn-sm text-muted p-0 border-0 bg-transparent fs-5">✕</button>
            </div>

            <div className="d-flex flex-column gap-2.5 fs-7">
              <div onClick={() => { setShowRoleModal(false); navigate("/owner/dashboard"); }} className="p-3 rounded-3 bg-dark border border-secondary cursor-pointer d-flex align-items-center gap-3 hover:border-warning transition-all">
                <div className="w-10 h-10 rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center font-bold">
                  <Store size={20} />
                </div>
                <div>
                  <div className="fw-bold text-white">Store Owner Dashboard</div>
                  <div className="fs-8 text-muted">Manage products, categories, orders & stores</div>
                </div>
              </div>

              <div onClick={() => { setShowRoleModal(false); navigate("/admin/dashboard"); }} className="p-3 rounded-3 bg-dark border border-secondary cursor-pointer d-flex align-items-center gap-3 hover:border-warning transition-all">
                <div className="w-10 h-10 rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center font-bold">
                  <Crown size={20} />
                </div>
                <div>
                  <div className="fw-bold text-white">Super Admin Control</div>
                  <div className="fs-8 text-muted">Platform revenue, store approvals & orders</div>
                </div>
              </div>

              <div onClick={() => { setShowRoleModal(false); navigate("/customer-dashboard"); }} className="p-3 rounded-3 bg-dark border border-secondary cursor-pointer d-flex align-items-center gap-3 hover:border-warning transition-all">
                <div className="w-10 h-10 rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center font-bold">
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <div className="fw-bold text-white">Customer Shopping Portal</div>
                  <div className="fs-8 text-muted">Browse items, track orders & view stores</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center p-3" style={{ zIndex: 1050 }}>
          <div className="gold-panel w-100" style={{ maxWidth: 480 }}>
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
              <h3 className="fs-6 font-bold text-warning mb-0">{quickViewProduct.name}</h3>
              <button onClick={() => setQuickViewProduct(null)} className="btn btn-sm text-muted p-0 border-0 bg-transparent fs-5">✕</button>
            </div>
            <div className="row g-3">
              <div className="col-5">
                <img src={quickViewProduct.img} alt={quickViewProduct.name} className="w-100 rounded-3 object-cover" style={{ height: 140 }} />
              </div>
              <div className="col-7 d-flex flex-column justify-between">
                <div>
                  <div className="fs-9 text-warning font-semibold">{quickViewProduct.store_name || "Aureum Merchant Item"}</div>
                  <div className="fs-5 font-bold text-white mb-2">{quickViewProduct.price}</div>
                  <p className="fs-8 text-muted mb-0">Crafted with authentic premium materials and gold-standard quality.</p>
                </div>
                <button onClick={(e) => { handleAddToCart(e, quickViewProduct); setQuickViewProduct(null); }} className="btn btn-gold-primary btn-sm w-100 mt-3 py-2 font-bold">
                  + Add to Cart Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}