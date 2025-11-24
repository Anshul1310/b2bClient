// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ cartCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    "Groceries", "Premium Fruits", "Home & Kitchen", "Fashion", 
    "Electronics", "Beauty", "Home Improvement", "Sports, Toys & Luggage"
  ];

  // Handle Enter Key Press
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim().length > 0) {
      // Navigate to /shop with query param
      navigate(`/shop?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.topBarItem}><span>📍 Deliver to 423651</span></div>
          <div className={styles.topBarItem}><span>📦 Track your order</span></div>
          <div className={styles.topBarItem}><span>🎁 All Offers</span></div>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" style={{textDecoration: 'none'}}>
            <div className={styles.logo}>
              <span>☰</span>
              <span>MegaMart</span>
            </div>
          </Link>
          
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Search essentials, groceries and more..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          
          <div className={styles.headerActions}>
            <Link to="/login" className={styles.headerBtn} style={{textDecoration: 'none'}}>
              <span>👤</span>
              <span>Sign Up/Sign In</span>
            </Link>
            
            <Link to="/cart" className={styles.headerBtn} style={{textDecoration: 'none'}}>
              <span>🛒</span>
              <span>Cart</span>
              <span className={styles.cartBadge}>{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>

      <nav className={styles.nav}>
        <div className={styles.navContent}>
          {categories.map((cat, index) => (
            <button 
              key={index} 
              className={`${styles.navItem} ${index === 0 ? styles.active : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;