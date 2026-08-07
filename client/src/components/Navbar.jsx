import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, ShieldCheck, LogOut, Search, Sparkles, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass-nav">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(37, 99, 235, 0.45)'
          }}>
            <ShoppingBag size={22} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.03em', background: 'linear-gradient(90deg, #ffffff 0%, #93c5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ShopEZ
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: '#facc15', letterSpacing: '0.15em', fontWeight: '700', textTransform: 'uppercase' }}>
              Effortless Shopping
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <Link to="/" style={{
            color: isActive('/') ? '#60a5fa' : '#cbd5e1',
            fontWeight: isActive('/') ? '700' : '500',
            fontSize: '0.95rem',
            transition: 'var(--transition)'
          }}>
            Home
          </Link>

          <Link to="/products" style={{
            color: isActive('/products') ? '#60a5fa' : '#cbd5e1',
            fontWeight: isActive('/products') ? '700' : '500',
            fontSize: '0.95rem',
            transition: 'var(--transition)'
          }}>
            Catalog
          </Link>

          {isAdmin && (
            <Link to="/admin" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: isActive('/admin') ? '#fde047' : '#f59e0b',
              fontWeight: '700',
              fontSize: '0.95rem',
              background: 'rgba(245, 158, 11, 0.12)',
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(245, 158, 11, 0.35)'
            }}>
              <LayoutDashboard size={16} />
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          
          {/* Cart Icon Badge */}
          <Link to="/cart" style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f8fafc',
            transition: 'var(--transition)'
          }}>
            <ShoppingBag size={20} />
            {totalItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#070a12',
                fontSize: '0.7rem',
                fontWeight: '900',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)'
              }}>
                {totalItemsCount}
              </span>
            )}
          </Link>

          {/* User Auth state */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/profile" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-glass)',
                color: '#f8fafc',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {isAdmin ? <ShieldCheck size={18} color="#f59e0b" /> : <User size={18} color="#60a5fa" />}
                <span>{user.name.split(' ')[0]}</span>
              </Link>

              <button onClick={() => { logout(); navigate('/'); }} style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)'
              }} title="Sign Out">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="glass-btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              Sign In
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;
