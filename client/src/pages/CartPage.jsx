import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, ShieldCheck, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrderApi } from '../services/api';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Shipping & Order Details Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [address, setAddress] = useState(user?.address || '');
  const [pincode, setPincode] = useState(user?.pincode || '');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const grandTotal = (subtotal + shippingFee).toFixed(2);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (cartItems.length === 0) {
      setErrorMsg('Your cart is empty');
      return;
    }

    if (!user) {
      // Redirect guest to login before checkout
      navigate('/auth?redirect=cart');
      return;
    }

    if (!address || !pincode) {
      setErrorMsg('Please complete shipping address and pincode details');
      return;
    }

    try {
      setSubmitting(true);
      const orderPayload = {
        name,
        email,
        mobile,
        address,
        pincode,
        paymentMethod,
        items: cartItems,
        totalAmount: parseFloat(grandTotal),
      };

      const { data } = await createOrderApi(orderPayload);
      clearCart();
      navigate('/confirmation', { state: { order: data } });
    } catch (error) {
      console.error('Order creation failed:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#60a5fa' }}>
            <ShoppingBag size={36} />
          </div>
          <h2 style={{ color: '#fff', marginBottom: '0.75rem' }}>Your Shopping Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Discover our premium products and start adding items to your cart.
          </p>
          <Link to="/products" className="glass-btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#fff' }}>Shopping Cart & Order Details</h1>
        <p style={{ color: 'var(--text-muted)' }}>Review your items and enter shipping information below.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        
        {/* Left Cart Items List */}
        <div>
          <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={20} color="#60a5fa" /> Order Items ({cartItems.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => {
                const p = item.product || item;
                const unitPrice = (item.price - (item.price * (item.discount || 0) / 100)).toFixed(2);
                
                return (
                  <div key={item._id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-glass)'
                  }}>
                    <img
                      src={item.mainImg || p.mainImg}
                      alt={item.title}
                      style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }}
                    />

                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.25rem' }}>{item.title || p.title}</h4>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span>Size: <strong style={{ color: '#93c5fd' }}>{item.size || 'M'}</strong></span>
                        <span>Price: <strong style={{ color: '#60a5fa' }}>${unitPrice}</strong></span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', borderRadius: '6px', width: '26px', height: '26px', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff', width: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', borderRadius: '6px', width: '26px', height: '26px', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0.4rem' }}
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Checkout & Shipping Address Form */}
        <div>
          <form onSubmit={handlePlaceOrder} className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} color="#facc15" /> Shipping & Payment Details
            </h3>

            {errorMsg && (
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Recipient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555-0199"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="glass-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street Address, Apartment, Suite..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="glass-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Postal Pincode *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 94025"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="glass-input"
                />
              </div>

              {/* Payment Option Selection */}
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Select Payment Method</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {['COD', 'Card', 'UPI'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      style={{
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-md)',
                        background: paymentMethod === method ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255,255,255,0.05)',
                        border: paymentMethod === method ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                        color: paymentMethod === method ? '#ffffff' : 'var(--text-muted)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {method === 'COD' ? '💵 COD' : method === 'Card' ? '💳 Card' : '📱 UPI'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Pricing Breakdown */}
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <span style={{ color: 'var(--accent-emerald)' }}>FREE</span> : `$${shippingFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '1.25rem', fontWeight: '900' }}>
                <span>Total Amount</span>
                <span style={{ color: '#60a5fa' }}>${grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="glass-btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: '700' }}
            >
              {submitting ? 'Processing Order...' : 'Confirm & Place Order'} <ArrowRight size={18} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default CartPage;
