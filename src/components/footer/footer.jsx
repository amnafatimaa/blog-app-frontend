import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.heading}>Blog-App</h3>
            <p className={styles.description}>
              Share your ideas, tell your stories, and explore perspectives from around the world.
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.subheading}>Explore</h4>
            <ul className={styles.linkList}>
              <li><a href="/" className={styles.link}>Home</a></li>
              <li><a href="/blog" className={styles.link}>Blog</a></li>
              <li><a href="/about" className={styles.link}>About</a></li>
              <li><a href="/contact" className={styles.link}>Contact</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.subheading}>Follow Us</h4>
            <div className={styles.socials}>
              <a href="#" className={styles.icon}><i className="fab fa-twitter" /></a>
              <a href="#" className={styles.icon}><i className="fab fa-facebook" /></a>
              <a href="#" className={styles.icon}><i className="fab fa-instagram" /></a>
              <a href="#" className={styles.icon}><i className="fab fa-linkedin" /></a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.trademark}>&copy; {new Date().getFullYear()} Blog-App. Built with ❤️ for creators.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
