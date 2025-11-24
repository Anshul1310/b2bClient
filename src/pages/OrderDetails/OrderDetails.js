// src/pages/OrderDetails/OrderDetails.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  // Mock Data
  const order = {
    id: '12567',
    date: 'Apr 14, 2023',
    customer: {
      name: 'Bagus Fikri',
      email: 'bagus.fikri@mail.com',
      phone: '+(22)-789-907',
      ordersCount: 2,
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624, United States'
    },
    items: [
      {
        id: 1,
        name: 'Macbook Pro 14 Inch 512GB M1 Pro',
        sku: 'Mac-1000',
        color: 'Grey',
        quantity: 1,
        price: 1659.25,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 2,
        name: 'APPLE 32" R6KD Pro Display XDR MWPF2ID/A',
        sku: 'Mac-5006',
        color: 'Silver',
        quantity: 1,
        price: 5848.77,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=150&q=80'
      }
    ],
    payment: {
      method: 'VISA •••• 3634',
      subtotal: 7508.02,
      shipping: 0.00
    }
  };

  const steps = ['Review order', 'Preparing order', 'Shipping', 'Delivered'];
  const currentStep = 0; // 0-indexed, so "Review order" is active

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles['title-group']}>
          <h1 className={styles['order-title']}>Order-{order.id}</h1>
          <span className={`${styles['status-badge']} ${styles['status-paid']}`}>Paid</span>
          <span className={`${styles['status-badge']} ${styles['status-unfulfilled']}`}>Unfulfilled</span>
        </div>
        <div className={styles['header-actions']}>
          <Link to="#" className={styles['action-link']}>Report</Link>
          <Link to="#" className={styles['action-link']}>Duplicate</Link>
          <Link to="#" className={styles['action-link']}>Share Order</Link>
        </div>
      </div>

      <div className={styles['meta-info']}>
        Order date <strong>{order.date}</strong> &middot; Order from <strong>{order.customer.name}</strong> &middot; Purchased via <strong>Online Store</strong>
      </div>

      {/* Main Layout */}
      <div className={styles['content-layout']}>
        
        {/* Left Column */}
        <div className={styles['left-column']}>
          
          {/* Stepper Card */}
          <div className={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '20px', color: '#666' }}>
              <span>Return to <strong>Fikri Store 🇺🇸 US, United State</strong></span>
              <span>Estimated arrival at <strong>1st to 3rd of February</strong></span>
            </div>
            
            <div className={styles['stepper-container']}>
              {steps.map((step, index) => (
                <div key={index} className={`${styles.step} ${index <= currentStep ? styles.active : ''}`}>
                  <div className={styles['step-circle']}>
                    {index <= currentStep ? '✓' : index + 1}
                  </div>
                  <span className={styles['step-label']}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product List Card */}
          <div className={styles.card}>
            <div className={styles['action-bar']}>
              <Link to="#" className={styles['cancel-link']}>Cancel Order</Link>
              <button className={styles['fulfill-btn']}>Create Shipping Label »</button>
            </div>

            <div className={styles['section-header']}>
              <h3 className={styles['section-title']}>Products</h3>
              <span className={`${styles['status-badge']} ${styles['status-unfulfilled']}`}>Unfulfilled</span>
            </div>

            {order.items.map((item) => (
              <div key={item.id} className={styles['product-item']}>
                <img src={item.image} alt={item.name} className={styles['product-img']} />
                <div className={styles['product-info']}>
                  <div className={styles['product-name']}>{item.name}</div>
                  <div className={styles['product-sku']}>SKU: {item.sku}</div>
                  <div className={styles['product-meta']}>{item.color} &middot; Quantity {item.quantity}</div>
                </div>
                <div className={styles['product-price']}>${item.price.toLocaleString()}</div>
              </div>
            ))}
            
            <div style={{ marginTop: '15px', fontSize: '13px', color: '#666' }}>
              📅 Your reserved item will be set <strong>until 16:45 pm</strong>
            </div>
          </div>

          {/* Payment Details Card */}
          <div className={styles.card}>
            <div className={styles['section-header']}>
              <h3 className={styles['section-title']}>Payment Details</h3>
              <span className={styles['paid-badge']}>Paid</span>
            </div>
            
            <div className={styles['payment-row']}>
              <span>Payment Method</span>
              <strong>{order.payment.method}</strong>
            </div>
            <div className={styles['payment-row']}>
              <span>Subtotal</span>
              <span>{order.items.length} items &nbsp; ${order.payment.subtotal.toLocaleString()}</span>
            </div>
            <div className={styles['payment-row']}>
              <span>Shipping Type</span>
              <span style={{textAlign: 'right'}}>The customer selected Free shipping<br/>($0.00) at checkout</span>
            </div>
            
            <div className={styles['payment-total']}>
              <span>Total</span>
              <span>${order.payment.subtotal.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Right Column (Customer Info) */}
        <div className={styles['right-column']}>
          
          {/* Notes Card */}
          <div className={styles.card}>
            <div className={styles['sidebar-title']}>
              Order Note
              <span className={styles['edit-icon']}>✎</span>
            </div>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>
              Please wrap the box with a wrapper, so the text is unreadable, this is for birthday present.
            </p>
          </div>

          {/* Customer Card */}
          <div className={styles.card}>
            <div className={styles['sidebar-section']}>
              <div className={styles['sidebar-title']}>Customer</div>
              <div className={styles['customer-profile']}>
                <div className={styles['avatar']}>BF</div>
                <div>
                  <span className={styles['customer-name']}>{order.customer.name}</span>
                  <span className={styles['order-count']}>Total: {order.customer.ordersCount} order</span>
                </div>
              </div>
            </div>

            <div className={styles['sidebar-section']}>
              <div className={styles['sidebar-title']}>
                Shipping Address
                <span className={styles['edit-icon']}>✎</span>
              </div>
              {/* Fake Map */}
              <div className={styles['map-placeholder']}>
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=400x200&sensor=false&key=YOUR_KEY_HERE" 
                  alt="Map Placeholder" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)' }}
                  // Fallback if API key not present or to simulate the screenshot look
                  onError={(e) => {e.target.src='https://via.placeholder.com/400x200/e0e0e0/aaaaaa?text=Map+View'}}
                />
              </div>
              <Link to="#" className={styles['view-map-link']}>View on Map</Link>
              <div className={styles['address-text']}>
                <strong>{order.customer.name}</strong><br/>
                {order.customer.address}
              </div>
            </div>

            <div className={styles['sidebar-section']}>
              <div className={styles['sidebar-title']}>
                Contact Information
                <span className={styles['edit-icon']}>✎</span>
              </div>
              <a href={`mailto:${order.customer.email}`} className={styles['contact-item']}>✉ {order.customer.email}</a>
              <a href={`tel:${order.customer.phone}`} className={styles['contact-item']}>📞 {order.customer.phone}</a>
            </div>
            
            <div className={styles['sidebar-section']}>
              <div className={styles['sidebar-title']}>Tags</div>
              <input 
                type="text" 
                placeholder="Add Tags" 
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e5e5e5', fontSize: '13px' }} 
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;