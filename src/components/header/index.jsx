import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '/src/assets/blog-app-logo.png';

const Header = ({ setToken }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Blog App Logo" className={styles.logoImage} />
          <span className={styles.logoText}>BLOG-APP</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
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
              onClick={handleLogout}
              className={styles.logoutBtn}
              aria-label="Log out"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn} aria-label="Log in">
                Login
              </Link>
              <Link to="/register" className={styles.registerBtn} aria-label="Register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;