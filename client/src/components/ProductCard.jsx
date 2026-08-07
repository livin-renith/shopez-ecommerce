import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Zap, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const discountedPrice = (product.price - (product.price * (product.discount || 0) / 100)).toFixed(2);

  const handleShopNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, product.sizes?.[0] || 'M', 1);
    navigate('/cart');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, product.sizes?.[0] || 'M', 1);
  };

  return (
    <div className="glass-card animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Discount Pill */}
      {product.discount > 0 && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 2,
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#070a12',
          fontWeight: '900',
          fontSize: '0.75rem',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.45)'
        }}>
          {product.discount}% OFF
        </div>
      )}

      {/* Gender/Category Pill */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 2,
        background: 'rgba(7, 10, 18, 0.8)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--border-glass)',
        color: '#93c5fd',
        fontWeight: '600',
        fontSize: '0.7rem',
        padding: '0.25rem 0.6rem',
        borderRadius: 'var(--radius-full)'
      }}>
        {product.gender || 'Unisex'}
      </div>

      {/* Product Image Link */}
      <Link to={`/products/${product._id}`} style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        paddingTop: '80%',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.3)'
      }}>
        <img
          src={product.mainImg}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </Link>

      {/* Card Content Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* Category & Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#facc15', fontSize: '0.8rem', fontWeight: '700' }}>
            <Star size={14} fill="#facc15" color="#facc15" />
            <span>{product.rating || 4.8}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/products/${product._id}`} style={{
          fontSize: '1.05rem',
          fontWeight: '700',
          color: '#ffffff',
          marginBottom: '0.75rem',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {product.title}
        </Link>

        {/* Price Row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.25rem', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.35rem', fontWeight: '900', color: '#60a5fa' }}>
            ${discountedPrice}
          </span>
          {product.discount > 0 && (
            <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
              ${product.price}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        {isAdmin ? (
          /* Admin View Controls */
          <button
            onClick={() => navigate('/admin')}
            className="glass-btn btn-secondary"
            style={{
              width: '100%',
              fontSize: '0.85rem',
              padding: '0.6rem',
              color: '#facc15',
              borderColor: 'rgba(245, 158, 11, 0.4)',
              background: 'rgba(245, 158, 11, 0.1)'
            }}
          >
            <ShieldCheck size={16} /> Manage in Admin Portal
          </button>
        ) : (
          /* Customer View Controls: Shop Now & Add to Cart */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              onClick={handleAddToCart}
              className="glass-btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.5rem', width: '100%' }}
              title="Add to Cart"
            >
              <ShoppingBag size={15} /> Add Cart
            </button>
            
            <button
              onClick={handleShopNow}
              className="glass-btn btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.5rem', width: '100%', fontWeight: '700' }}
              title="Immediate Shop Now Checkout"
            >
              <Zap size={15} color="#fff" /> Shop Now
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default ProductCard;
