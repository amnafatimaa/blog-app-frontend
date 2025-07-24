import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.contactTitle}>Contact Us</h1>
      <div className={styles.contactContent}>
        <div className={styles.contactForm}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Name
              </label>
              <input
                type="text"
                id="name"
                className={styles.formControl}
                placeholder="Your Name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.formControl}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Message
              </label>
              <textarea
                id="message"
                className={styles.formControl}
                placeholder="Your Message"
                rows="4"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
        <div className={styles.contactInfo}>
          <h2 className={styles.infoTitle}>Get in Touch</h2>
          <p className={styles.infoText}>
            Email: support@blogapp.com
          </p>
          <p className={styles.infoText}>
            Phone: +1-123-456-7890
          </p>
          <p className={styles.infoText}>
            Address: 123 Blog Street, Tech City, TC 12345
          </p>
          <p className={styles.infoText}>
            Hours: Mon-Fri, 9:00 AM - 5:00 PM PKT
          </p>
        </div>
      </div>
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
    </div>
  );
};

export default Contact;