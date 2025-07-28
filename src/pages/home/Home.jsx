import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import axios from 'axios';

const Home = ({ token }) => { // Added token prop
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/posts')
      .then(response => {
        console.log('Posts response:', response.data);
        setPosts(response.data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching posts:', error.response ? error.response.data : error.message);
        setError('Failed to load posts. Check the console for details.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.loading}>Loading posts...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Blog-App</h1>
          <p className={styles.heroSubtitle}>A place to share your knowledge and ideas</p>
          <div className={styles.heroButtons}>
            <Link to="/blog" className={styles.primaryButton}>Explore Articles</Link>
            <Link to="/register" className={styles.secondaryButton}>Join Our Community</Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className={styles.featuredPosts}>
        <h2 className={styles.sectionTitle}>Featured Articles</h2>
        <div className={styles.postsGrid}>
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postMeta}>
                  <span className={styles.postCategory}>General</span>
                  <span className={styles.postDate}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className={styles.postAuthor}>By {post.author?.username || 'Unknown'}</p>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>
                  {post.content.length > 100
                    ? post.content.slice(0, 100) + '...'
                    : post.content}
                </p>
                <div className={styles.postFooter}>
                  <Link
                    to={token ? `/blog/${post.id}/` : '/register'}
                    className={styles.readMore}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className={styles.noPosts}>No posts available yet.</p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to start writing?</h2>
        <p className={styles.ctaText}>Join our community of writers and share your knowledge with the world.</p>
        <Link to="/register" className={styles.ctaButton}>Get Started</Link>
      </section>
    </div>
  );
};

export default Home;