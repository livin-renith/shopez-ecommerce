import React, { useEffect, useState } from 'react';
import { User, Package, MapPin, Phone, Mail, ShieldCheck, Clock, CheckCircle, Edit3, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchMyOrdersApi, updateProfileApi } from '../services/api';

const UserProfilePage = () => {
  const { user, updateUserState, isAdmin } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Edit profile state
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [address, setAddress] = useState(user?.address || '');
  const [pincode, setPincode] = useState(user?.pincode || '');
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoadingOrders(true);
        const { data } = await fetchMyOrdersApi();
        setOrders(data || []);
      } catch (error) {
        console.error('Error loading my orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateProfileApi({ name, mobile, address, pincode });
      updateUserState(data);
      setEditing(false);
      setProfileMsg('Profile updated successfully');
      setTimeout(() => setProfileMsg(''), 3000);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#fff' }}>User Profile & Order History</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage account preferences and track placed orders.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Left Profile Details Card */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: isAdmin ? 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' : 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                {isAdmin ? <ShieldCheck size={28} /> : <User size={28} />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{user?.name}</h3>
                <span className={isAdmin ? 'badge badge-secondary' : 'badge badge-primary'}>
                  {isAdmin ? 'ADMINISTRATOR' : 'REGISTERED CUSTOMER'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setEditing(!editing)}
              className="glass-btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            >
              {editing ? 'Cancel' : <><Edit3 size={15} /> Edit</>}
            </button>
          </div>

          {profileMsg && (
            <div className="badge badge-success" style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', justifyContent: 'center' }}>
              {profileMsg}
            </div>
          )}

          {editing ? (
            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="glass-input" />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Mobile</label>
                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="glass-input" />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Address</label>
                <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} className="glass-input" style={{ resize: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Pincode</label>
                <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} className="glass-input" />
              </div>

              <button type="submit" className="glass-btn btn-primary" style={{ padding: '0.65rem' }}>
                <Save size={16} /> Save Profile Changes
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} color="#818cf8" />
                <span>{user?.email}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} color="#818cf8" />
                <span>{user?.mobile || 'No mobile added'}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="#818cf8" style={{ marginTop: '3px' }} />
                <span>{user?.address ? `${user.address} (Pincode: ${user.pincode})` : 'No default shipping address set'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Order History List */}
        <div>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={22} color="#ec4899" /> Order History ({orders.length})
            </h3>

            {loadingOrders ? (
              <div style={{ color: 'var(--text-muted)', padding: '2rem 0', textAlign: 'center' }}>
                Loading order history...
              </div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                You have not placed any orders yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {orders.map((order) => (
                  <div key={order._id} style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-glass)'
                  }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>
                          ORDER ID: <code style={{ color: '#a5b4fc' }}>#{order._id.substring(order._id.length - 8)}</code>
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </span>
                      </div>

                      <span className={`badge ${
                        order.status === 'Delivered' ? 'badge-success' :
                        order.status === 'Cancelled' ? 'badge-secondary' : 'badge-warning'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div style={{ borderTop: '1px dashed var(--border-glass)', borderBottom: '1px dashed var(--border-glass)', padding: '0.75rem 0', margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {order.items?.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                          <span style={{ color: '#fff' }}>{item.title} (x{item.quantity})</span>
                          <span style={{ color: 'var(--text-muted)' }}>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Payment: <strong style={{ color: '#fff' }}>{order.paymentMethod}</strong>
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#818cf8' }}>
                        Total: ${order.totalAmount?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default UserProfilePage;
