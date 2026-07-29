import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useSEO from '../hooks/useSEO';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  LogIn, 
  Eye, 
  EyeOff, 
  Store, 
  ShoppingCart, 
  Crown,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('owner');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useSEO({ title: 'Sign In - Aureum Ecosystem', description: 'Log in to your Aureum account portal.' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    if (res.success) {
      const userRole = role || res.user?.role || (email.includes('customer') ? 'customer' : email.includes('admin') ? 'admin' : 'owner');
      if (userRole === 'customer') {
        navigate('/customer-dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/owner/dashboard');
      }
    } else {
      setError(res.message || 'Authentication failed. Please verify your credentials.');
    }
    setLoading(false);
  };



  return (
    <div className="auth-page-container d-flex align-items-center justify-content-center py-5 px-3">
      {/* Ambient Glows & Grid */}
      <div className="auth-ambient-glow-1" />
      <div className="auth-ambient-glow-2" />
      <div className="auth-grid-overlay" />

      <div className="container position-relative" style={{ maxWidth: '480px', zIndex: 2 }}>
        <div className="auth-glass-card p-4 p-sm-5">
          
          {/* Header Icon */}
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
            <h2 className="fw-bold mb-1 font-serif text-white fs-3">Aureum Sign In</h2>
            <p className="fs-7 text-white opacity-75 mb-0">Sign in to your role dashboard</p>
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

            {/* Select Account Role */}
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

            {/* Email Field */}
            <div className="mb-3.5">
              <label className="form-label fw-semibold fs-7 text-white mb-1.5">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" size={18} />
                <input
                  type="email"
                  className="auth-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="form-label fw-semibold fs-7 text-white mb-1.5">Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  style={{ paddingRight: '2.75rem' }}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
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
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn gold-shimmer-btn w-100 py-3 font-bold fs-7 mb-3 d-flex align-items-center justify-content-center gap-2" 
              disabled={loading}
            >
              {loading ? (
                <div className="d-flex align-items-center gap-2">
                  <div className="spinner-border spinner-border-sm text-dark" role="status" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* Register Navigation */}
            <div className="text-center fs-7 text-white opacity-90 pt-1">
              Don't have an account?{' '}
              <NavLink to="/register" className="ms-1 text-decoration-none" style={{ color: '#f3d675', fontWeight: 700 }}>
                Register Here
              </NavLink>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}