import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import { personalInfo, stats, socialLinks } from '../../data/portfolio.jsx';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContainer}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            {personalInfo.status}
          </div>

          <p className={styles.greeting}>Hi there, I'm</p>
          <h1 className={styles.title}>
            <span className={styles.highlight}>{personalInfo.firstName}</span> Kumar
          </h1>
          <p className={styles.roleText}>{personalInfo.role}</p>
          <p className={styles.intro}>
            Passionate about building real-world applications with modern web technologies.
            Currently pursuing B.Tech in Computer Science and turning ideas into impactful projects.
          </p>

          <div className={styles.buttons}>
            <a href={socialLinks[0].url} className={styles.btnPrimary} target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href={socialLinks[1].url} className={styles.btnOutline} target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={socialLinks[3].url} className={`${styles.btnOutline} ${styles.btnLeetcode}`} target="_blank" rel="noopener noreferrer">
              <FaCode /> LeetCode
            </a>
          </div>

          <div className={styles.statsRow}>
            {stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statNumber}>{s.value}+</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className={styles.photoWrapper}>
            <div className={styles.orb1} />
            <div className={styles.orb2} />
            <div className={styles.photoRing}>
              <img src={personalInfo.photo} alt={personalInfo.name} className={styles.photo} />
            </div>
            <div className={styles.floatingBadge}>
              <FaCode /> 200+ LeetCode
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
