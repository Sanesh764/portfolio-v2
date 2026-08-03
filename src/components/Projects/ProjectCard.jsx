import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaChartLine, FaMapMarkedAlt, FaRobot, FaShoppingCart, FaGamepad, FaCloud, FaChevronRight, FaStar, FaCogs, FaLightbulb, FaExclamationTriangle, FaChartPie, FaChevronDown } from 'react-icons/fa';
import styles from './Projects.module.css';

const iconMap = {
  FaChartLine: <FaChartLine />, FaGithub: <FaGithub />, FaMapMarkedAlt: <FaMapMarkedAlt />,
  FaRobot: <FaRobot />, FaShoppingCart: <FaShoppingCart />, FaGamepad: <FaGamepad />
};

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className={`glass-card ${styles.card}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      layout
    >
      {/* Top Banner Gradient & Featured Badge */}
      <div className={styles.cardImage} style={{ background: project.gradient }}>
        {project.featured && (
          <span className={styles.featuredTag}>
            <FaStar style={{ color: '#F59E0B' }} /> Featured Case Study
          </span>
        )}
        <div className={styles.iconVisual}>
          {iconMap[project.icon] || <FaGithub />}
        </div>
        <div className={styles.overlay}>
          {project.live && (
            <a href={project.live} className={styles.overlayBtn} target="_blank" rel="noopener noreferrer" aria-label="Live Demo Link">
              <FaExternalLinkAlt />
            </a>
          )}
          <a href={project.code} className={styles.overlayBtn} target="_blank" rel="noopener noreferrer" aria-label="Source Code Repository">
            <FaGithub />
          </a>
        </div>
      </div>

      <div className={styles.cardBody}>
        {/* Header: Category Badge + Deployment Target */}
        <div className={styles.metaHeader}>
          <span className={styles.categoryBadge}>{project.category}</span>
          <span className={styles.deploymentBadge}>
            <FaCloud style={{ fontSize: '0.7rem' }} /> {project.deployment}
          </span>
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>

        {/* Problem & Solution Case Study Preview */}
        {project.problem && (
          <div className={styles.problemSolutionBox}>
            <div className={styles.psItem}>
              <strong className={styles.psLabel}><FaLightbulb style={{ color: '#F59E0B' }} /> Problem:</strong> {project.problem}
            </div>
            <div className={styles.psItem}>
              <strong className={styles.psLabel}><FaCogs style={{ color: '#3B82F6' }} /> Solution:</strong> {project.solution}
            </div>
          </div>
        )}

        {/* Features Bullet List */}
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

        {/* Expandable Architecture & Engineering Deep-Dive */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className={styles.deepDiveBox}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.architecture && (
                <div className={styles.diveItem}>
                  <h5><FaCogs /> Architecture & Pipeline</h5>
                  <p>{project.architecture}</p>
                </div>
              )}
              {project.challenges && (
                <div className={styles.diveItem}>
                  <h5><FaExclamationTriangle style={{ color: '#EF4444' }} /> Engineering Challenges</h5>
                  <p>{project.challenges}</p>
                </div>
              )}
              {project.impact && (
                <div className={styles.diveItem}>
                  <h5><FaChartPie style={{ color: '#10B981' }} /> Measured Impact</h5>
                  <p>{project.impact}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand / Collapse Details Toggle Button */}
        {(project.architecture || project.challenges) && (
          <button 
            className={styles.toggleBtn} 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Hide Technical Details' : 'View Architecture Case Study'} 
            <FaChevronDown className={`${styles.chevron} ${expanded ? styles.rotated : ''}`} />
          </button>
        )}

        {/* Tech Stack Pills */}
        <div className={styles.techRow}>
          {project.tech.map((t, i) => <span key={i} className={styles.techTag}>{t}</span>)}
        </div>

        {/* Action Buttons */}
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
