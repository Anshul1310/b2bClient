// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import ProductList from './pages/ProductList/ProductList';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import OrderList from './pages/OrderList/OrderList'; // Import New Page

const MainLayout = ({ cartCount }) => {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<MainLayout cartCount={cartCount} />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} /> {/* New Route */}
            <Route path="/order" element={<OrderDetails />} />
          </Route>

          {/* Standalone Routes */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;