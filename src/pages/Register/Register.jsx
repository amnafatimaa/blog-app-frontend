import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import axios from 'axios';

const Register = ({ setToken }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Try a different email or username.');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Register</h1>
      <div className={styles.registerForm}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.formControl}
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
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