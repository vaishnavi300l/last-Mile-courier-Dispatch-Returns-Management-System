import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Briefcase, PackageOpen } from 'lucide-react';
import api from './api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '', 
    confirmPassword: '',
    role: 'CUSTOMER' 
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form Validation Setup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = {
        username: formData.username,
        password: formData.password,
        role: formData.role
      };
      
      const res = await api.post(endpoint, payload);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      const rolePaths = { 
        CUSTOMER: '/customer', 
        DISPATCH_MANAGER: '/dispatch', 
        DELIVERY_AGENT: '/agent', 
        RETURNS_MANAGER: '/returns' 
      };
      window.location.href = rolePaths[res.data.role] || '/';
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ ...formData, password: '', confirmPassword: '' });
  };

  return (
    <div style={{ maxWidth: '420px', margin: '5rem auto' }} className="card">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '14px', marginBottom: '1rem', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)' }}>
          <PackageOpen size={32} color="white" />
        </div>
        <h2 style={{ margin: 0 }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-muted" style={{ marginTop: '0.5rem' }}>
          {isLogin ? 'Sign in to manage your shipments' : 'Get started with our logistics platform'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <div className="input-with-icon">
            <User className="input-icon" size={20} />
            <input 
              required 
              placeholder="Enter your username"
              value={formData.username} 
              onChange={e => setFormData({...formData, username: e.target.value})} 
            />
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-with-icon">
            <Lock className="input-icon" size={20} />
            <input 
              type={showPassword ? "text" : "password"} 
              required 
              placeholder="••••••••"
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <>
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={20} />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  required 
                  placeholder="••••••••"
                  value={formData.confirmPassword} 
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Role</label>
              <div className="input-with-icon">
                <Briefcase className="input-icon" size={20} />
                <select 
                  value={formData.role} 
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  style={{ appearance: 'none' }}
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="DISPATCH_MANAGER">Admin (Dispatch Manager)</option>
                  <option value="DELIVERY_AGENT">Delivery Agent</option>
                  <option value="RETURNS_MANAGER">Returns Manager</option>
                </select>
              </div>
            </div>
          </>
        )}

        {error && <p className="error-text" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <button className="btn btn-gradient" style={{ width: '100%', marginTop: isLogin ? '0.5rem' : '1.5rem' }}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '2rem' }} className="text-muted">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span className="auth-link" onClick={handleToggleMode}>
          {isLogin ? 'Sign Up' : 'Sign In'}
        </span>
      </p>
    </div>
  );
};

export default Auth;
