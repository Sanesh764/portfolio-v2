import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { projects } from '../../data/portfolio.jsx';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Featured', 'AI / Full Stack', 'Full Stack', 'Cloud / DevOps', 'Frontend'];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
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
    <section id="projects" className="section">
      <div className="container">
        {/* Header */}
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
            Production-ready applications built with real-world architecture, scalable APIs, AI integration, and responsive UX.
          </p>
        </motion.div>

        {/* Controls: Category Filter Tabs & Search Input */}
        <div className={styles.controlsRow}>
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.tab} ${selectedCategory === cat ? styles.tabActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by title, tech stack (e.g., React, AWS, Docker)..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <ProjectCard key={p.id || i} project={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className={styles.emptyState}>
            <h3>No projects found</h3>
            <p>Try clearing your search terms or selecting another category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
