import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>About Blog App</h1>
      <p className={styles.aboutDescription}>
        Welcome to Blog App, a platform designed to empower you to share your thoughts, ideas, and stories with the world. 
        Launched on July 24, 2025, this app offers a seamless experience for creating posts, adding comments, and engaging with a vibrant community of writers and readers.
      </p>
      <div className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.sectionContent}>
          Our mission is to provide a simple yet powerful blogging platform built with a FastAPI backend and a React frontend. 
          We prioritize performance, usability, and accessibility, ensuring that whether you're a casual blogger or a seasoned writer, you have the tools to express yourself.
        </p>
      </div>
      <div className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>Get Involved</h2>
        <p className={styles.sectionContent}>
          Join our growing community today! Start writing, connect with others, and explore a world of creativity. 
          Check out our <Link to="/blog" className={styles.internalLink}>blog section</Link> for inspiration.
        </p>
      </div>
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  );
};

export default About;