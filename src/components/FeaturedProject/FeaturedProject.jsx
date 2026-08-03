import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSchool, FaGithub, FaExternalLinkAlt, FaCloud, FaServer, 
  FaDatabase, FaShieldAlt, FaLightbulb, FaCogs, FaExclamationTriangle, 
  FaGraduationCap, FaTachometerAlt, FaCheckCircle, FaStar, FaCode, FaRocket 
} from 'react-icons/fa';
import { featuredProject } from '../../data/portfolio.jsx';
import styles from './FeaturedProject.module.css';

export default function FeaturedProject() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Core Modules', value: '15+' },
    { label: 'API Latency', value: '<250ms' },
    { label: 'Role Security', value: 'JWT RBAC' },
    { label: 'Deployment', value: 'AWS / Railway' }
  ];

  return (
    <section id="flagship" className={`section ${styles.flagshipSection}`}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">
            <FaStar style={{ color: '#F59E0B' }} /> Flagship System Showcase
          </span>
          <h2 className="section-title">{featuredProject.title}</h2>
          <p className="section-subtitle">
            {featuredProject.tagline}
          </p>
        </motion.div>

        {/* Flagship Hero Card Layout */}
        <motion.div 
          className={`glass-card ${styles.showcaseCard}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Banner & Title Header */}
          <div className={styles.bannerHeader} style={{ background: featuredProject.gradient }}>
            <div className={styles.bannerBadgeRow}>
              <span className={styles.badgeFlagship}>
                <FaStar style={{ color: '#F59E0B' }} /> Flagship Project
              </span>
              <span className={styles.badgeStatus}>
                <span className={styles.statusDot} /> {featuredProject.status}
              </span>
            </div>

            <div className={styles.headerContent}>
              <div className={styles.projectIconWrapper}>
                <FaSchool />
              </div>
              <div>
                <h3 className={styles.bannerTitle}>{featuredProject.title}</h3>
                <p className={styles.bannerSub}>{featuredProject.category}</p>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className={styles.actionButtons}>
              <a href={featuredProject.live} target="_blank" rel="noopener noreferrer" className={styles.btnLive}>
                <FaExternalLinkAlt /> Live Demo
              </a>
              <a href={featuredProject.code} target="_blank" rel="noopener noreferrer" className={styles.btnGithub}>
                <FaGithub /> Source Code
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className={styles.metricsBar}>
            {stats.map((item, idx) => (
              <div key={idx} className={styles.metricItem}>
                <div className={styles.metricValue}>{item.value}</div>
                <div className={styles.metricLabel}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content Body */}
          <div className={styles.showcaseBody}>
            {/* Deployment Infrastructure Overview Cards */}
            <div className={styles.deploymentGrid}>
              <div className={styles.deployCard}>
                <FaCloud className={styles.deployIcon} style={{ color: '#F59E0B' }} />
                <div>
                  <div className={styles.deployLabel}>Frontend Host</div>
                  <div className={styles.deployValue}>{featuredProject.deploymentInfo.frontend}</div>
                </div>
              </div>

              <div className={styles.deployCard}>
                <FaServer className={styles.deployIcon} style={{ color: '#3B82F6' }} />
                <div>
                  <div className={styles.deployLabel}>Backend Host</div>
                  <div className={styles.deployValue}>{featuredProject.deploymentInfo.backend}</div>
                </div>
              </div>

              <div className={styles.deployCard}>
                <FaDatabase className={styles.deployIcon} style={{ color: '#10B981' }} />
                <div>
                  <div className={styles.deployLabel}>Database</div>
                  <div className={styles.deployValue}>{featuredProject.deploymentInfo.database}</div>
                </div>
              </div>

              <div className={styles.deployCard}>
                <FaShieldAlt className={styles.deployIcon} style={{ color: '#6366F1' }} />
                <div>
                  <div className={styles.deployLabel}>Media Processing</div>
                  <div className={styles.deployValue}>{featuredProject.deploymentInfo.media}</div>
                </div>
              </div>
            </div>

            {/* Case Study Tab Navigation */}
            <div className={styles.tabNav}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <FaLightbulb /> System Overview
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'features' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('features')}
              >
                <FaCheckCircle /> Core Features
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'architecture' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('architecture')}
              >
                <FaCogs /> Architecture & Pipeline
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'learnings' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('learnings')}
              >
                <FaGraduationCap /> Challenges & Insights
              </button>
            </div>

            {/* Tab Content Display */}
            <div className={styles.tabContent}>
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.overviewTab}>
                  <p className={styles.leadDescription}>{featuredProject.description}</p>
                  
                  <div className={styles.problemSolutionGrid}>
                    <div className={styles.psCard}>
                      <h4><FaLightbulb style={{ color: '#F59E0B' }} /> The Problem</h4>
                      <p>{featuredProject.problem}</p>
                    </div>
                    <div className={styles.psCard}>
                      <h4><FaCogs style={{ color: '#3B82F6' }} /> The Engineering Solution</h4>
                      <p>{featuredProject.solution}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.featuresTab}>
                  <div className={styles.featuresGrid}>
                    {featuredProject.features.map((feat, idx) => (
                      <div key={idx} className={styles.featBox}>
                        <FaCheckCircle className={styles.featIcon} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'architecture' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.archTab}>
                  <div className={styles.archBox}>
                    <h4>System Architecture & Flow</h4>
                    <p>{featuredProject.architecture}</p>
                  </div>
                  <div className={styles.perfBox}>
                    <h4>Performance & Response Latency</h4>
                    <p>{featuredProject.performance}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'learnings' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.learningsTab}>
                  <div className={styles.challengeBox}>
                    <h4><FaExclamationTriangle style={{ color: '#EF4444' }} /> Engineering Challenges Faced</h4>
                    <p>{featuredProject.challenges}</p>
                  </div>
                  <div className={styles.learnedBox}>
                    <h4><FaGraduationCap style={{ color: '#10B981' }} /> Key Learnings & Takeaways</h4>
                    <p>{featuredProject.learned}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Tech Stack Pills Footer */}
            <div className={styles.techFooter}>
              <span className={styles.techLabel}>Technologies Used:</span>
              <div className={styles.techPillsRow}>
                {featuredProject.tech.map((t, idx) => (
                  <span key={idx} className={styles.techPill}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
