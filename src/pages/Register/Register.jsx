import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import axios from 'axios';

const Register = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: '', // Changed from 'name' to 'username'
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Sending registration data:', formData); // Debug log
    try {
      const response = await axios.post('http://localhost:8000/users/register', {
        username: formData.username, // Ensure 'username' is sent
        email: formData.email,
        password: formData.password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      setToken(token);
      console.log('Registration successful, token:', token); // Debug log
    } catch (err) {
      console.error('Registration failed:', err.response ? err.response.data : err.message);
      if (err.response?.status === 422) {
        setError('Validation failed: ' + (err.response.data.detail?.[0]?.msg || 'Check your input.'));
      } else {
        setError('Registration failed. Try again later.');
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Register</h1>
      <div className={styles.registerForm}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Username
            </label>
            <input
              type="text"
              id="username" // Changed from 'name' to 'username'
              name="username" // Changed from 'name' to 'username'
              className={styles.formControl}
              value={formData.username}
              onChange={handleChange}
              placeholder="Your Username"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.formControl}
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
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
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.formControl}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
          <p className={styles.loginLink}>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>
              Login here
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

export default Register;