import { motion } from 'framer-motion';
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaChartLine, 
  FaMapMarkedAlt, 
  FaRobot, 
  FaShoppingCart, 
  FaGamepad, 
  FaCloud, 
  FaStar, 
  FaBookOpen,
  FaCheckCircle,
  FaServer,
  FaSchool
} from 'react-icons/fa';
import styles from './Projects.module.css';

const iconMap = {
  FaChartLine: <FaChartLine />,
  FaGithub: <FaGithub />,
  FaMapMarkedAlt: <FaMapMarkedAlt />,
  FaRobot: <FaRobot />,
  FaShoppingCart: <FaShoppingCart />,
  FaGamepad: <FaGamepad />,
  FaSchool: <FaSchool />
};

export default function ProjectCard({ project, index, onOpenCaseStudy }) {
  // Extract up to 2 key highlights from features or problem/solution
  const highlights = project.features 
    ? project.features.slice(0, 2) 
    : project.problem 
      ? [project.problem.slice(0, 75) + '...'] 
      : [];

  return (
    <motion.div
      className={`glass-card ${styles.card}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      layout
    >
      {/* Visual Window Header */}
      <div 
        className={styles.cardWindowHeader} 
        style={{ background: project.gradient }}
        onClick={() => onOpenCaseStudy(project)}
      >
        {/* Window Chrome Bar */}
        <div className={styles.windowChrome}>
          <div className={styles.windowDots}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>

          <div className={styles.windowStatus}>
            {project.featured && (
              <span className={styles.featuredBadge}>
                <FaStar className={styles.starIcon} /> Featured
              </span>
            )}
            <span className={styles.livePulseBadge}>
              <span className={styles.liveDot} /> {project.status || 'Live'}
            </span>
          </div>
        </div>

        {/* Center Tech Emblem */}
        <div className={styles.windowCenter}>
          <div className={styles.iconEmblem}>
            {iconMap[project.icon] || <FaGithub />}
          </div>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className={styles.windowOverlay}>
          <button 
            className={styles.overlayCaseStudyBtn}
            onClick={(e) => {
              e.stopPropagation();
              onOpenCaseStudy(project);
            }}
          >
            <FaBookOpen /> View Case Study
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className={styles.cardBody}>
        {/* Meta Row: Category & Deployment */}
        <div className={styles.metaRow}>
          <span className={styles.categoryBadge}>{project.category}</span>
          <span className={styles.deploymentBadge}>
            <FaCloud className={styles.deployIcon} /> {project.deployment || (project.deploymentInfo?.frontend) || 'Cloud'}
          </span>
        </div>

        {/* Title */}
        <h3 className={styles.cardTitle} onClick={() => onOpenCaseStudy(project)}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={styles.cardDesc}>
          {project.tagline || project.description}
        </p>

        {/* Key Architectural Highlights */}
        {highlights.length > 0 && (
          <div className={styles.highlightsBox}>
            {highlights.map((feat, idx) => (
              <div key={idx} className={styles.highlightItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className={styles.techRow}>
          {project.tech.slice(0, 4).map((t, i) => (
            <span key={i} className={styles.techTag}>{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className={styles.techMoreTag}>+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className={styles.cardActions}>
          {project.live && (
            <a 
              href={project.live} 
              className={styles.btnLive} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`Live Demo for ${project.title}`}
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
          <a 
            href={project.code} 
            className={styles.btnCode} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Source Code for ${project.title}`}
          >
            <FaGithub /> Code
          </a>
          <button 
            className={styles.btnDetails} 
            onClick={() => onOpenCaseStudy(project)}
            title="View Full Architecture Case Study"
            aria-label="View Full Architecture Case Study"
          >
            <FaBookOpen />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
