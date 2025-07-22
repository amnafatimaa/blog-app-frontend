import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>About Blog-App</h3>
            <p className={styles.footerText}>
              A modern blogging platform for sharing ideas and stories with the world.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/" className={styles.footerLink}>Home</a></li>
              <li><a href="/blog" className={styles.footerLink}>Blog</a></li>
              <li><a href="/about" className={styles.footerLink}>About</a></li>
              <li><a href="/contact" className={styles.footerLink}>Contact</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerHeading}>Connect</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Blog-App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;