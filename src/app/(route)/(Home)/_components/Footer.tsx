import React from 'react';
import EmailIcon from '@/../public/assets/icons/email.svg';
import FacebookIcon from '@/../public/assets/icons/facebook.svg';
import InstagramIcon from '@/../public/assets/icons/instagram.svg';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <p className={styles.grayText}>©codeit - 2023</p>
      <div className={styles.serviceDiv}>
        <p className={styles.grayText}>Privacy Policy</p>
        <p className={styles.grayText}>FAQ</p>
      </div>
      <div className={styles.socialDiv}>
        <EmailIcon />
        <FacebookIcon />
        <InstagramIcon />
      </div>
    </div>
  );
};

export default Footer;
