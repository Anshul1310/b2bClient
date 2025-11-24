// src/pages/OrderList/OrderList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './OrderList.module.css';

const mockOrders = [
  {
    id: '12567',
    date: 'Apr 14, 2023',
    customer: 'Bagus Fikri',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Unfulfilled',
    total: '$7,508.02',
    items: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=100&q=80'
    ]
  },
  {
    id: '12566',
    date: 'Apr 12, 2023',
    customer: 'Sarah Jenkins',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Shipped',
    total: '$1,299.00',
    items: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=100&q=80'
    ]
  },
  {
    id: '12565',
    date: 'Apr 10, 2023',
    customer: 'Michael Chen',
    paymentStatus: 'Pending',
    fulfillmentStatus: 'Unfulfilled',
    total: '$3,450.50',
    items: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80'
    ]
  },
  {
    id: '12564',
    date: 'Apr 08, 2023',
    customer: 'Emma Wilson',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Delivered',
    total: '$850.00',
    items: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=100&q=80'
    ]
  },
  {
    id: '12563',
    date: 'Apr 05, 2023',
    customer: 'James Rodriguez',
    paymentStatus: 'Cancelled',
    fulfillmentStatus: 'Unfulfilled',
    total: '$220.00',
    items: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80'
    ]
  }
];

const OrderList = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Simple filtering logic (for demo purposes)
  const filteredOrders = activeTab === 'All' 
    ? mockOrders 
    : activeTab === 'Completed' 
      ? mockOrders.filter(o => o.fulfillmentStatus === 'Delivered')
      : activeTab === 'Cancelled'
        ? mockOrders.filter(o => o.paymentStatus === 'Cancelled')
        : mockOrders.filter(o => o.fulfillmentStatus !== 'Delivered' && o.paymentStatus !== 'Cancelled');

  const getStatusClass = (status) => {
    switch(status) {
      case 'Paid': return styles['status-paid'];
      case 'Pending': return styles['status-pending'];
      case 'Cancelled': return styles['status-cancelled'];
      case 'Unfulfilled': return styles['status-unfulfilled'];
      case 'Shipped': return styles['status-shipped'];
      case 'Delivered': return styles['status-delivered'];
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles['page-header']}>
        <h1 className={styles['page-title']}>Order History</h1>
        <div className={styles['search-wrapper']}>
          <span className={styles['search-icon']}>🔍</span>
          <input type="text" placeholder="Search by Order ID..." className={styles['search-input']} />
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {['All', 'Ongoing', 'Completed', 'Cancelled'].map((tab) => (
          <button 
            key={tab} 
            className={`${styles.tab} ${activeTab === tab ? styles['active-tab'] : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className={styles['table-container']}>
        <table className={styles['order-table']}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Fulfillment</th>
              <th>Total</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className={styles['order-id']}>#{order.id}</td>
                <td className={styles['order-date']}>{order.date}</td>
                <td>
                  <span className={`${styles.status} ${getStatusClass(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${getStatusClass(order.fulfillmentStatus)}`}>
                    {order.fulfillmentStatus}
                  </span>
                </td>
                <td className={styles.price}>{order.total}</td>
                <td>
                  <div className={styles['product-preview']}>
                    {order.items.slice(0, 2).map((img, i) => (
                      <img key={i} src={img} alt="item" className={styles['preview-img']} />
                    ))}
                    {order.items.length > 2 && (
                      <div className={styles['more-items']}>+{order.items.length - 2}</div>
                    )}
                  </div>
                </td>
                <td>
                  <Link to="/order" className={styles['view-btn']}>View Order</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className={styles['mobile-list']}>
        {filteredOrders.map((order) => (
          <div key={order.id} className={styles['order-card']}>
            <div className={styles['card-header']}>
              <div>
                <div className={styles['order-id']}>#{order.id}</div>
                <div className={styles['order-date']}>{order.date}</div>
              </div>
              <Link to="/order" className={styles['view-btn']}>View</Link>
            </div>
            
            <div className={styles['product-preview']}>
              {order.items.slice(0, 3).map((img, i) => (
                <img key={i} src={img} alt="item" className={styles['preview-img']} />
              ))}
            </div>

            <div className={styles['card-row']}>
              <span className={styles['card-label']}>Payment</span>
              <span className={`${styles.status} ${getStatusClass(order.paymentStatus)}`}>
                {order.paymentStatus}
              </span>
            </div>

            <div className={styles['card-row']}>
              <span className={styles['card-label']}>Status</span>
              <span className={`${styles.status} ${getStatusClass(order.fulfillmentStatus)}`}>
                {order.fulfillmentStatus}
              </span>
            </div>

            <div className={styles['card-row']}>
              <span className={styles['card-label']}>Total</span>
              <span className={styles['card-value']}>{order.total}</span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredOrders.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No orders found in this category.
        </div>
      )}
    </div>
  );
};

export default OrderList;