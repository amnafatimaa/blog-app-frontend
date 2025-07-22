import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ setToken }) => {
  const token = localStorage.getItem('token');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logoText}>BLOG-APP</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><Link to="/" className={styles.navLink}>Home</Link></li>
            <li><Link to="/blog" className={styles.navLink}>Blog</Link></li>
            <li><Link to="/about" className={styles.navLink}>About</Link></li>
            <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
          </ul>
        </nav>

        <div className={styles.actions}>
          {token ? (
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                setToken(null);
              }}
              className={styles.logoutBtn}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn}>Login</Link>
              <Link to="/register" className={styles.registerBtn}>Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;