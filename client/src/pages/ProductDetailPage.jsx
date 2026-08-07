import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Zap, ShieldCheck, Truck, ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { fetchProductByIdApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductByIdApi(id);
        setProduct(data);
        setSelectedImg(data.mainImg);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="glass-btn btn-primary">
          Return to Catalog
        </button>
      </div>
    );
  }

  const discountedPrice = (product.price - (product.price * (product.discount || 0) / 100)).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleShopNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/cart');
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="glass-btn btn-secondary"
        style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', marginBottom: '1.5rem' }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem'
      }}>
        
        {/* Left Image Gallery */}
        <div>
          <div className="glass-panel" style={{
            position: 'relative',
            width: '100%',
            height: '420px',
            overflow: 'hidden',
            marginBottom: '1rem',
            padding: '1rem'
          }}>
            <img
              src={selectedImg || product.mainImg}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
            />
          </div>

          {/* Thumbnails */}
          {product.carousel && product.carousel.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto' }}>
              <img
                src={product.mainImg}
                alt="thumb"
                onClick={() => setSelectedImg(product.mainImg)}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: selectedImg === product.mainImg ? '2px solid var(--primary)' : '1px solid var(--border-glass)'
                }}
              />
              {product.carousel.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setSelectedImg(img)}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImg === img ? '2px solid var(--primary)' : '1px solid var(--border-glass)'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Details Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-primary">{product.category}</span>
            <span className="badge badge-secondary">{product.gender}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Check size={14} /> In Stock ({product.stock} units)
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '0.75rem', lineHeight: '1.2' }}>
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#facc15' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating || 4.8) ? "#facc15" : "transparent"} color="#facc15" />
              ))}
            </div>
            <span style={{ color: '#fff', fontWeight: '700', fontSize: '0.9rem' }}>{product.rating || 4.8}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({product.reviewCount || 124} customer reviews)</span>
          </div>

          {/* Price Box */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: '900', color: '#60a5fa' }}>
              ${discountedPrice}
            </span>
            {product.discount > 0 && (
              <>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                  ${product.price}
                </span>
                <span className="badge badge-secondary" style={{ fontSize: '0.8rem' }}>
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Select Size:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedSize === sz ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedSize === sz ? '#fff' : 'var(--text-muted)',
                      border: selectedSize === sz ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          {!isAdmin && (
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#fff', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Quantity:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="glass-btn btn-secondary"
                  style={{ padding: '0.5rem', width: '38px', height: '38px' }}
                >
                  <Minus size={16} />
                </button>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="glass-btn btn-secondary"
                  style={{ padding: '0.5rem', width: '38px', height: '38px' }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isAdmin ? (
            <button
              onClick={() => navigate('/admin')}
              className="glass-btn btn-secondary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                color: '#facc15',
                borderColor: 'rgba(245, 158, 11, 0.4)',
                background: 'rgba(245, 158, 11, 0.1)',
                fontWeight: '700'
              }}
            >
              <ShieldCheck size={18} /> Manage Inventory in Admin Portal
            </button>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                onClick={handleAddToCart}
                className="glass-btn btn-secondary"
                style={{ padding: '0.85rem', fontSize: '1rem' }}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <button
                onClick={handleShopNow}
                className="glass-btn btn-primary"
                style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: '700' }}
              >
                <Zap size={18} color="#fff" /> Shop Now
              </button>
            </div>
          )}

          {/* Added Toast Notification */}
          {addedToast && (
            <div className="badge badge-success animate-fade-in" style={{ padding: '0.75rem', justifyContent: 'center', gap: '0.5rem' }}>
              <Check size={16} /> Item added to cart successfully!
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductDetailPage;
