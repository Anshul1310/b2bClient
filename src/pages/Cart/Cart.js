// src/pages/Cart/Cart.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
  // Mock Data reflecting the theme of the screenshot
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'LV500S Smart Hybrid Ultrasonic Humidifier',
      price: 370.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=200&q=80' // Random tech image
    },
    {
      id: 2,
      name: 'Dr. Heater DR-PS11024 10000W Portable Fan',
      price: 370.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1565793979206-10951493332d?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3,
      name: 'Airthereal MA5000 Ozone Generator',
      price: 370.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1585237674576-7977a7738266?auto=format&fit=crop&w=200&q=80'
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const vat = 68.00; // Fixed for demo
  const total = subtotal + vat;

  return (
    <div className={styles.container}>
      <h1 className={styles['page-title']}>Your Cart</h1>
      
      <div className={styles['cart-layout']}>
        {/* Left Side: Items */}
        <div className={styles['cart-items-section']}>
          <div className={styles['cart-header']}>
            <span>Product</span>
            <span>Total</span>
          </div>

          {cartItems.length === 0 ? (
            <p style={{padding: '20px', textAlign: 'center'}}>Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={styles['cart-item']}>
                <img src={item.image} alt={item.name} className={styles['item-image']} />
                
                <div className={styles['item-details']}>
                  <div className={styles['item-name']}>{item.name}</div>
                  <div className={styles['item-meta']}>Electronics</div>
                </div>

                <div className={styles['item-controls']}>
                  <div className={styles['quantity-control']}>
                    <button className={styles['qty-btn']} onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className={styles['qty-value']}>{item.quantity}</span>
                    <button className={styles['qty-btn']} onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <div className={styles['item-price']}>${(item.price * item.quantity).toFixed(2)}</div>
                  <button className={styles['remove-btn']} onClick={() => removeItem(item.id)}>🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Summary */}
        <div className={styles['cart-summary']}>
          <h3 className={styles['summary-title']}>Order Summary</h3>
          
          <div className={styles['summary-row']}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles['summary-row']}>
            <span>V.A.T</span>
            <span>${vat.toFixed(2)}</span>
          </div>

          <div className={styles['coupon-section']}>
            <label style={{fontSize: '14px', fontWeight: '600'}}>Add a coupon</label>
            <div className={styles['coupon-input-group']}>
              <input type="text" placeholder="Enter your code" className={styles['coupon-input']} />
              <button className={styles['apply-btn']}>Apply</button>
            </div>
          </div>

          <div className={styles['summary-total']}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className={styles['checkout-btn']}>Proceed to checkout</button>
          
          <Link to="/" className={styles['back-link']}>
            ← Go back to shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;