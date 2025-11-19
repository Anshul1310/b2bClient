import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar.js';
import Footer from '../../components/Footer/Footer.js';

const Home = () => {
  const [cartCount, setCartCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const scrollRef = useRef(null);

  // Data for Hero Slider
  const heroContents = [
    { label: 'Best Deal Online on smart watches', title: 'SMART WEARABLE.', subtitle: 'UP to 80% OFF', icon: '⌚' },
    { label: 'Top deals on smartphones', title: 'MOBILE SALE.', subtitle: 'UP to 50% OFF', icon: '📱' },
    { label: 'Latest laptops & tablets', title: 'TECH ESSENTIALS.', subtitle: 'UP to 40% OFF', icon: '💻' },
    { label: 'Premium audio collection', title: 'SOUND GEAR.', subtitle: 'UP to 60% OFF', icon: '🎧' },
    { label: 'Smart home devices', title: 'HOME AUTOMATION.', subtitle: 'UP to 45% OFF', icon: '🏠' }
  ];

  // Data for Products
  const products = [
    { name: 'Galaxy S22 Ultra', price: '32999', original: '74999', save: '32999', discount: '32%', icon: '📱' },
    { name: 'Galaxy M13', price: '10499', original: '14999', save: '4500', discount: '36%', icon: '📱' },
    { name: 'Galaxy M33', price: '16999', original: '24999', save: '8000', discount: '34%', icon: '📱' },
    { name: 'Galaxy M53', price: '31999', original: '40999', save: '9000', discount: '17%', icon: '📱' },
    { name: 'Galaxy S22', price: '47999', original: '69999', save: '18000', discount: '32%', icon: '📱' },
  ];

  // Auto Rotate Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Drag to Scroll Logic
  useEffect(() => {
    const slider = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const onMouseLeave = () => { isDown = false; slider.style.cursor = 'grab'; };
    const onMouseUp = () => { isDown = false; slider.style.cursor = 'grab'; };
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

  const hero = heroContents[currentSlide];

  return (
    <>
      <Navbar cartCount={cartCount} />
      
      {showNotification && <div className={styles.notification}>Added to cart!</div>}

      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.heroSlider}>
          <div className={styles.heroContent}>
            <div className={styles.heroLabel}>{hero.label}</div>
            <div className={styles.heroTitle}>{hero.title}</div>
            <div className={styles.heroSubtitle}>{hero.subtitle}</div>
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
          <div className={styles.heroImage}>{hero.icon}</div>
        </div>

        {/* Smartphone Section */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Grab the best deal on <span>Smartphones</span></h2>
          <a href="#" className={styles.viewAll}>View All →</a>
        </div>

        <div className={styles.productsScroll} ref={scrollRef}>
          {products.map((product, index) => (
            <div key={index} className={styles.productCard} onClick={addToCart}>
              <div className={styles.discountBadge}>{product.discount} OFF</div>
              <div className={styles.productImage}>{product.icon}</div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productPrices}>
                <span style={{fontSize: '18px', fontWeight: '700'}}>₹{product.price}</span>
                <span style={{fontSize: '14px', color: '#999', textDecoration: 'line-through', marginLeft: '10px'}}>₹{product.original}</span>
              </div>
              <div style={{fontSize: '13px', color: '#22c55e', fontWeight: '600'}}>Save - ₹{product.save}</div>
            </div>
          ))}
        </div>

        {/* Top Categories */}
        <div className={styles.sectionHeader} style={{marginTop: '50px'}}>
          <h2 className={styles.sectionTitle}>Shop From <span>Top Categories</span></h2>
        </div>
        <div className={styles.categoryGrid}>
          {['Mobile', 'Cosmetics', 'Electronics', 'Furniture', 'Watches', 'Decor', 'Accessories'].map((cat, i) => (
             <div key={i} className={styles.categoryCard} onClick={addToCart}>
               <div className={styles.categoryIcon}>{[ '📱', '💄', '💻', '🛋️', '⌚', '🌸', '🎧'][i]}</div>
               <div className={styles.categoryName}>{cat}</div>
             </div>
          ))}
        </div>

        {/* Brands Section */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Top <span>Electronics Brands</span></h2>
        </div>
        <div className={styles.brandsGrid}>
          <div className={styles.brandCard} onClick={addToCart}>
            <div style={{fontSize: '12px', fontWeight: '600', opacity: 0.8}}>IPHONE</div>
            <div style={{fontSize: '72px', marginBottom: '15px'}}>🍎</div>
            <div>UP to 80% OFF</div>
            <div className={styles.brandImage} style={{position: 'absolute', right: '20px', bottom: '20px', fontSize: '100px', opacity: 0.3}}>📱</div>
          </div>
          <div className={`${styles.brandCard} ${styles.yellow}`} onClick={addToCart}>
            <div style={{fontSize: '12px', fontWeight: '600', opacity: 0.8}}>REALME</div>
            <div style={{fontSize: '72px', marginBottom: '15px'}}>🔶</div>
            <div>UP to 80% OFF</div>
            <div className={styles.brandImage} style={{position: 'absolute', right: '20px', bottom: '20px', fontSize: '100px', opacity: 0.3}}>📱</div>
          </div>
          {/* Add more brands as needed */}
        </div>

        {/* Daily Essentials */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Daily <span>Essentials</span></h2>
        </div>
        <div className={styles.essentialsGrid}>
          {[
            {name: 'Daily Essentials', icon: '🧺'}, {name: 'Vegetables', icon: '🥬'}, 
            {name: 'Fruits', icon: '🍎'}, {name: 'Strawberry', icon: '🍓'}
          ].map((item, i) => (
            <div key={i} className={styles.essentialCard} onClick={addToCart}>
              <div className={styles.essentialImage}>{item.icon}</div>
              <div style={{fontSize: '13px', color: '#666'}}>{item.name}</div>
              <div style={{fontWeight: '700'}}>UP to 50% OFF</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;