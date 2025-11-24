// src/pages/ProductList/ProductList.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductList.module.css';

// High-Quality Mock Data with MOQ & Ratings
const mockWatches = [
  {
    id: 1,
    brand: 'TAG HEUER',
    title: 'Carrera Chronograph Skipper 39mm Mens Watch Blue',
    price: '£5,900.00',
    installment: 'From £122.92 per month',
    moq: '2 Pcs Min',
    rating: 4.8,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    brand: 'ROLEX',
    title: 'Submariner Date 41mm Oystersteel Black Dial',
    price: '£8,500.00',
    installment: 'From £195.33 per month',
    moq: '1 Pc Min',
    rating: 5.0,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    brand: 'OMEGA',
    title: 'Speedmaster Moonwatch Professional Co-Axial',
    price: '£6,400.00',
    installment: 'From £140.63 per month',
    moq: '5 Pcs Min',
    rating: 4.7,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1622434641406-a158123452f9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    brand: 'BREITLING',
    title: 'Navitimer B01 Chronograph 43 Stainless Steel',
    price: '£7,200.00',
    installment: 'From £150.00 per month',
    moq: '3 Pcs Min',
    rating: 4.9,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1612817288484-0943d9651df6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    brand: 'TAG HEUER',
    title: 'Formula 1 Quartz Chronograph 43mm Red',
    price: '£1,650.00',
    installment: 'From £35.00 per month',
    moq: '10 Pcs Min',
    rating: 4.5,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1594534475889-56e380041d06?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    brand: 'TISSOT',
    title: 'PRX Powermatic 80 40mm Ice Blue Dial',
    price: '£610.00',
    installment: 'From £12.46 per month',
    moq: '20 Pcs Min',
    rating: 4.6,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1639029641363-909cb9188d71?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    brand: 'SEIKO',
    title: 'Prospex Speedtimer Solar Chronograph Panda',
    price: '£590.00',
    installment: 'From £11.90 per month',
    moq: '15 Pcs Min',
    rating: 4.8,
    reviews: 204,
    image: 'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    brand: 'CARTIER',
    title: 'Santos de Cartier Large Model Automatic',
    price: '£7,400.00',
    installment: 'From £160.00 per month',
    moq: '2 Pcs Min',
    rating: 4.9,
    reviews: 33,
    image: 'https://images.unsplash.com/photo-1623998021646-c4e8c05b9883?auto=format&fit=crop&w=600&q=80'
  }
];

// Helper to parse price
const parsePrice = (priceStr) => {
  return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
};

// Helper to render stars
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <>
      {'★'.repeat(fullStars)}
      {halfStar ? '½' : ''}
      {'☆'.repeat(emptyStars)}
    </>
  );
};

// Skeleton Component
const ShimmerCard = () => (
  <div className={styles['shimmer-card']}>
    <div className={`${styles['shimmer-wrapper']} ${styles['shimmer-img']}`}></div>
    <div className={`${styles['shimmer-wrapper']} ${styles['shimmer-line']}`}></div>
    <div className={`${styles['shimmer-wrapper']} ${styles['shimmer-line-long']}`}></div>
    <div className={`${styles['shimmer-wrapper']} ${styles['shimmer-price']}`}></div>
  </div>
);

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || 'Watches';
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProducts(mockWatches);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedProducts = [...products];
    if (option === 'low-high') {
      sortedProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (option === 'high-low') {
      sortedProducts.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else {
      sortedProducts.sort((a, b) => a.id - b.id);
    }
    setProducts(sortedProducts);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles['list-header']}>
        <div className={styles['product-count']}>
          {loading ? 'Searching catalogue...' : `${products.length} Products found for "${query}"`}
        </div>
        
        <div className={styles['sort-wrapper']}>
          <select 
            className={styles['sort-dropdown']} 
            value={sortOption} 
            onChange={handleSort}
          >
            <option value="newest">Sort By: New Arrivals</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className={styles['product-grid']}>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <ShimmerCard key={index} />)
          : products.map((product) => (
              <div key={product.id} className={styles['product-card']}>
                {/* Image Area */}
                <div className={styles['card-header']}>
                  <button className={styles['wishlist-btn']}>♡</button>
                  <img src={product.image} alt={product.title} className={styles['product-image']} />
                </div>

                {/* Details */}
                <div className={styles['card-body']}>
                  <div className={styles['brand-row']}>
                    <div className={styles['brand-name']}>{product.brand}</div>
                    <div className={styles['moq-badge']}>{product.moq}</div>
                  </div>
                  
                  <h3 className={styles['product-title']}>{product.title}</h3>
                  
                  {/* Rating Bar */}
                  <div className={styles['rating-wrapper']}>
                    <span className={styles['stars']}>{renderStars(product.rating)}</span>
                    <span className={styles['rating-text']}>({product.reviews})</span>
                  </div>

                  <div className={styles['price-wrapper']}>
                    <div className={styles['price']}>{product.price}</div>
                    <div className={styles['installment']}>{product.installment}</div>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default ProductList;