import React from 'react';
import styles from './Home.module.css';
import HeroSlider from '../HeroSlider/HeroSlider';
import ProductCard from '../ProductCard/ProductCard';
import CategoryCard from '../CategoryCard/CategoryCard';
import BrandCard from '../BrandCard/BrandCard';
import EssentialCard from '../EssentialCard/EssentialCard';

// --- Mock Data ---
const smartphoneProducts = [
  { name: 'Galaxy S22 Ultra', currentPrice: '₹32999', originalPrice: '₹74999', discount: '32% OFF', savings: '₹32999' },
  { name: 'Galaxy M13 (4GB | 64 GB)', currentPrice: '₹10499', originalPrice: '₹14999', discount: '36% OFF', savings: '₹4500' },
  { name: 'Galaxy M33 (4GB | 64 GB)', currentPrice: '₹16999', originalPrice: '₹24999', discount: '34% OFF', savings: '₹8000' },
  { name: 'Galaxy M53 (4GB | 64 GB)', currentPrice: '₹31999', originalPrice: '₹40999', discount: '17% OFF', savings: '₹9000' },
  { name: 'Galaxy S22', currentPrice: '₹47999', originalPrice: '₹69999', discount: '32% OFF', savings: '₹18000' },
  { name: 'Galaxy S23 Ultra', currentPrice: '₹67999', originalPrice: '₹89999', discount: '26% OFF', savings: '₹10000' },
];

const topCategories = [
  { icon: '📱', name: 'Mobile' },
  { icon: '💄', name: 'Cosmetics' },
  { icon: '💻', name: 'Electronics' },
  { icon: '🛋️', name: 'Furniture' },
  { icon: '⌚', name: 'Watches' },
  { icon: '🌸', name: 'Decor' },
  { icon: '🎧', name: 'Accessories' },
];

const topBrands = [
  { label: 'IPHONE', logo: '🍎', text: 'UP to 80% OFF', color: 'dark' },
  { label: 'REALME', logo: '🔶', text: 'UP to 80% OFF', color: 'yellow' },
  { label: 'XIAOMI', logo: 'MI', text: 'UP to 80% OFF', color: 'orange' },
  { label: 'POCO', logo: '📱', text: 'UP to 80% OFF', color: 'blue' },
];

const dailyEssentials = [
  { image: '🧺', name: 'Daily Essentials', offer: 'UP to 50% OFF' },
  { image: '🥬', name: 'Vegetables', offer: 'UP to 50% OFF' },
  { image: '🍎', name: 'Fruits', offer: 'UP to 50% OFF' },
  { image: '🍓', name: 'Strawberry', offer: 'UP to 50% OFF' },
  { image: '🥭', name: 'Mango', offer: 'UP to 50% OFF' },
  { image: '🍒', name: 'Cherry', offer: 'UP to 50% OFF' },
];

// --- Local Helper Component ---
const SectionHeader = ({ title, highlight, viewAllLink, style }) => (
  <div className={styles['section-header']} style={style}>
    <h2 className={styles['section-title']}>
      {title} <span>{highlight}</span>
    </h2>
    <a href={viewAllLink} className={styles['view-all']}>
      View All →
    </a>
  </div>
);

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Smartphones Section */}
      <SectionHeader title="Grab the best deal on" highlight="Smartphones" viewAllLink="#" />
      <div className={styles['products-scroll']}>
        {smartphoneProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {/* Top Categories Section */}
      <SectionHeader title="Shop From" highlight="Top Categories" viewAllLink="#" style={{ marginTop: '50px' }} />
      <div className={styles['category-grid']}>
        {topCategories.map((category, index) => (
          <CategoryCard key={index} icon={category.icon} name={category.name} />
        ))}
      </div>

      {/* Top Brands Section */}
      <SectionHeader title="Top" highlight="Electronics Brands" viewAllLink="#" />
      <div className={styles['brands-grid']}>
        {topBrands.map((brand, index) => (
          <BrandCard key={index} {...brand} />
        ))}
      </div>
      
      {/* Daily Essentials Section */}
      <SectionHeader title="Daily" highlight="Essentials" viewAllLink="#" />
      <div className={styles['essentials-grid']}>
        {dailyEssentials.map((essential, index) => (
          <EssentialCard key={index} {...essential} />
        ))}
      </div>
    </div>
  );
};

export default Home;