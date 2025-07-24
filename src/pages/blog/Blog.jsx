import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Blog.module.css';
import axios from 'axios';

const Blog = ({ token }) => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Fixed: useState(true) to setLoading
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (id) {
      // Fetch individual post
      axios.get(`http://localhost:8000/posts/${id}`)
        .then(response => {
          console.log('Post response:', response.data);
          setPost(response.data);
          setPosts([]); // Clear posts list when viewing a single post
        })
        .catch(error => {
          console.error('Error fetching post:', error.response ? error.response.data : error.message);
          setError('Failed to load post. Check the console for details.');
        })
        .finally(() => setLoading(false));
    } else {
      // Fetch all posts
      axios.get('http://localhost:8000/posts')
        .then(response => {
          console.log('Posts response:', response.data);
          setPosts(response.data);
          setPost(null); // Clear post when viewing the list
        })
        .catch(error => {
          console.error('Error fetching posts:', error.response ? error.response.data : error.message);
          setError('Failed to load posts. Check the console for details.');
        })
        .finally(() => setLoading(false));
    }
  }, [id]); // Re-run effect when id changes

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  if (id && post) {
    // Render individual post
    return (
      <div className={styles.blogContainer}>
        <h1 className={styles.blogTitle}>{post.title}</h1>
        <div className={styles.blogPost}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postDate}>{new Date(post.created_at).toLocaleDateString()}</p>
          {token ? (
            <p className={styles.postContent}>{post.content}</p> // Full content for logged-in users
          ) : (
            <p className={styles.postExcerpt}>
              {post.content.length > 100
                ? post.content.slice(0, 100) + '...'
                : post.content}
            </p> // Preview for unauthenticated users
          )}
          {!token && ( // Only show "Read More" for unauthenticated users
            <div className={styles.postFooter}>
              <Link to="/register" className={styles.readMore}>
                Read More →
              </Link>
            </div>
          )}
        </div>
        <Link to="/blog" className={styles.backLink}>
          Back to Blog Hub
        </Link>
      </div>
    );
  }

  // Render blog list
  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>Blog Hub</h1>
      <p className={styles.blogDescription}>
        Explore a collection of insightful articles and stories shared by our community. Launched on July 24, 2025, 
        this space is designed to inspire and connect writers and readers alike. Dive into the latest posts below!
      </p>
      <div className={styles.blogSection}>
        <h2 className={styles.sectionTitle}>Latest Articles</h2>
        <div className={styles.postsGrid}>
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postMeta}>
                  <span className={styles.postCategory}>Featured</span>
                  <span className={styles.postDate}>
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postExcerpt}>
                  {post.content.length > 150
                    ? post.content.slice(0, 150) + '...'
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
      </div>
      <div className={styles.blogSection}>
        <h2 className={styles.sectionTitle}>Join the Conversation</h2>
        <p className={styles.sectionContent}>
          Ready to share your own story or engage with our community? 
          Register today to unlock full access to articles and start contributing. 
          Visit our <Link to="/about" className={styles.internalLink}>About page</Link> to learn more.
        </p>
      </div>
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  );
};

export default Blog;