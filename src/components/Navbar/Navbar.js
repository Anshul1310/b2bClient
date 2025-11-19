import React from 'react';
import styles from './Navbar.module.css';

const Navbar = ({ cartCount }) => {
  const categories = [
    "Groceries", "Premium Fruits", "Home & Kitchen", "Fashion", 
    "Electronics", "Beauty", "Home Improvement", "Sports, Toys & Luggage"
  ];

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
          <div className={styles.logo}>
            <span>☰</span>
            <span>MegaMart</span>
          </div>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search essentials, groceries and more..." />
          </div>
          <div className={styles.headerActions}>
            <button className={styles.headerBtn}>
              <span>👤</span>
              <span>Sign Up/Sign In</span>
            </button>
            <button className={styles.headerBtn}>
              <span>🛒</span>
              <span>Cart</span>
              <span className={styles.cartBadge}>{cartCount}</span>
            </button>
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