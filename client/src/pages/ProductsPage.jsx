import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Grid, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProductsApi } from '../services/api';

const categories = ['All', 'Electronics', 'Fashion', 'Footwear', 'Furniture'];
const genders = ['All', 'Men', 'Women', 'Kids', 'Unisex'];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [gender, setGender] = useState(searchParams.get('gender') || 'All');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductsApi({
          category: category !== 'All' ? category : undefined,
          gender: gender !== 'All' ? gender : undefined,
          search: search || undefined,
          sort,
        });
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching catalog:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, gender, search, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ category, gender, search });
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8', marginBottom: '0.25rem' }}>
          <Sparkles size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Comprehensive Product Catalog
          </span>
        </div>
        <h1 style={{ fontSize: '2.5rem', color: '#fff' }}>Discover ShopEZ Collections</h1>
      </div>

      {/* Filter & Controls Panel */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          
          {/* Search Bar */}
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search products by title, description, brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>

          {/* Category Dropdown */}
          <div style={{ flex: '0 1 180px' }}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass-input"
              style={{ background: 'rgba(9, 13, 22, 0.8)', cursor: 'pointer' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ background: '#090d16', color: '#fff' }}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter Dropdown */}
          <div style={{ flex: '0 1 160px' }}>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="glass-input"
              style={{ background: 'rgba(9, 13, 22, 0.8)', cursor: 'pointer' }}
            >
              {genders.map((g) => (
                <option key={g} value={g} style={{ background: '#090d16', color: '#fff' }}>
                  {g === 'All' ? 'All Genders' : g}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div style={{ flex: '0 1 180px' }}>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="glass-input"
              style={{ background: 'rgba(9, 13, 22, 0.8)', cursor: 'pointer' }}
            >
              <option value="newest" style={{ background: '#090d16', color: '#fff' }}>Newest Arrivals</option>
              <option value="price-low" style={{ background: '#090d16', color: '#fff' }}>Price: Low to High</option>
              <option value="price-high" style={{ background: '#090d16', color: '#fff' }}>Price: High to Low</option>
              <option value="rating" style={{ background: '#090d16', color: '#fff' }}>Highest Rated</option>
            </select>
          </div>

        </form>
      </div>

      {/* Results Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Showing <strong style={{ color: '#fff' }}>{products.length}</strong> products
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>No Products Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search criteria or category filters.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.75rem',
          marginBottom: '4rem'
        }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ProductsPage;
