import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.css';
import profilepic from '../../assets/profilepic.webp';
import API_BASE_URL from '../../config.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = ({ token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('Please log in to view your profile.');
      navigate('/login');
      return;
    }
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('User response:', response.data);
        setUser(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error(
          'Error fetching user:',
          err.response ? err.response.data : err.message
        );
        setError('Failed to load profile. Check the console for details.');
      })
      .finally(() => setLoading(false));
  }, [token, navigate]);

  if (loading) return <p className={styles.loading}>Loading profile...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!user) return <p className={styles.loading}>No user data available.</p>;

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileContainer}>
        <div className={styles.imageWrapper}>
          <div className={styles.profileImage}>
            <img
              src={profilepic}
              alt="User Profile"
              className={styles.profileImg}
            />
          </div>
        </div>
        <h1 className={styles.profileTitle}>{user.username}</h1>
        <p className={styles.profileEmail}>{user.email}</p>
        <Link to="/blog" className={styles.backLink}>
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default Profile;