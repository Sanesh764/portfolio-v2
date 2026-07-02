import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaCodeBranch } from 'react-icons/fa';
import { experience } from '../../data/portfolio.jsx';
import styles from './Experience.module.css';

const iconMap = {
  FaGraduationCap: <FaGraduationCap />,
  FaLaptopCode: <FaLaptopCode />,
  FaCodeBranch: <FaCodeBranch />
};

export default function Experience() {
  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="section-label">Journey</span>
          <h2 className="section-title">Education & Experience</h2>
          <p className="section-subtitle">My path through academia and the tech world.</p>
        </motion.div>

        <div className={styles.timeline}>
          {experience.map((item, i) => (
            <motion.div
              key={i}
              className={`glass-card ${styles.item}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <div className={styles.dot}>
                {iconMap[item.icon] || <FaCodeBranch />}
              </div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <span className={styles.itemSub}>{item.subtitle}</span>
              <p className={styles.itemDesc}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
