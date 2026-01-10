import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
// Footer is in MainLayout

const Home = () => {
  const [cartCount, setCartCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const scrollRef = useRef(null);

  // Data for Hero Slider
  const heroContents = [
    'https://images.unsplash.com/photo-1556656793-02774a8316ea?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
  ];

  // Data for Products
  const products = [
    { name: 'Samsung Galaxy S22 Ultra', price: '32,999', original: '74,999', save: '42,000', discount: '56%', icon: '📱' },
    { name: 'Apple iPhone 14 Pro', price: '99,999', original: '1,29,999', save: '30,000', discount: '23%', icon: '📱' },
    { name: 'Xiaomi Redmi Note 12', price: '12,499', original: '17,999', save: '5,500', discount: '30%', icon: '📱' },
    { name: 'OnePlus 11 5G', price: '54,999', original: '69,999', save: '15,000', discount: '21%', icon: '📱' },
    { name: 'Google Pixel 7a', price: '37,999', original: '43,999', save: '6,000', discount: '14%', icon: '📱' },
    { name: 'Sony WH-1000XM5', price: '26,990', original: '34,990', save: '8,000', discount: '22%', icon: '🎧' },
  ];

  // Auto Rotate Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroContents.length]);

  // Drag to Scroll Logic
  useEffect(() => {
    const slider = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      if (slider) {
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      }
    };

    const onMouseLeave = () => { isDown = false; if (slider) slider.style.cursor = 'grab'; };
    const onMouseUp = () => { isDown = false; if (slider) slider.style.cursor = 'grab'; };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    if (slider) {
      slider.addEventListener('mousedown', onMouseDown);
      slider.addEventListener('mouseleave', onMouseLeave);
      slider.addEventListener('mouseup', onMouseUp);
      slider.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('mousedown', onMouseDown);
        slider.removeEventListener('mouseleave', onMouseLeave);
        slider.removeEventListener('mouseup', onMouseUp);
        slider.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <>
      {showNotification && <div className={styles.notification}>Item added to cart!</div>}

      <div className={styles.container}>
        {/* Hero Slider */}
        <div className={styles.heroSlider}>
          <img 
            src={heroContents[currentSlide]} 
            alt="Special Offer" 
            className={styles.heroImg}
          />
          <div className={styles.sliderDots}>
            {heroContents.map((_, idx) => (
              <div 
                key={idx} 
                className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Shop by <span>Category</span></h2>
          <a href="#" className={styles.viewAll}>View All →</a>
        </div>
        <div className={styles.categoryGrid}>
          {[
            {name: 'Mobile', icon: '📱'},
            {name: 'Cosmetics', icon: '💄'},
            {name: 'Electronics', icon: '💻'},
            {name: 'Furniture', icon: '🛋️'},
            {name: 'Watches', icon: '⌚'},
            {name: 'Decor', icon: '🌸'},
            {name: 'Audio', icon: '🎧'},
            {name: 'Gaming', icon: '🎮'}
          ].map((item, i) => (
             <div key={i} className={styles.categoryCard} onClick={addToCart}>
               <div className={styles.categoryIcon}>{item.icon}</div>
               <div className={styles.categoryName}>{item.name}</div>
             </div>
          ))}
        </div>

        {/* Smartphone Section (Sliding) */}
        <div className={styles.sectionHeader} style={{marginTop: '60px'}}>
          <h2 className={styles.sectionTitle}>Top Deals on <span>Smartphones</span></h2>
          <a href="#" className={styles.viewAll}>View All →</a>
        </div>
        <div className={styles.productsScroll} ref={scrollRef}>
          {products.map((product, index) => (
            <div key={index} className={styles.productCard} onClick={addToCart}>
              <div className={styles.discountBadge}>{product.discount} OFF</div>
              <div className={styles.productImage}>{product.icon}</div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productPrices}>
                <span>₹{product.price}</span>
                <span>₹{product.original}</span>
              </div>
              <div className={styles.saveInfo}>Save ₹{product.save}</div>
            </div>
          ))}
        </div>

        {/* NEW SECTION: Best Selling Products (Grid/Rows) */}
        <div className={styles.sectionHeader} style={{marginTop: '60px'}}>
          <h2 className={styles.sectionTitle}>Best Selling <span>Products</span></h2>
          <a href="#" className={styles.viewAll}>View All →</a>
        </div>
        <div className={styles.productsGrid}>
          {/* Duplicating products to ensure enough items for rows */}
          {[...products, ...products].slice(0, 10).map((product, index) => (
            <div key={index} className={styles.productCard} onClick={addToCart}>
              <div className={styles.discountBadge}>{product.discount} OFF</div>
              <div className={styles.productImage}>{product.icon}</div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productPrices}>
                <span>₹{product.price}</span>
                <span>₹{product.original}</span>
              </div>
              <div className={styles.saveInfo}>Save ₹{product.save}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Home;