import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Truck, ArrowRight, Home } from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>No Active Order Details</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            It looks like you arrived here directly without completing a checkout.
          </p>
          <Link to="/" className="glass-btn btn-primary">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem', maxWidth: '750px' }}>
      
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Glow backdrop */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: '#6ee7b7'
        }}>
          <CheckCircle2 size={44} />
        </div>

        <span className="badge badge-success" style={{ marginBottom: '1rem' }}>ORDER SUCCESSFULLY PLACED</span>

        <h1 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '0.5rem' }}>
          Thank You For Your Order!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
          Order Reference: <strong style={{ color: '#818cf8' }}>#{order._id}</strong>
        </p>

        {/* Receipt Box */}
        <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'left', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Delivery Recipient</span>
              <strong style={{ color: '#fff', fontSize: '1rem' }}>{order.name}</strong>
              <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{order.mobile}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Payment Method</span>
              <span className="badge badge-primary">{order.paymentMethod}</span>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Shipping Address</span>
            <p style={{ color: '#fff', fontSize: '0.9rem', lineHeight: '1.4' }}>
              {order.address} (Pincode: {order.pincode})
            </p>
          </div>

          {/* Items Purchased */}
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: '700', display: 'block', marginBottom: '0.75rem' }}>
              ITEMS IN ORDER
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={item.mainImg} alt={item.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <span style={{ color: '#fff', fontWeight: '600', display: 'block' }}>{item.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Size: {item.size || 'M'} | Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span style={{ color: '#818cf8', fontWeight: '700' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontWeight: '700' }}>Grand Total Paid</span>
            <span style={{ color: '#818cf8', fontSize: '1.3rem', fontWeight: '900' }}>${order.totalAmount?.toFixed(2)}</span>
          </div>

        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/profile')} className="glass-btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
            <Package size={18} /> View Order History
          </button>

          <Link to="/products" className="glass-btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <Home size={18} /> Continue Shopping
          </Link>
        </div>

      </div>

    </div>
  );
};

export default OrderConfirmationPage;
