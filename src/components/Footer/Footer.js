import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>MegaMart</h3>
          <div className={styles.contactInfo}>
            <p><strong>Contact Us</strong></p>
            <p>📞 Whats App: +1 202-918-2132</p>
            <p>📞 Call Us: +1 202-918-2132</p>
          </div>
          <div className={styles.appButtons}>
            <a href="#" className={styles.appBtn}>📱 App Store</a>
            <a href="#" className={styles.appBtn}>▶ Google Play</a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Most Popular Categories</h3>
          <ul>
            <li><a href="#">Staples</a></li>
            <li><a href="#">Beverages</a></li>
            <li><a href="#">Personal Care</a></li>
            <li><a href="#">Home Care</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Customer Services</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 All rights reserved. Reliance Retail Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;