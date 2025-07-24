import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';

const Blog = () => {
  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>Blog Posts</h1>
      <div className={styles.blogPost}>
        <h2 className={styles.postTitle}>Welcome to Blogging!</h2>
        <p className={styles.postDate}>July 24, 2025</p>
        <p className={styles.postContent}>
          This is a sample blog post to get you started. Explore the world of blogging with Blog App,
          where you can share your stories and connect with others. Stay tuned for more exciting content!
        </p>
      </div>
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  );
};

export default Blog;