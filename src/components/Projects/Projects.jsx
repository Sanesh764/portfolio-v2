import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaTimes, 
  FaExternalLinkAlt, 
  FaGithub, 
  FaCloud, 
  FaStar, 
  FaCogs, 
  FaLightbulb, 
  FaExclamationTriangle, 
  FaChartPie, 
  FaCheckCircle, 
  FaRocket,
  FaLayerGroup,
  FaArrowRight
} from 'react-icons/fa';
import { projects } from '../../data/portfolio.jsx';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  // Lock body scroll and close on Escape when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveProject(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeProject]);

  // Compute categories dynamically with counts
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    
    // Featured count
    const featuredCount = projects.filter(p => p.featured).length;
    if (featuredCount > 0) {
      counts['Featured'] = featuredCount;
    }

    projects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return counts;
  }, []);

  const categories = useMemo(() => {
    const defaultOrder = ['All', 'Featured', 'Full Stack', 'AI / Full Stack', 'Cloud / DevOps', 'Frontend'];
    const keys = Object.keys(categoryCounts);
    // Sort according to defaultOrder if present, else append
    return defaultOrder.filter(c => keys.includes(c)).concat(keys.filter(c => !defaultOrder.includes(c)));
  }, [categoryCounts]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        p.tech.some(t => t.toLowerCase().includes(q));
      
      let matchesCategory = true;
      if (selectedCategory === 'Featured') {
        matchesCategory = p.featured;
      } else if (selectedCategory !== 'All') {
        matchesCategory = p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      }

      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className={`section ${styles.projectsSection}`}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Engineering Case Studies</span>
          <h2 className="section-title">Projects & Systems</h2>
          <p className="section-subtitle">
            Production-grade systems engineered with scalable microservices, secure authentication, resilient cloud pipelines, and AI integration.
          </p>
        </motion.div>

        {/* Controls: Category Filter Tabs & Search */}
        <div className={styles.controlsRow}>
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.tab} ${selectedCategory === cat ? styles.tabActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
                <span className={styles.tabCount}>{categoryCounts[cat] || 0}</span>
              </button>
            ))}
          </div>

          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by title or tech (e.g., React, AWS, Docker)..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className={styles.searchClearBtn}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <ProjectCard 
                  key={p.id || i} 
                  project={p} 
                  index={i} 
                  onOpenCaseStudy={setActiveProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <div className={styles.emptyState}>
            <div className={styles.emptyIconCircle}>
              <FaSearch />
            </div>
            <h3>No matching projects found</h3>
            <p>Try searching for a different keyword or reset your filters.</p>
            <button 
              className={styles.resetBtn}
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Case Study Deep-Dive Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Banner Header */}
              <div 
                className={styles.modalHeader} 
                style={{ background: activeProject.gradient }}
              >
                <div className={styles.modalHeaderTop}>
                  <div className={styles.modalBadges}>
                    <span className={styles.modalCategoryBadge}>
                      {activeProject.category}
                    </span>
                    <span className={styles.modalDeployBadge}>
                      <FaCloud /> {activeProject.deployment || activeProject.deploymentInfo?.frontend || 'Cloud'}
                    </span>
                    {activeProject.featured && (
                      <span className={styles.modalFeaturedBadge}>
                        <FaStar style={{ color: '#F59E0B' }} /> Featured
                      </span>
                    )}
                  </div>

                  <button 
                    className={styles.modalCloseBtn}
                    onClick={() => setActiveProject(null)}
                    aria-label="Close Case Study"
                  >
                    <FaTimes />
                  </button>
                </div>

                <h2 className={styles.modalTitle}>{activeProject.title}</h2>
                <p className={styles.modalTagline}>{activeProject.tagline || activeProject.description}</p>

                {/* Header Action Buttons */}
                <div className={styles.modalQuickActions}>
                  {activeProject.live && (
                    <a 
                      href={activeProject.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.modalBtnLive}
                    >
                      <FaExternalLinkAlt /> Live Application
                    </a>
                  )}
                  <a 
                    href={activeProject.code} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.modalBtnCode}
                  >
                    <FaGithub /> View Source Code
                  </a>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className={styles.modalBody}>
                {/* Problem & Solution Cards */}
                {(activeProject.problem || activeProject.solution) && (
                  <div className={styles.psGrid}>
                    {activeProject.problem && (
                      <div className={styles.psCard}>
                        <div className={styles.psCardHeader}>
                          <FaLightbulb style={{ color: '#F59E0B' }} />
                          <h4>The Problem</h4>
                        </div>
                        <p>{activeProject.problem}</p>
                      </div>
                    )}
                    {activeProject.solution && (
                      <div className={styles.psCard}>
                        <div className={styles.psCardHeader}>
                          <FaRocket style={{ color: '#3B82F6' }} />
                          <h4>The Engineering Solution</h4>
                        </div>
                        <p>{activeProject.solution}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Architecture & Pipeline */}
                {activeProject.architecture && (
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionHeading}>
                      <FaCogs style={{ color: '#818CF8' }} /> System Architecture & Pipeline
                    </h4>
                    <div className={styles.architectureBox}>
                      <p>{activeProject.architecture}</p>
                    </div>
                  </div>
                )}

                {/* Key Features */}
                {activeProject.features && activeProject.features.length > 0 && (
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionHeading}>
                      <FaCheckCircle style={{ color: '#10B981' }} /> Key Engineered Features
                    </h4>
                    <div className={styles.featuresGrid}>
                      {activeProject.features.map((feat, idx) => (
                        <div key={idx} className={styles.featurePill}>
                          <FaCheckCircle className={styles.featureIcon} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges & Solutions */}
                {activeProject.challenges && (
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionHeading}>
                      <FaExclamationTriangle style={{ color: '#EF4444' }} /> Engineering Challenges & Resolutions
                    </h4>
                    <div className={styles.challengeBox}>
                      <p>{activeProject.challenges}</p>
                    </div>
                  </div>
                )}

                {/* Measured Impact */}
                {activeProject.impact && (
                  <div className={styles.detailSection}>
                    <h4 className={styles.sectionHeading}>
                      <FaChartPie style={{ color: '#10B981' }} /> Performance & Impact
                    </h4>
                    <div className={styles.impactBox}>
                      <p>{activeProject.impact}</p>
                    </div>
                  </div>
                )}

                {/* Technologies Used */}
                <div className={styles.detailSection}>
                  <h4 className={styles.sectionHeading}>
                    <FaLayerGroup style={{ color: '#38BDF8' }} /> Technologies & Tools
                  </h4>
                  <div className={styles.modalTechRow}>
                    {activeProject.tech.map((t, idx) => (
                      <span key={idx} className={styles.modalTechBadge}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
