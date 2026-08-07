import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Zap, ArrowRight, Star, Flame, Award, Heart, CheckCircle2, Send, ShoppingBag } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { fetchProductsApi } from '../services/api';

const categoriesList = [
  {
    name: 'Electronics',
    icon: '🎧',
    count: '10 Products',
    desc: 'High-fidelity audio, smartwatches & high-tech studio gear.',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    color: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(79, 70, 229, 0.4) 100%)',
  },
  {
    name: 'Fashion',
    icon: '🧥',
    count: '10 Products',
    desc: 'Urban windbreakers, silk dresses & handcrafted leather apparel.',
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    color: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(190, 24, 93, 0.4) 100%)',
  },
  {
    name: 'Footwear',
    icon: '👟',
    count: '10 Products',
    desc: 'Performance running sneakers, retro kicks & Italian boots.',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    color: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(14, 116, 144, 0.4) 100%)',
  },
  {
    name: 'Furniture',
    icon: '🪑',
    count: '10 Products',
    desc: 'Cyber ergonomic chairs, standing desks & Scandinavian oak decor.',
    img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80',
    color: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(180, 83, 9, 0.4) 100%)',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Sophia Martinez',
    role: 'Verified Buyer',
    comment: 'ShopEZ provided the smoothest online shopping experience! My Aura headphones arrived in less than 24 hours with pristine glassmorphic packaging.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Tech Enthusiast',
    comment: 'The 1-click Shop Now feature is brilliant. I ordered the Cyberpunk Smart Watch and tracked delivery seamlessly from my user profile page.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Emma Watson',
    role: 'Interior Designer',
    comment: 'Remarkable quality for the Vanguard Ergonomic Chair. Clean modern UI, fast API checkout, and top-notch customer support!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Newsletter state
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductsApi({
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
        });
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching home products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const flashDeals = products.filter((p) => (p.discount || 0) >= 15).slice(0, 4);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      {/* 1. Hero Banner Section */}
      <HeroBanner />

      {/* 2. Value Propositions Bar */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(7, 10, 18, 0.95) 100%)',
        borderColor: 'rgba(255, 255, 255, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.18)', color: '#60a5fa', boxShadow: '0 0 15px rgba(37,99,235,0.25)' }}>
            <Truck size={28} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.2rem' }}>Express Delivery</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Free shipping on all orders over $50</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.18)', color: '#facc15', boxShadow: '0 0 15px rgba(245,158,11,0.25)' }}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.2rem' }}>256-Bit SSL Security</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Encrypted COD, Card & UPI checkout</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: 'rgba(56, 189, 248, 0.18)', color: '#38bdf8', boxShadow: '0 0 15px rgba(56,189,248,0.25)' }}>
            <RefreshCw size={28} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.2rem' }}>30-Day Free Returns</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hassle-free money-back guarantee</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.85rem', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.2)', color: '#facc15', boxShadow: '0 0 15px rgba(245,158,11,0.3)' }}>
            <Zap size={28} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.2rem' }}>1-Click "Shop Now"</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Instant checkout flow to order page</p>
          </div>
        </div>
      </div>

      {/* 3. Category Grid Showcase */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', marginBottom: '0.4rem' }}>
            <Sparkles size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              BROWSE BY CATEGORY
            </span>
          </div>
          <h2 style={{ fontSize: '2.4rem', color: '#fff', fontWeight: '900' }}>Explore Our Curated Collections</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Discover 40 premium products carefully designed for your modern lifestyle.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.75rem'
        }}>
          {categoriesList.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="glass-card animate-fade-in"
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.75rem',
                textDecoration: 'none'
              }}
            >
              {/* Card Image */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${cat.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.45)',
                transition: 'transform 0.5s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />

              {/* Gradient Mask */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, rgba(7, 10, 18, 0.95) 0%, rgba(7, 10, 18, 0.4) 60%, transparent 100%)'
              }} />

              {/* Content Overlay */}
              <div style={{ position: 'relative', zIndex: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                  <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                    {cat.count}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '800', marginBottom: '0.4rem' }}>
                  {cat.name}
                </h3>
                
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4', marginBottom: '1rem' }}>
                  {cat.desc}
                </p>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: '700', fontSize: '0.85rem' }}>
                  Explore Collection <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Flash Deals Spotlight Banner */}
      {flashDeals.length > 0 && (
        <div style={{ marginBottom: '4.5rem' }}>
          <div className="glass-panel" style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(37, 99, 235, 0.15) 100%)',
            borderColor: 'rgba(245, 158, 11, 0.35)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#facc15', marginBottom: '0.25rem' }}>
                  <Flame size={20} color="#facc15" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.12em' }}>LIMITED TIME OFFER</span>
                </div>
                <h2 style={{ fontSize: '2.2rem', color: '#fff', fontWeight: '900' }}>Today's Top Flash Discounts</h2>
              </div>

              <Link to="/products" className="glass-btn btn-accent" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                View All Deals <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {flashDeals.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Main Catalog Grid with Filter Pills */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', marginBottom: '0.25rem' }}>
              <Award size={18} />
              <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                LIVE STORE CATALOG
              </span>
            </div>
            <h2 style={{ fontSize: '2.2rem', color: '#fff', fontWeight: '900' }}>Featured E-Commerce Products</h2>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['All', 'Electronics', 'Fashion', 'Footwear', 'Furniture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="glass-btn"
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.9rem',
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                  borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border-glass)',
                  boxShadow: selectedCategory === cat ? '0 0 15px var(--primary-glow)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
            Loading products...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/products" className="glass-btn btn-secondary" style={{ padding: '0.85rem 2.5rem', fontSize: '1rem', fontWeight: '700' }}>
            View Full 40+ Product Catalog <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* 6. Customer Testimonials Section */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#facc15', marginBottom: '0.4rem' }}>
            <Heart size={18} color="#facc15" fill="#facc15" />
            <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em' }}>HAPPY SHOPPERS</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', fontWeight: '900' }}>What Our Customers Say</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem'
        }}>
          {testimonials.map((t) => (
            <div key={t.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.25rem', color: '#facc15', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#facc15" color="#facc15" />
                  ))}
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', italic: 'true' }}>
                  "{t.comment}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                <img src={t.avatar} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700' }}>{t.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={12} /> {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Newsletter Subscription Section */}
      <div className="glass-panel" style={{
        padding: '3.5rem 2.5rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.22) 0%, rgba(245, 158, 11, 0.15) 100%)',
        borderColor: 'rgba(37, 99, 235, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>EXCLUSIVE MEMBER DISCOUNTS</span>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', fontWeight: '900', marginBottom: '0.75rem' }}>
            Subscribe & Save 15% On Your Next Order
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Join our ShopEZ insider list to get instant promo codes, flash sale alerts, and VIP new product drops directly in your inbox.
          </p>

          {subscribed ? (
            <div className="badge badge-success animate-fade-in" style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem', margin: '0 auto' }}>
              <CheckCircle2 size={18} /> Thank you for subscribing! Your 15% discount code is <strong>SHOPEZ15</strong>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="glass-input"
                style={{ flex: '1 1 280px', padding: '0.85rem 1.25rem' }}
              />
              <button type="submit" className="glass-btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontWeight: '700' }}>
                Subscribe <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
