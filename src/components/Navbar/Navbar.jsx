import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/portfolio.jsx';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const themeIconVariants = {
    initial: { scale: 0.6, rotate: -90, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
    exit: { scale: 0.6, rotate: 90, opacity: 0 }
  };

  const renderThemeToggle = (extraClass = '') => (
    <button 
      className={`${styles.themeToggle} ${extraClass}`} 
      onClick={toggleTheme} 
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.span key="moon" variants={themeIconVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex' }}>
            <FiMoon />
          </motion.span>
        ) : (
          <motion.span key="sun" variants={themeIconVariants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex' }}>
            <FiSun />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );

  return (
    <>
      <div className={menuOpen ? `${styles.overlay} ${styles.show}` : styles.overlay} onClick={() => setMenuOpen(false)} />
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <a href="#home" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
            <span className={styles.logoBracket}>&lt;</span>Sanesh<span className={styles.logoBracket}>/&gt;</span>
          </a>

          <div className={`${styles.navMenu} ${menuOpen ? styles.open : ''}`}>
            {navLinks.map(link => (
              <button
                key={link.href}
                className={`${styles.navLink} ${active === link.href ? styles.active : ''}`}
                onClick={() => scrollTo(link.href)}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className={styles.mobileActions}>
            {renderThemeToggle()}
            <button className={styles.mobileToggle} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>

          {renderThemeToggle(styles.desktopToggle)}
        </div>
      </nav>
    </>
  );
}
