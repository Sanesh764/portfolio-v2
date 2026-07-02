import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import styles from './Certificates.module.css';

// Dynamically load all images from src/assets/certificate
const certificateImages = import.meta.glob('../../assets/certificate/*.{png,jpg,jpeg,webp,svg}', { eager: true });

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Parse certificates from glob import
  const certificates = useMemo(() => {
    const list = Object.keys(certificateImages).map((path) => {
      const module = certificateImages[path];
      const url = module.default || module;
      
      const filename = path.split('/').pop();
      const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
      
      // Clean name: replace dashes, underscores, typos
      let title = nameWithoutExt
        .replace(/[_-]/g, ' ')
        .replace(/\bcetificate\b/gi, 'Certificate')
        .replace(/\bcertificate\b/gi, 'Certificate');

      // Title Case
      title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

      // Infer organization and category
      let org = 'Credential';
      let category = 'Course';
      const lowerTitle = title.toLowerCase();

      if (lowerTitle.includes('google')) {
        org = 'Google';
        category = 'Google';
      } else if (lowerTitle.includes('aws') || lowerTitle.includes('amazon')) {
        org = 'AWS';
        category = 'AWS';
      } else if (lowerTitle.includes('microsoft') || lowerTitle.includes('azure')) {
        org = 'Microsoft';
        category = 'Microsoft';
      } else if (lowerTitle.includes('internship') || lowerTitle.includes('intern')) {
        org = 'Internship';
        category = 'Internship';
      } else if (lowerTitle.includes('hackathon') || lowerTitle.includes('hack')) {
        org = 'Hackathon';
        category = 'Hackathon';
      } else if (lowerTitle.includes('freecodecamp')) {
        org = 'freeCodeCamp';
        category = 'Course';
      } else {
        org = 'Sanesh Kumar';
        category = 'Course';
      }

      return {
        id: nameWithoutExt,
        title,
        org,
        category,
        image: url
      };
    });

    // Sort alphabetically by default
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  // Compute category list and counts
  const categoryCounts = useMemo(() => {
    const counts = { All: certificates.length };
    certificates.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [certificates]);

  const categories = useMemo(() => {
    return Object.keys(categoryCounts);
  }, [categoryCounts]);

  // Filtered list
  const filteredCertificates = useMemo(() => {
    return certificates.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.org.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [certificates, searchQuery, selectedCategory]);

  return (
    <section id="certificates" className={`section ${styles.certificates}`}>
      <div className="container">
        
        {/* Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            A showcase of my verified achievements, courses, and professional credentials.
          </p>
        </motion.div>

        {/* Gallery Controls */}
        <div className={styles.galleryHeader}>
          <div className={styles.controls}>
            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search certificates..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            {categories.length > 1 && (
              <div className={styles.filterTabs}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`${styles.tab} ${selectedCategory === cat ? styles.tabActive : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                    <span className={styles.count}>{categoryCounts[cat]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid List */}
        {filteredCertificates.length > 0 ? (
          <motion.div 
            className={styles.grid}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  layout
                  className={`glass-card ${styles.card}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setActiveCertificate(cert)}
                >
                  <div className={styles.cardImageWrapper}>
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className={styles.image}
                      loading="lazy"
                    />
                    <div className={styles.cardOverlay}>
                      <span className={styles.viewIcon}>
                        <FaExternalLinkAlt />
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.orgBadge}>{cert.org}</span>
                    <h3 className={styles.cardTitle}>{cert.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <div className={styles.emptyState}>
            <FaAward className={styles.emptyIcon} />
            <h3>No certificates found</h3>
            <p>Try adjusting your search query or filters.</p>
          </div>
        )}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {activeCertificate && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalTitleWrapper}>
                  <h3>{activeCertificate.title}</h3>
                  <span>{activeCertificate.org}</span>
                </div>
                <div className={styles.modalActions}>
                  <button 
                    className={styles.modalBtn} 
                    onClick={() => setActiveCertificate(null)}
                    aria-label="Close modal"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              <div className={styles.modalBody}>
                <img 
                  src={activeCertificate.image} 
                  alt={activeCertificate.title} 
                  className={styles.modalImage} 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
