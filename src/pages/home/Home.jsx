import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  // Sample featured posts data
  const featuredPosts = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the fundamentals of React and build your first application.',
      category: 'React',
      date: 'May 15, 2023',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Modern CSS Techniques',
      excerpt: 'Explore the latest CSS features to create stunning designs.',
      category: 'CSS',
      date: 'June 2, 2023',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'JavaScript Best Practices',
      excerpt: 'Write cleaner and more efficient JavaScript code with these tips.',
      category: 'JavaScript',
      date: 'June 10, 2023',
      readTime: '6 min read'
    }
  ];

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
          {featuredPosts.map(post => (
            <article key={post.id} className={styles.postCard}>
              <div className={styles.postMeta}>
                <span className={styles.postCategory}>{post.category}</span>
                <span className={styles.postDate}>{post.date}</span>
              </div>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <div className={styles.postFooter}>
                <span className={styles.readTime}>{post.readTime}</span>
                <Link to={`/blog/${post.id}`} className={styles.readMore}>Read More →</Link>
              </div>
            </article>
          ))}
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