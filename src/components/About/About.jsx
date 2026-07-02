import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaGraduationCap, FaCode, FaBriefcase } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolio.jsx';
import styles from './About.module.css';

const tags = [
  { icon: <FaMapMarkerAlt />, label: 'India' },
  { icon: <FaGraduationCap />, label: 'B.Tech CSE' },
  { icon: <FaCode />, label: '200+ LeetCode' },
  { icon: <FaBriefcase />, label: 'Open to Work' }
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">A glimpse into who I am, what I know, and where I'm headed.</p>
        </motion.div>

        <div className={styles.aboutGrid}>
          <motion.div className={`glass-card ${styles.photoCard}`} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className={styles.ring}>
              <img src={personalInfo.photo} alt={personalInfo.name} />
            </div>
            <h3 className={styles.name}>{personalInfo.name}</h3>
            <p className={styles.role}>{personalInfo.role}</p>
            <div className={styles.tags}>
              {tags.map((t, i) => (
                <span key={i} className={styles.tag}>{t.icon} {t.label}</span>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.infoSide} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3>My Journey</h3>
            {personalInfo.about.map((text, i) => (
              <p key={i} className={styles.paragraph}>{text}</p>
            ))}
            <div className={styles.statusBadge}>
              <span className={styles.dot} /> Available for Opportunities
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
