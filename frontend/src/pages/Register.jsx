import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useSEO from '../hooks/useSEO';
import { 
  Sparkles, 
  User, 
  Mail, 
  Lock, 
  Store, 
  ShoppingCart, 
  Crown, 
  CheckCircle2, 
  UserCheck, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight,
  TrendingUp,
  Globe,
  Zap,
  Check
} from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('owner'); // 'owner' (Store Manager), 'customer', or 'admin'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useSEO({ title: 'Create Account - Aureum Ecosystem', description: 'Join the Aureum Multi-Vendor Ecosystem with interactive role configuration.' });

  // Calculate password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'transparent' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 25, label: 'Weak', color: '#ef4444' };
    if (score === 3) return { score: 55, label: 'Moderate', color: '#f59e0b' };
    if (score === 4) return { score: 80, label: 'Strong', color: '#10b981' };
    return { score: 100, label: 'Exceptional', color: '#f3d675' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await register(name, email, password, role);
    if (res.success) {
      if (role === 'customer') {
        navigate('/customer-dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/owner/dashboard');
      }
    } else {
      setError(res.message || 'Registration failed. Please check your credentials.');
    }
    setLoading(false);
  };



  return (
    <div className="auth-page-container d-flex align-items-center justify-content-center py-5 px-3">
      {/* Background Lighting Effects */}
      <div className="auth-ambient-glow-1" />
      <div className="auth-ambient-glow-2" />
      <div className="auth-grid-overlay" />

      <div className="container position-relative" style={{ maxWidth: '1180px', zIndex: 2 }}>
        <div className="row g-4 align-items-center">
          
          {/* LEFT COLUMN: BRAND & ECOSYSTEM SHOWCASE (Visible on Desktop/Tablet) */}
          <div className="col-lg-5 d-none d-lg-block text-white pe-lg-5">
            <div className="auth-feature-panel">
              <div className="auth-feature-badge mb-4">
                <Sparkles size={16} />
                <span>AUREUM MULTI-VENDOR ECOSYSTEM</span>
              </div>

              <h1 className="display-5 font-serif fw-bold text-white mb-3" style={{ lineHeight: 1.15 }}>
                Empowering Next-Gen <span className="gold-gradient-text">Commerce & Stores</span>
              </h1>

              <p className="fs-6 text-white opacity-75 mb-4" style={{ lineHeight: 1.6 }}>
                Join thousands of merchants, shoppers, and brand leaders in an ultra-sleek, high-performance marketplace platform.
              </p>

              {/* Feature Highlights Grid */}
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="auth-feature-card d-flex align-items-center gap-3">
                  <div className="rounded-circle p-2.5 d-flex align-items-center justify-content-center" style={{ background: 'rgba(243, 214, 117, 0.15)', color: '#f3d675' }}>
                    <Zap size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-white fs-7">Instant Store Activation</h6>
                    <small className="text-white opacity-75 fs-8">Launch your branded merchant node in seconds with zero latency.</small>
                  </div>
                </div>

                <div className="auth-feature-card d-flex align-items-center gap-3">
                  <div className="rounded-circle p-2.5 d-flex align-items-center justify-content-center" style={{ background: 'rgba(243, 214, 117, 0.15)', color: '#f3d675' }}>
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-white fs-7">Real-Time Revenue Analytics</h6>
                    <small className="text-white opacity-75 fs-8">Track payouts, orders, and customer growth with live telemetry.</small>
                  </div>
                </div>

                <div className="auth-feature-card d-flex align-items-center gap-3">
                  <div className="rounded-circle p-2.5 d-flex align-items-center justify-content-center" style={{ background: 'rgba(243, 214, 117, 0.15)', color: '#f3d675' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-white fs-7">Enterprise Encryption</h6>
                    <small className="text-white opacity-75 fs-8">PCI-DSS standards & protected JWT authentication protocol.</small>
                  </div>
                </div>
              </div>

              {/* Live Metric Badge */}
              <div className="d-flex align-items-center gap-3 pt-2">
                <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <Globe size={16} className="text-warning" />
                  <span className="fs-8 fw-semibold text-white opacity-90">Active in 45+ Countries</span>
                </div>
                <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <CheckCircle2 size={16} className="text-success" />
                  <span className="fs-8 fw-semibold text-white opacity-90">99.99% Uptime Verified</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: REGISTRATION FORM CARD */}
          <div className="col-lg-7">
            <div className="auth-glass-card p-4 p-sm-5">
              
              {/* Form Header */}
              <div className="text-center mb-4">
                <div 
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-lg"
                  style={{ 
                    width: '64px', 
                    height: '64px', 
                    background: 'linear-gradient(135deg, #f3d675 0%, #d4af37 50%, #8a6d1f 100%)', 
                    color: '#050505',
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)'
                  }}
                >
                  <Sparkles size={30} />
                </div>
                <h2 className="fw-bold mb-1 font-serif text-white fs-3">Create Your Account</h2>
                <p className="fs-7 text-white opacity-75 mb-0">Join the Aureum Multi-Vendor Ecosystem</p>
              </div>

              {/* Error Banner */}
              {error && (
                <div 
                  className="alert py-2.5 px-3 fs-7 mb-4 rounded-3 d-flex align-items-center gap-2" 
                  style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.4)' }}
                >
                  <span className="fs-6">⚠️</span>
                  <span className="fw-semibold">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* 1. SELECT ACCOUNT ROLE - STANDARD DROPDOWN */}
                <div className="mb-3.5">
                  <label className="form-label fw-semibold fs-7 text-white d-flex align-items-center justify-content-between mb-1.5">
                    <span>
                      Select Account Role <span className="text-warning">*</span>
                    </span>
                    <span className="badge bg-warning text-dark font-bold fs-9 rounded-pill px-2.5 py-1">
                      {role === 'customer' ? 'Customer' : role === 'admin' ? 'Admin' : 'Store Owner'}
                    </span>
                  </label>
                  <div className="auth-input-wrapper">
                    {role === 'customer' ? (
                      <ShoppingCart className="auth-input-icon" size={18} />
                    ) : role === 'admin' ? (
                      <Crown className="auth-input-icon" size={18} />
                    ) : (
                      <Store className="auth-input-icon" size={18} />
                    )}
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="auth-input form-select cursor-pointer py-2.5 fs-7"
                      style={{
                        background: 'rgba(18, 16, 13, 0.9)',
                        borderColor: 'rgba(212, 175, 55, 0.25)',
                        color: '#ffffff'
                      }}
                    >
                      <option value="customer" style={{ background: '#12100d', color: '#f3d675' }}>Customer</option>
                      <option value="admin" style={{ background: '#12100d', color: '#f3d675' }}>Admin</option>
                      <option value="owner" style={{ background: '#12100d', color: '#f3d675' }}>Store Owner</option>
                    </select>
                  </div>
                </div>

                {/* 2. FULL NAME */}
                <div className="mb-3.5">
                  <label className="form-label fw-semibold fs-7 text-white mb-1.5">
                    Full Name <span className="text-warning">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <User className="auth-input-icon" size={18} />
                    <input
                      type="text"
                      className="auth-input"
                      required
                      placeholder="Enter your full name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* 3. EMAIL ADDRESS */}
                <div className="mb-3.5">
                  <label className="form-label fw-semibold fs-7 text-white mb-1.5">
                    Email Address <span className="text-warning">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Mail className="auth-input-icon" size={18} />
                    <input
                      type="email"
                      className="auth-input"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* 4. PASSWORD WITH TOGGLE & STRENGTH METER */}
                <div className="mb-4">
                  <label className="form-label fw-semibold fs-7 text-white mb-1.5 d-flex justify-content-between align-items-center">
                    <span>Password <span className="text-warning">*</span></span>
                    {password && (
                      <span className="fs-8 fw-bold" style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                    )}
                  </label>
                  <div className="auth-input-wrapper">
                    <Lock className="auth-input-icon" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input"
                      style={{ paddingRight: '2.75rem' }}
                      required
                      placeholder="Enter password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-input-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password Strength Progress Bar */}
                  {password && (
                    <div className="strength-bar-container">
                      <div 
                        className="strength-bar-fill"
                        style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
                      />
                    </div>
                  )}
                </div>



                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="btn gold-shimmer-btn w-100 py-3 font-bold fs-7 mb-3 d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="d-flex align-items-center gap-2">
                      <div className="spinner-border spinner-border-sm text-dark" role="status" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <span>Register</span>
                  )}
                </button>

                {/* LOGIN LINK */}
                <div className="text-center fs-7 text-white opacity-90 pt-1">
                  Already have an account?{' '}
                  <NavLink to="/login" className="ms-1 text-decoration-none" style={{ color: '#f3d675', fontWeight: 700 }}>
                    Sign In Here
                  </NavLink>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}