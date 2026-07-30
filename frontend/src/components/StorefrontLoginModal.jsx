import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStorefrontAuth } from '../context/StorefrontAuthContext';
import { X, Mail, Lock, User } from 'lucide-react';

export default function StorefrontLoginModal() {
  const { login, register } = useAuth();
  const { isLoginModalOpen, closeLoginModal } = useStorefrontAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let res;
    if (isRegistering) {
      res = await register(name, email, password, 'customer');
    } else {
      res = await login(email, password);
    }
    
    if (res.success) {
      closeLoginModal();
    } else {
      setError(res.message || 'Authentication failed. Please check your credentials.');
    }
    setLoading(false);
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div className="modal-backdrop fade show d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} onClick={closeLoginModal}>
      <div className="modal-dialog m-0" style={{ maxWidth: '400px', width: '100%' }} onClick={e => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-bottom-0 pb-0">
            <button type="button" className="btn-close" onClick={closeLoginModal} aria-label="Close"></button>
          </div>
          <div className="modal-body px-4 pb-4 px-sm-5 pb-sm-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold fs-3 mb-1">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
              <p className="text-secondary fs-7">{isRegistering ? 'Sign up to start shopping.' : 'Please login to continue shopping.'}</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 px-3 fs-7 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <div className="mb-3">
                  <label className="form-label text-secondary fs-8 fw-semibold">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 ps-0 bg-light"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label text-secondary fs-8 fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 ps-0 bg-light"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary fs-8 fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 ps-0 bg-light"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn w-100 py-2 fw-bold text-white fs-6 mb-3" 
                style={{ backgroundColor: '#fb641b' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
              </button>
              
              <div className="text-center fs-7 text-secondary">
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button type="button" className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ color: '#2874f0' }} onClick={toggleMode}>
                  {isRegistering ? 'Login here' : 'Register here'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
