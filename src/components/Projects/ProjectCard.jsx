import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaChartLine, FaMapMarkedAlt, FaRobot, FaShoppingCart, FaGamepad, FaCloud, FaChevronRight } from 'react-icons/fa';
import styles from './Projects.module.css';

const iconMap = {
  FaChartLine: <FaChartLine />, FaGithub: <FaGithub />, FaMapMarkedAlt: <FaMapMarkedAlt />,
  FaRobot: <FaRobot />, FaShoppingCart: <FaShoppingCart />, FaGamepad: <FaGamepad />
};

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      className={`glass-card ${styles.card}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className={styles.cardImage} style={{ background: project.gradient }}>
        {iconMap[project.icon] || <FaGithub />}
        <div className={styles.overlay}>
          {project.live && (
            <a href={project.live} className={styles.overlayBtn} target="_blank" rel="noopener noreferrer" aria-label="Live demo link">
              <FaExternalLinkAlt />
            </a>
          )}
          <a href={project.code} className={styles.overlayBtn} target="_blank" rel="noopener noreferrer" aria-label="Source code link">
            <FaGithub />
          </a>
        </div>
      </div>
      <div className={styles.cardBody}>
        {/* Project Meta header: Status + Deployment */}
        <div className={styles.metaHeader}>
          <span className={styles.statusBadge}>
            <span className={styles.statusDot} />
            {project.status}
          </span>
          <span className={styles.deploymentBadge}>
            <FaCloud style={{ fontSize: '0.7rem' }} /> {project.deployment}
          </span>
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        
        {/* Features List */}
        {project.features && (
          <div className={styles.featuresSection}>
            <h4 className={styles.featuresTitle}>Key Features</h4>
            <ul className={styles.featuresList}>
              {project.features.map((feat, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <FaChevronRight className={styles.featureArrow} />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.techRow}>
          {project.tech.map((t, i) => <span key={i} className={styles.techTag}>{t}</span>)}
        </div>
        <div className={styles.cardActions}>
          {project.live && (
            <a href={project.live} className={styles.btnLive} target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
          <a href={project.code} className={styles.btnCode} target="_blank" rel="noopener noreferrer">
            <FaGithub /> Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
