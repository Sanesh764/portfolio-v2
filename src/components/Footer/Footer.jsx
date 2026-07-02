import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaEnvelope } from 'react-icons/fa';
import { navLinks, socialLinks } from '../../data/portfolio.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const iconMap = { github: <FaGithub />, linkedin: <FaLinkedin />, twitter: <FaTwitter />, leetcode: <FaCode /> };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.brand}>
              <span className={styles.bracket}>&lt;</span>Sanesh<span className={styles.bracket}>/&gt;</span>
            </div>
            <p className={styles.tagline}>Building digital experiences with passion and precision.</p>
          </div>

          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            {navLinks.map(link => (
              <span key={link.href} className={styles.footerLink} onClick={() => scrollTo(link.href)}>
                {link.name}
              </span>
            ))}
          </div>

          <div>
            <h4 className={styles.colTitle}>Connect</h4>
            {socialLinks.map((link, i) => (
              <a key={i} href={link.url} className={styles.footerLink} target="_blank" rel="noopener noreferrer">
                {iconMap[link.icon]} {link.name}
              </a>
            ))}
            <a href="mailto:sanesh7644@gmail.com" className={styles.footerLink}>
              <FaEnvelope /> Email
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          &copy; {new Date().getFullYear()} Sanesh. Crafted with <span className={styles.heart}>&hearts;</span> and lots of coffee.
        </div>
      </div>
    </footer>
  );
}
