import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '4rem',
      background: 'rgba(9, 13, 22, 0.9)',
      borderTop: '1px solid var(--border-glass)',
      padding: '4rem 0 2rem 0',
      backdropFilter: 'blur(20px)'
    }}>
      <div className="container">
        

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingBag size={18} color="#fff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fff' }}>ShopEZ</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Retail individual ShopEZ is your one-stop destination for effortless online shopping. Engineered with clean MERN stack architecture and glassmorphism design.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1rem' }}>Explore Catalog</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/products" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All Products</Link></li>
              <li><Link to="/products?category=Electronics" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Electronics & Tech</Link></li>
              <li><Link to="/products?category=Fashion" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Urban Apparel</Link></li>
              <li><Link to="/products?category=Footwear" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sneakers & Footwear</Link></li>
            </ul>
          </div>

          {/* Architecture Highlights */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1rem' }}>MVC Architecture</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Model: MongoDB Mongoose Schemas</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>View: React Vite + Glassmorphism UI</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Controller: Express.js REST Controllers</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Security: JWT Auth & Bcrypt Hashing</li>
            </ul>
          </div>

          {/* Admin Fast Link */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1rem' }}>Admin Access</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              Pre-configured admin login provides total product catalog management, order processing, and user access controls.
            </p>
            <Link to="/auth" className="glass-btn btn-secondary" style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}>
              Login to Admin Portal
            </Link>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--text-dim)',
          fontSize: '0.85rem'
        }}>
          <div>
            © 2026 ShopEZ Retail Inc. All rights reserved. Built with modern web standards.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Crafted with <Heart size={14} color="#ec4899" fill="#ec4899" /> for Mentor Review
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
