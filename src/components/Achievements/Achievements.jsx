import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaAward, FaCloud, FaExternalLinkAlt, FaGithub, FaCheck } from 'react-icons/fa';
import { achievements, stats } from '../../data/portfolio.jsx';
import styles from './Achievements.module.css';

const iconMap = {
  FaCode: <FaCode />,
  FaGraduationCap: <FaGraduationCap />,
  FaAward: <FaAward />,
  FaCloud: <FaCloud />
};

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="section-header" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Milestones & Metrics</span>
          <h2 className="section-title">Key Achievements</h2>
          <p className="section-subtitle">
            A breakdown of my algorithmic problem-solving metrics, academic milestones, and engineering credentials.
          </p>
        </motion.div>

        {/* Stats Highlight Banner */}
        <div className={styles.statsBanner}>
          {stats.map((s, idx) => (
            <motion.div 
              key={idx} 
              className={styles.bannerItem}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className={styles.bannerValue}>{s.value}{typeof s.value === 'number' ? '+' : ''}</div>
              <div className={styles.bannerLabel}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Cards Grid */}
        <div className={styles.grid}>
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className={`glass-card ${styles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>
                  {iconMap[item.icon] || <FaAward />}
                </div>
                <span className={styles.badge}>{item.badge}</span>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDetail}>{item.detail}</p>

              {item.link && item.link.startsWith('http') && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                  Verify Profile <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
