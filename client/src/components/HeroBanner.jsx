import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award, Clock, Star, Flame } from 'lucide-react';

const bannerSlides = [
  {
    id: 1,
    title: 'Next-Gen Wireless Audio Experience',
    subtitle: 'Active noise cancellation with 40mm custom beryllium acoustic drivers.',
    badge: 'FLASH DEAL',
    discount: 'SAVE 20% TODAY',
    price: '$249.99',
    originalPrice: '$299.99',
    rating: 4.9,
    reviews: 238,
    bgImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Electronics',
    category: 'Electronics',
  },
  {
    id: 2,
    title: 'Cyberpunk Titanium Smartwatches',
    subtitle: 'Ultra-thin holographic OLED display with 24/7 biometric health tracking.',
    badge: 'EXCLUSIVE',
    discount: 'LIMITED STOCK',
    price: '$319.99',
    originalPrice: '$359.99',
    rating: 4.8,
    reviews: 184,
    bgImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Electronics',
    category: 'Electronics',
  },
  {
    id: 3,
    title: 'Luminous Performance Street Sneakers',
    subtitle: 'Ultra-cushioned responsive air soles engineered for urban movement.',
    badge: 'TRENDING',
    discount: 'HOT ARRIVAL',
    price: '$164.99',
    originalPrice: '$189.99',
    rating: 4.9,
    reviews: 312,
    bgImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Footwear',
    category: 'Footwear',
  },
  {
    id: 4,
    title: 'Ergonomic Cyber Gaming Comfort',
    subtitle: 'Breathable cold-cure foam cushion with 4D armrests and 165° recline.',
    badge: 'TOP RATED',
    discount: '25% OFF SPECIAL',
    price: '$299.99',
    originalPrice: '$399.99',
    rating: 4.9,
    reviews: 142,
    bgImg: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1600&auto=format&fit=crop&q=80',
    link: '/products?category=Furniture',
    category: 'Furniture',
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const slide = bannerSlides[currentSlide];

  return (
    <div style={{
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: '3.5rem',
      minHeight: '480px',
      border: '1px solid var(--border-glass)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Background Image with Dynamic Fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${slide.bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        filter: 'brightness(0.55)'
      }} />

      {/* Multi-stage Glass Gradient Mask */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(7, 10, 18, 0.96) 0%, rgba(7, 10, 18, 0.8) 55%, rgba(7, 10, 18, 0.45) 100%)'
      }} />

      {/* Content Inner Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        padding: '3.5rem 3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        
        {/* Left Column: Hero Text & Buttons */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.85rem' }}>
              <Flame size={14} color="#facc15" /> {slide.badge}
            </span>
            <span className="badge badge-primary" style={{ padding: '0.35rem 0.85rem' }}>
              {slide.discount}
            </span>
          </div>

          <h1 style={{
            fontSize: '3rem',
            lineHeight: '1.1',
            marginBottom: '1rem',
            color: '#ffffff',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0,0,0,0.6)'
          }}>
            {slide.title}
          </h1>

          <p style={{
            color: '#cbd5e1',
            fontSize: '1.15rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
            fontWeight: '400',
            maxWidth: '540px'
          }}>
            {slide.subtitle}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <Link to={slide.link} className="glass-btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', fontWeight: '700' }}>
              Explore Deal <ArrowRight size={18} />
            </Link>

            <Link to="/products" className="glass-btn btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              Browse Catalog
            </Link>
          </div>
        </div>

        {/* Right Column: Glass Product Feature Card & Timer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="glass-panel animate-fade-in" style={{
            padding: '1.75rem',
            maxWidth: '340px',
            width: '100%',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
          }}>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                FEATURED ITEM
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#facc15', fontSize: '0.85rem', fontWeight: '700' }}>
                <Star size={14} fill="#facc15" color="#facc15" />
                <span>{slide.rating}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>({slide.reviews})</span>
              </div>
            </div>

            {/* Price Box */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff' }}>
                {slide.price}
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                {slide.originalPrice}
              </span>
            </div>

            {/* Countdown Box */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              border: '1px solid var(--border-glass)',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#facc15', fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Clock size={14} /> Flash Deal Ends In:
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '0.4rem 0.6rem', borderRadius: '6px', flex: 1 }}>
                  <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '900', display: 'block' }}>0{timeLeft.hours}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>HOURS</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '0.4rem 0.6rem', borderRadius: '6px', flex: 1 }}>
                  <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '900', display: 'block' }}>{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>MINS</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '0.4rem 0.6rem', borderRadius: '6px', flex: 1 }}>
                  <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '900', display: 'block' }}>{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>SECS</span>
                </div>
              </div>
            </div>

            <Link to={slide.link} className="glass-btn btn-accent" style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', fontWeight: '800' }}>
              <Zap size={16} color="#070a12" /> Shop Item Now
            </Link>

          </div>
        </div>

      </div>

      {/* Carousel Navigation Dots */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        right: '40px',
        zIndex: 10,
        display: 'flex',
        gap: '0.6rem'
      }}>
        {bannerSlides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: idx === currentSlide ? '32px' : '10px',
              height: '10px',
              borderRadius: 'var(--radius-full)',
              background: idx === currentSlide ? 'var(--primary)' : 'rgba(255, 255, 255, 0.3)',
              transition: 'var(--transition)',
              border: 'none',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroBanner;
