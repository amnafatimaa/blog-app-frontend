import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import styles from './Login.module.css';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Both username and password are required.');
      return;
    }
    const formDataToSend = new URLSearchParams();
    formDataToSend.append('username', formData.username.trim());
    formDataToSend.append('password', formData.password.trim());
    console.log('Form data to send:', formDataToSend.toString()); // Debug log
    try {
      const response = await axios.post('http://localhost:8000/users/login', formDataToSend, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      setToken(token);
      console.log('Login successful, token:', token); // Debug log
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err.message);
      if (err.response?.status === 422) {
        setError('Validation failed: ' + (err.response.data.detail?.[0]?.msg || 'Check your credentials.'));
      } else {
        setError('Login failed. Try again later.');
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <div className={styles.loginForm}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.formControl}
              value={formData.username}
              onChange={handleChange}
              placeholder="Your Username"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.formControl}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
          <p className={styles.registerLink}>
            Don’t have an account?{' '}
            <Link to="/register" className={styles.link}>
              Register here
            </Link>
          </p>
          <p className={styles.forgotPassword}>
            <Link to="/forgot-password" className={styles.link}>
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  );
};

export default Login;