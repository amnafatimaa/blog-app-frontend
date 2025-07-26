import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '/src/assets/logo-header.png';
import profilePic from '/src/assets/profilepic.webp'; // Hardcoded profile image
import axios from 'axios';

const Header = ({ setToken }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
      } catch (err) {
        console.error('Error fetching user:', err.response ? err.response.data : err.message);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
    setIsDropdownOpen(false); // Close dropdown on logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Blog App Logo" className={styles.logoImage} />
          <span className={styles.logoText}>BLOG-APP</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li><Link to="/" className={styles.navLink}>Home</Link></li>
            <li><Link to="/blog" className={styles.navLink}>Blog</Link></li>
            <li><Link to="/about" className={styles.navLink}>About</Link></li>
            <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
          </ul>
        </nav>

        <div className={styles.actions}>
          {token ? (
            <div className={styles.profileContainer}>
  {loading ? (
    <span className={styles.greeting}>Loading...</span>
  ) : error ? (
    <span className={styles.greetingError}>{error}</span>
  ) : (
    <span className={styles.greeting}>Hi, {username}</span>
  )}
  <img
    src={profilePic}
    alt="User Profile"
    className={styles.profileImage}
    onClick={toggleDropdown}
  />
  {isDropdownOpen && (
    <div className={styles.dropdown}>
      <Link
        to="/profile"
        className={styles.dropdownItem}
        onClick={() => setIsDropdownOpen(false)}
      >
        Profile
      </Link>
      <Link
        to="/newpost"
        className={styles.dropdownItem}
        onClick={() => setIsDropdownOpen(false)}
      >
        New Post
      </Link>
      <button
        onClick={handleLogout}
        className={styles.dropdownItem}
        aria-label="Log out"
      >
        Logout
      </button>
    </div>
  )}
</div>

          ) : (
            <>
              <Link to="/login" className={styles.loginBtn} aria-label="Log in">
                Login
              </Link>
              <Link to="/register" className={styles.registerBtn} aria-label="Register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;