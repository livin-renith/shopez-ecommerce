import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  ShieldCheck,
  CheckCircle,
  Truck,
  AlertTriangle,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  fetchAdminStatsApi,
  fetchProductsApi,
  createProductApi,
  deleteProductApi,
  updateProductApi,
  fetchAllUsersApi,
  deleteUserApi,
  updateUserRoleApi,
  fetchAllOrdersApi,
  updateOrderStatusApi,
} from '../services/api';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');

  // Stats State
  const [stats, setStats] = useState(null);

  // Products State
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    mainImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    gender: 'Unisex',
    sizes: 'S, M, L, XL',
    price: '',
    discount: '0',
    stock: '50',
  });

  // Users State
  const [usersList, setUsersList] = useState([]);

  // Orders State
  const [ordersList, setOrdersList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/auth');
      return;
    }

    loadDashboardData();
  }, [isAdmin]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, prodRes, userRes, orderRes] = await Promise.all([
        fetchAdminStatsApi(),
        fetchProductsApi({}),
        fetchAllUsersApi(),
        fetchAllOrdersApi(),
      ]);

      setStats(statsRes.data);
      setProducts(prodRes.data || []);
      setUsersList(userRes.data || []);
      setOrdersList(orderRes.data || []);
    } catch (error) {
      console.error('Error loading admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerToast = (msg) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  // Add Product Handler
  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        discount: parseFloat(newProduct.discount || 0),
        stock: parseInt(newProduct.stock || 50),
        sizes: newProduct.sizes.split(',').map((s) => s.trim()),
      };

      const { data } = await createProductApi(payload);
      setProducts([data, ...products]);
      setShowAddProductModal(false);
      setNewProduct({
        title: '',
        description: '',
        mainImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
        category: 'Electronics',
        gender: 'Unisex',
        sizes: 'S, M, L, XL',
        price: '',
        discount: '0',
        stock: '50',
      });
      triggerToast('New product added to catalog successfully');
    } catch (error) {
      console.error('Add product error:', error);
    }
  };

  // Delete Product Handler
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductApi(id);
        setProducts(products.filter((p) => p._id !== id));
        triggerToast('Product deleted from database');
      } catch (error) {
        console.error('Delete product error:', error);
      }
    }
  };

  // Delete User Handler
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to remove this user account?')) {
      try {
        await deleteUserApi(id);
        setUsersList(usersList.filter((u) => u._id !== id));
        triggerToast('User account removed');
      } catch (error) {
        alert(error.response?.data?.message || 'Cannot delete user');
      }
    }
  };

  // Update Order Status Handler
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await updateOrderStatusApi(orderId, newStatus);
      setOrdersList(ordersList.map((o) => (o._id === orderId ? data : o)));
      triggerToast(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Update status error:', error);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      {/* Admin Portal Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ec4899', marginBottom: '0.25rem' }}>
            <ShieldCheck size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em' }}>
              ADMINISTRATOR MANAGEMENT CONSOLE
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', color: '#fff' }}>ShopEZ Store Control Center</h1>
        </div>

        <div className="badge badge-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
          Logged in as: admin@gmail.com
        </div>
      </div>

      {actionMsg && (
        <div className="badge badge-success animate-fade-in" style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          <CheckCircle size={16} /> {actionMsg}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="glass-panel" style={{ padding: '0.5rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('overview')}
          className="glass-btn"
          style={{
            flex: 1,
            background: activeTab === 'overview' ? 'var(--primary)' : 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: '0.9rem'
          }}
        >
          <LayoutDashboard size={16} /> Overview
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className="glass-btn"
          style={{
            flex: 1,
            background: activeTab === 'products' ? 'var(--primary)' : 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: '0.9rem'
          }}
        >
          <Package size={16} /> Product Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className="glass-btn"
          style={{
            flex: 1,
            background: activeTab === 'users' ? 'var(--primary)' : 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: '0.9rem'
          }}
        >
          <Users size={16} /> Manage Users ({usersList.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className="glass-btn"
          style={{
            flex: 1,
            background: activeTab === 'orders' ? 'var(--primary)' : 'transparent',
            color: '#fff',
            border: 'none',
            fontSize: '0.9rem'
          }}
        >
          <ShoppingBag size={16} /> All Customer Orders ({ordersList.length})
        </button>
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div>
          {/* Key Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                <DollarSign size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Revenue</span>
                <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>${stats?.totalRevenue?.toFixed(2) || '0.00'}</h3>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
                <ShoppingBag size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Orders</span>
                <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>{stats?.totalOrders || ordersList.length}</h3>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
                <Package size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Products in Catalog</span>
                <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>{stats?.totalProducts || products.length}</h3>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                <Users size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Registered Users</span>
                <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>{stats?.totalUsers || usersList.length}</h3>
              </div>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.2rem' }}>Recent Order Submissions</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', color: '#fff' }}>
                    <th style={{ padding: '0.75rem' }}>Order ID</th>
                    <th style={{ padding: '0.75rem' }}>Customer</th>
                    <th style={{ padding: '0.75rem' }}>Total</th>
                    <th style={{ padding: '0.75rem' }}>Payment</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.slice(0, 5).map((ord) => (
                    <tr key={ord._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.75rem', color: '#a5b4fc' }}>#{ord._id.substring(ord._id.length - 8)}</td>
                      <td style={{ padding: '0.75rem', color: '#fff' }}>{ord.name}</td>
                      <td style={{ padding: '0.75rem', color: '#818cf8', fontWeight: '700' }}>${ord.totalAmount?.toFixed(2)}</td>
                      <td style={{ padding: '0.75rem' }}>{ord.paymentMethod}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge badge-primary">{ord.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Product Catalog Management */}
      {activeTab === 'products' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.25rem' }}>Manage Store Products</h3>
            <button onClick={() => setShowAddProductModal(true)} className="glass-btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              <Plus size={16} /> Add New Product
            </button>
          </div>

          {/* Add Product Modal */}
          {showAddProductModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}>
              <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Add New Product</h3>
                  <button onClick={() => setShowAddProductModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Product Title *</label>
                    <input type="text" required value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} className="glass-input" />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Description *</label>
                    <textarea rows={3} required value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="glass-input" style={{ resize: 'none' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Category *</label>
                      <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="glass-input" style={{ background: '#090d16' }}>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Furniture">Furniture</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Gender Target</label>
                      <select value={newProduct.gender} onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value })} className="glass-input" style={{ background: '#090d16' }}>
                        <option value="Unisex">Unisex</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Price ($) *</label>
                      <input type="number" step="0.01" required value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="glass-input" />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Discount (%)</label>
                      <input type="number" value={newProduct.discount} onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })} className="glass-input" />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Stock Qty</label>
                      <input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="glass-input" />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Main Image URL</label>
                    <input type="text" value={newProduct.mainImg} onChange={(e) => setNewProduct({ ...newProduct, mainImg: e.target.value })} className="glass-input" />
                  </div>

                  <button type="submit" className="glass-btn btn-primary" style={{ padding: '0.75rem', marginTop: '0.5rem' }}>
                    Save Product to Store
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Product Grid Table */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', color: '#fff' }}>
                    <th style={{ padding: '0.75rem' }}>Product</th>
                    <th style={{ padding: '0.75rem' }}>Category</th>
                    <th style={{ padding: '0.75rem' }}>Price</th>
                    <th style={{ padding: '0.75rem' }}>Stock</th>
                    <th style={{ padding: '0.75rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
                        <img src={p.mainImg} alt={p.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: '600' }}>{p.title}</span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>{p.category}</td>
                      <td style={{ padding: '0.75rem', color: '#818cf8', fontWeight: '700' }}>${p.price}</td>
                      <td style={{ padding: '0.75rem' }}>{p.stock}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <button onClick={() => handleDeleteProduct(p._id)} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: User Management */}
      {activeTab === 'users' && (
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.2rem' }}>Registered Accounts List</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: '#fff' }}>
                  <th style={{ padding: '0.75rem' }}>Name</th>
                  <th style={{ padding: '0.75rem' }}>Email</th>
                  <th style={{ padding: '0.75rem' }}>Role</th>
                  <th style={{ padding: '0.75rem' }}>Mobile</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((u) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem', color: '#fff', fontWeight: '600' }}>{u.name}</td>
                    <td style={{ padding: '0.75rem' }}>{u.email}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${u.userType === 'admin' ? 'badge-secondary' : 'badge-primary'}`}>
                        {u.userType}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{u.mobile || 'N/A'}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {u.email !== 'admin@gmail.com' && (
                        <button onClick={() => handleDeleteUser(u._id)} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content 4: Orders Management */}
      {activeTab === 'orders' && (
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.2rem' }}>Manage All Customer Orders</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: '#fff' }}>
                  <th style={{ padding: '0.75rem' }}>Order ID</th>
                  <th style={{ padding: '0.75rem' }}>Customer Details</th>
                  <th style={{ padding: '0.75rem' }}>Items</th>
                  <th style={{ padding: '0.75rem' }}>Total Amount</th>
                  <th style={{ padding: '0.75rem' }}>Status Update</th>
                </tr>
              </thead>
              <tbody>
                {ordersList.map((ord) => (
                  <tr key={ord._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem', color: '#a5b4fc' }}>#{ord._id.substring(ord._id.length - 8)}</td>
                    <td style={{ padding: '0.75rem', color: '#fff' }}>
                      <div>{ord.name}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{ord.mobile} | {ord.pincode}</span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {ord.items?.map((it, idx) => (
                        <div key={idx} style={{ fontSize: '0.8rem' }}>• {it.title} (x{it.quantity})</div>
                      ))}
                    </td>
                    <td style={{ padding: '0.75rem', color: '#818cf8', fontWeight: '700' }}>${ord.totalAmount?.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <select
                        value={ord.status}
                        onChange={(e) => handleOrderStatusChange(ord._id, e.target.value)}
                        className="glass-input"
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.85rem', background: '#090d16' }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
