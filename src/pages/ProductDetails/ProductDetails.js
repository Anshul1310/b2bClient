// src/pages/ProductDetails/ProductDetails.js
import React, { useState, useMemo } from 'react';
import styles from './ProductDetails.module.css';

// --- Mock Review Data ---
const mockReviewsData = {
  summary: {
    average: 4.5,
    totalRatings: 623,
    totalReviews: 410,
    breakdown: [
      { stars: 5, count: 412, percent: 66 },
      { stars: 4, count: 102, percent: 16 },
      { stars: 3, count: 54, percent: 9 },
      { stars: 2, count: 30, percent: 5 },
      { stars: 1, count: 25, percent: 4 },
    ]
  },
  reviews: [
    {
      id: 1,
      name: "Guy Hawkins",
      initial: "G",
      verified: true,
      date: "August 13, 2023",
      rating: 5,
      text: "I recently purchased the Relaxed Fit Sweatshirt Vol. III, and it has quickly become my go-to piece for comfort and style. The fabric feels incredibly soft against the skin.",
      helpful: 12,
      images: []
    },
    {
      id: 2,
      name: "Esther Howard",
      initial: "E",
      verified: true,
      date: "August 10, 2023",
      rating: 4,
      text: "Great quality sweatshirt. The fit is exactly as described – relaxed but not sloppy. Deducted one star because the color was slightly darker than the photo, but still nice.",
      helpful: 5,
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=150&q=80"
      ]
    },
    {
      id: 3,
      name: "Robert Fox",
      initial: "R",
      verified: false,
      date: "August 5, 2023",
      rating: 5,
      text: "Excellent purchase for our wholesale needs. The stitching is top-notch and the sizing consistency across the bulk order was impressive.",
      helpful: 28,
      images: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=150&q=80"
      ]
    },
    {
      id: 4,
      name: "Brooklyn Simmons",
      initial: "B",
      verified: true,
      date: "July 22, 2023",
      rating: 3,
      text: "It's okay. Very comfortable, but after the first wash, I noticed a little bit of pilling on the sleeves.",
      helpful: 2,
      images: []
    },
    {
      id: 5,
      name: "Jerome Bell",
      initial: "J",
      verified: true,
      date: "July 15, 2023",
      rating: 5,
      text: "Fast shipping and the product quality exceeded expectations.",
      helpful: 0,
      images: []
    }
  ]
};

const renderStars = (rating) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Cream');
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const product = {
    title: "New Relaxed Fit Sweatshirt Vol. III",
    basePrice: 899.00,
    rating: 4.5,
    reviews: 623,
    sold: 1919,
    description: "Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem.",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd0a77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black", "Cream", "Green", "Blue", "Red"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    store: { name: "Stylish", rating: 4.8, location: "New York, USA" }
  };

  const priceTiers = [
    { min: 1, max: 5, price: 899.00 },
    { min: 6, max: 10, price: 849.00 },
    { min: 11, max: Infinity, price: 799.00 },
  ];

  const currentPrice = useMemo(() => {
    const tier = priceTiers.find(t => quantity >= t.min && quantity <= t.max);
    return tier ? tier.price : product.basePrice;
  }, [quantity, product.basePrice]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const displayedReviews = showAllReviews 
    ? mockReviewsData.reviews 
    : mockReviewsData.reviews.slice(0, 3);

  return (
    <div className={styles.container}>
      {/* Top Product Section */}
      <div className={styles.breadcrumbs}>
        New Arrival <span>&gt;</span> Man <span>&gt;</span> <span className={styles['active-crumb']}>{product.title}</span>
      </div>

      <div className={styles['product-layout']}>
        <div className={styles['left-column']}>
          <div className={styles['image-gallery']}>
            <div className={styles['main-image-container']}>
              <button className={`${styles['nav-arrow']} ${styles['nav-prev']}`} onClick={() => setSelectedImage((prev) => prev > 0 ? prev - 1 : 3)}>‹</button>
              <img src={product.images[selectedImage]} alt="Product Main" className={styles['main-image']} />
              <button className={`${styles['nav-arrow']} ${styles['nav-next']}`} onClick={() => setSelectedImage((prev) => prev < 3 ? prev + 1 : 0)}>›</button>
            </div>
            <div className={styles.thumbnails}>
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles['thumb-box']} ${selectedImage === idx ? styles.active : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles['store-card']}>
            <div className={styles['store-header']}>
              <div className={styles['store-info']}>
                <span className={styles['store-icon']}>🏪</span>
                <div>
                  <div className={styles['store-name']}>{product.store.name} <span className={styles.verified}>✔</span></div>
                  <div className={styles['store-rating']}>★ {product.store.rating} <span className={styles['review-count']}>(17.5k reviews)</span></div>
                </div>
              </div>
              <button className={styles['visit-btn']}>VISIT STORE</button>
            </div>
            <div className={styles['store-location']}>📍 {product.store.location}</div>
          </div>
        </div>

        <div className={styles['right-column']}>
          <span className={styles.badge}>New Arrival</span>
          <h1 className={styles['product-title']}>{product.title}</h1>
          <div className={styles['stats-row']}>
            <span className={styles.stars}>★★★★☆ (4.5)</span>
            <span className={styles['stat-divider']}>|</span>
            <span className={styles.reviews}>{product.reviews} reviews</span>
            <span className={styles['stat-divider']}>|</span>
            <span className={styles['sold-count']}>{product.sold} Sold</span>
          </div>
          <div className={styles['price-section']}>
            <span className={styles['current-price']}>$ {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            {quantity >= 6 && <span className={styles['price-note']}>Bulk Discount Applied!</span>}
          </div>
          <div className={styles['selector-group']}>
            <span className={styles['selector-label']}>Select Color</span>
            <div className={styles['options-row']}>
              {product.colors.map(color => (
                <button key={color} className={`${styles['option-btn']} ${selectedColor === color ? styles.active : ''}`} onClick={() => setSelectedColor(color)}>{color}</button>
              ))}
            </div>
          </div>
          <div className={styles['selector-group']}>
            <span className={styles['selector-label']}>Select Size</span>
            <div className={styles['options-row']}>
              {product.sizes.map(size => (
                <button key={size} className={`${styles['option-btn']} ${selectedSize === size ? styles.active : ''}`} onClick={() => setSelectedSize(size)}>{size}</button>
              ))}
            </div>
          </div>
          <div className={styles['bulk-pricing-box']}>
            <span className={styles['bulk-title']}>Wholesale Pricing</span>
            <div className={styles['tier-list']}>
              {priceTiers.map((tier, i) => {
                const isActive = quantity >= tier.min && quantity <= tier.max;
                return (
                  <div key={i} className={`${styles['tier-item']} ${isActive ? styles['active-tier'] : ''}`}>
                    <span>{tier.min}-{tier.max === Infinity ? '+' : tier.max} pcs</span>
                    <span>${tier.price}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles['quantity-wrapper']}>
              <div className={styles['qty-control']}>
                <button className={styles['qty-btn']} onClick={() => handleQuantityChange(-1)}>−</button>
                <input type="text" readOnly value={quantity} className={styles['qty-input']} />
                <button className={styles['qty-btn']} onClick={() => handleQuantityChange(1)}>+</button>
              </div>
              <div className={styles['total-price']}>Total: ${(currentPrice * quantity).toLocaleString()}</div>
            </div>
          </div>
          <div className={styles.description}><p>{product.description}</p></div>
          <ul className={styles['details-list']}>
            <li className={styles['detail-item']}>📍 Sent from <strong>New York, USA</strong></li>
            <li className={styles['detail-item']}>🚚 Estimated Shipping <strong>$3.99</strong></li>
          </ul>
          
          {/* UPDATED Action Buttons */}
          <div className={styles['action-buttons']}>
            <button className={styles['add-cart-btn']}>Add to Cart</button>
          </div>
        </div>
      </div>

      {/* --- Review Section --- */}
      <div className={styles['reviews-container']}>
        <h2 className={styles['reviews-header']}>Product Ratings & Reviews</h2>
        <div className={styles['summary-section']}>
          <div className={styles['rating-overview']}>
            <div className={styles['big-rating']}>{mockReviewsData.summary.average}</div>
            <div className={styles.stars}>★★★★☆</div>
            <div className={styles['total-stats']}>{mockReviewsData.summary.totalRatings} Ratings &<br />{mockReviewsData.summary.totalReviews} Reviews</div>
          </div>
          <div className={styles['rating-bars']}>
            {mockReviewsData.summary.breakdown.map((item) => (
              <div key={item.stars} className={styles['bar-row']}>
                <span className={styles['star-label']}>{item.stars} <span style={{color: '#f59e0b'}}>★</span></span>
                <div className={styles['progress-bg']}>
                  <div className={styles['progress-fill']} style={{ width: `${item.percent}%` }}></div>
                </div>
                <span className={styles['bar-count']}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review List with Images */}
        <div className={styles['review-list']}>
          {displayedReviews.map((review) => (
            <div key={review.id} className={styles['review-card']}>
              <div className={styles['review-meta-header']}>
                <div className={styles['reviewer-info']}>
                  {/* Initials Avatar */}
                  <div className={styles['reviewer-avatar']}>{review.initial}</div>
                  <span className={styles['reviewer-name']}>{review.name}</span>
                  {review.verified && <span className={styles['verified-badge']}>Verified Buyer</span>}
                </div>
                <span className={styles['review-date']}>{review.date}</span>
              </div>
              <div className={styles['review-stars']}>{renderStars(review.rating)}</div>
              <p className={styles['review-text']}>{review.text}</p>

              {review.images && review.images.length > 0 && (
                <div className={styles['review-images']}>
                  {review.images.map((img, idx) => (
                    <img key={idx} src={img} alt="Review attachment" className={styles['review-img']} />
                  ))}
                </div>
              )}

              <div className={styles['review-helpful']}>
                <span className={styles['helpful-icon']}>👍</span> Helpful ({review.helpful})
              </div>
            </div>
          ))}
        </div>

        {mockReviewsData.reviews.length > 3 && (
          <div className={styles['show-more-container']}>
            <button 
              className={styles['show-more-btn']} 
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? "Show Less" : "Show more reviews"} {showAllReviews ? "↑" : "↓"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;