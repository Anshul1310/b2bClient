// src/pages/Login/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'UAE' },
];

const Login = () => {
  const [step, setStep] = useState('PHONE'); // 'PHONE' or 'OTP'
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const navigate = useNavigate();

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 7) {
      setStep('OTP');
      setTimer(30);
      setIsTimerActive(true);
    } else {
      alert("Please enter a valid mobile number.");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      console.log("Logged in successfully");
      navigate('/');
    } else {
      alert("Please enter a valid 4-digit OTP.");
    }
  };

  const handleResend = () => {
    setTimer(30);
    setIsTimerActive(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles['login-card']}>
        {/* Left Side: 3D Store Illustration */}
        <div className={styles['image-section']}>
          <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-grocery-store-2872324-2386794.png" 
            alt="Supermarket Illustration" 
            className={styles['illustration-img']} 
          />
        </div>

        {/* Right Side: Login Form */}
        <div className={styles['form-section']}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome Back!</h1>
            <p className={styles.subtitle}>
              Sign In to Continue.<br/>
              Don't have an account? <span className={styles.link}>Create an account</span>
              <br/><span style={{fontSize: '12px', opacity: 0.7}}>It takes less than a minute.</span>
            </p>
          </div>

          {step === 'PHONE' ? (
            <form onSubmit={handlePhoneSubmit}>
              <div className={styles['form-group']}>
                <label className={styles.label}>Phone Number</label>
                <div className={styles['input-wrapper']}>
                  {/* Country Selector */}
                  <div className={styles['country-select']}>
                    <span className={styles['selected-code']}>{countryCode} ▼</span>
                    <select 
                      className={styles['hidden-select']}
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>{c.country} ({c.code})</option>
                      ))}
                    </select>
                  </div>
                  
                  <input 
                    type="tel" 
                    className={styles.input} 
                    placeholder="Enter mobile number" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    autoFocus
                  />
                </div>
              </div>
              <button type="submit" className={styles['submit-btn']}>
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className={styles['form-group']}>
                <label className={styles.label}>Verification Code</label>
                <div className={styles['input-wrapper']}>
                  <input 
                    type="text" 
                    className={`${styles.input} ${styles['otp-input']}`} 
                    placeholder="• • • •" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    autoFocus
                  />
                </div>
              </div>

              <button type="submit" className={styles['submit-btn']}>
                Verify & Login
              </button>

              <div className={styles['helper-text']}>
                <span className={styles.link} onClick={() => setStep('PHONE')}>Change Number</span>
                <button 
                  type="button" 
                  className={styles['resend-btn']} 
                  onClick={handleResend}
                  disabled={isTimerActive}
                >
                  {isTimerActive ? `Resend in ${timer}s` : 'Resend OTP'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;