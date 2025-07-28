import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Newpost.module.css';

const Newpost = ({ token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('Please log in to create a post.');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:8000/posts/',
        {
          title: formData.title,
          content: formData.content,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Post created:', response.data);
      setMessage('Post created successfully!');
      setTimeout(() => navigate('/blog'), 1000);
    } catch (err) {
      console.error('Error creating post:', err.response ? err.response.data : err.message);
      setMessage('Failed to create post. Check the console for details.');
    }
  };

  if (!token) {
    return (
      <div className={styles.fullPageCenter}>
        <div className={styles.card}>
          <p className={styles.errorMessage}>You must be logged in to create a post.</p>
          <Link to="/login" className={styles.loginButton}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.fullPageCenter}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Create New Post</h1>
        {message && (
          <p className={message.includes('success') ? styles.success : styles.errorMessage}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter post title"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Enter post content"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Post
          </button>
        </form>
        <Link to="/blog" className={styles.backLink}>
          Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default Newpost;
