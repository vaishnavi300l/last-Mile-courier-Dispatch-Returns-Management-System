import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Auth from './Auth';
import CustomerDashboard from './CustomerDashboard';
import DispatchDashboard from './DispatchDashboard';
import AgentDashboard from './AgentDashboard';
import ReturnsDashboard from './ReturnsDashboard';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  // Initialize dark mode from localStorage or use light mode as default
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Effect to apply the class and persist preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        {/* Navbar always visible to hold the Dark Mode toggle */}
        <nav className="navbar">
          <div className="navbar-brand">Courier Logistics</div>
          <div className="navbar-nav" style={{ width: '100%', justifyContent: 'flex-end' }}>
            <div className="theme-switch-wrapper" style={{ marginRight: user ? '1.5rem' : '0' }}>
              <Sun size={18} color={!darkMode ? "var(--primary)" : "var(--text-muted)"} style={{ transition: 'color 0.3s' }} />
              <label className="theme-switch" title="Toggle Dark Mode">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={() => setDarkMode(!darkMode)} 
                />
                <span className="slider"></span>
              </label>
              <Moon size={18} color={darkMode ? "var(--primary)" : "var(--text-muted)"} style={{ transition: 'color 0.3s' }} />
            </div>
            
            {user && (
              <>
                <span className="badge badge-gray">{user.role.replace('_MANAGER', '')}</span>
                <span style={{ fontWeight: 500 }}>{user.username}</span>
                <button className="btn btn-sm btn-secondary" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>Logout</button>
              </>
            )}
          </div>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/customer" element={user?.role === 'CUSTOMER' ? <CustomerDashboard /> : <Navigate to="/" />} />
            <Route path="/dispatch" element={user?.role === 'DISPATCH_MANAGER' ? <DispatchDashboard /> : <Navigate to="/" />} />
            <Route path="/agent" element={user?.role === 'DELIVERY_AGENT' ? <AgentDashboard /> : <Navigate to="/" />} />
            <Route path="/returns" element={user?.role === 'RETURNS_MANAGER' ? <ReturnsDashboard /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
