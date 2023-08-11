import React from "react";
import { FaEnvelope, FaPhone, FaInstagram, FaGithub } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <div className={styles.contactInfo}>
          <FaEnvelope className={styles.icon} />
          <p>dev.yangkong@gmail.com</p>
        </div>
        <div className={styles.contactInfo}>
          <FaPhone className={styles.icon} />
          <p>02-1234-5678</p>
        </div>
      </div>
      <div className={styles.socialMedia}>
        <a
          href="https://www.instagram.com/hi._.yangkong/"
          className={styles.socialLink}
        >
          <FaInstagram className={styles.socialIcon} />
        </a>
        <a href="https://github.com/DEV-Yangkong" className={styles.socialLink}>
          <FaGithub className={styles.socialIcon} />
        </a>
      </div>
      <div className={styles.footerInfo}>
        <p>&copy; 2023 Lilac Studio. All rights reserved.</p>
        <a href="/privacy-policy">개인정보처리방침</a>
        <a href="/terms-of-use">이용약관</a>
      </div>
    </footer>
  );
};

export default Footer;
