import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaTimes, 
  FaExternalLinkAlt, 
  FaAward, 
  FaFilePdf, 
  FaRegCalendarAlt,
  FaCertificate
} from 'react-icons/fa';
import { pdfCertificates } from '../../data/certificates';
import styles from './Certificates.module.css';

// Dynamically load all images from src/assets/certificate
const certificateImages = import.meta.glob('../../assets/certificate/*.{png,jpg,jpeg,webp,svg}', { eager: true });

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCertificate, setActiveCertificate] = useState(null);

  // Combine PDF certificates and existing image certificates
  const certificates = useMemo(() => {
    // 1. Process configured PDF certificates
    const pdfList = pdfCertificates.map((cert) => ({
      id: cert.id,
      title: cert.title,
      org: cert.org,
      date: cert.date || '',
      category: cert.category || 'Credential',
      image: cert.preview,
      pdfUrl: cert.pdfUrl,
      isPdf: true,
      credentialId: cert.credentialId,
      badge: cert.badge
    }));

    // 2. Process legacy/existing image certificates from assets
    const imageList = Object.keys(certificateImages).map((path) => {
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
        date: 'Verified Credential',
        category,
        image: url,
        pdfUrl: null,
        isPdf: false,
        badge: 'Verified'
      };
    });

    // Combine both: prioritize PDF certificates, then image certificates
    return [...pdfList, ...imageList];
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
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        c.title.toLowerCase().includes(q) ||
        c.org.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.date && c.date.toLowerCase().includes(q));
      
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
          <span className="section-label">Credentials & Certifications</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            A showcase of my verified credentials, academic courses, and industry-recognized certifications.
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
                placeholder="Search certificates by title, issuer, or keyword..."
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
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  onClick={() => setActiveCertificate(cert)}
                >
                  {/* Thumbnail / Image Preview */}
                  <div className={styles.cardImageWrapper}>
                    {cert.image ? (
                      <img 
                        src={cert.image} 
                        alt={cert.title} 
                        className={styles.image}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.docPlaceholder}>
                        <FaFilePdf className={styles.placeholderIcon} />
                        <span className={styles.placeholderText}>PDF Document</span>
                      </div>
                    )}

                    {/* PDF Document Badge */}
                    {cert.isPdf ? (
                      <span className={styles.pdfBadge}>
                        <FaFilePdf className={styles.pdfBadgeIcon} /> PDF
                      </span>
                    ) : (
                      <span className={styles.credentialBadge}>
                        <FaCertificate className={styles.pdfBadgeIcon} /> Image
                      </span>
                    )}

                    {/* Hover Overlay */}
                    <div className={styles.cardOverlay}>
                      <span className={styles.viewIcon} title="Preview Certificate">
                        <FaExternalLinkAlt />
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.orgBadge}>
                        <FaAward className={styles.metaIcon} />
                        {cert.org}
                      </span>
                      {cert.date && (
                        <span className={styles.dateBadge}>
                          <FaRegCalendarAlt className={styles.metaIcon} />
                          {cert.date}
                        </span>
                      )}
                    </div>

                    <h3 className={styles.cardTitle} title={cert.title}>
                      {cert.title}
                    </h3>

                    {/* Action Button */}
                    <div className={styles.cardFooter}>
                      <a
                        href={cert.pdfUrl || cert.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {cert.isPdf ? (
                          <FaFilePdf className={styles.btnIcon} />
                        ) : (
                          <FaCertificate className={styles.btnIcon} />
                        )}
                        <span>View Certificate</span>
                        <FaExternalLinkAlt className={styles.btnArrow} />
                      </a>
                    </div>
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
            <p>Try adjusting your search query or selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Lightbox / Preview Modal */}
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
                  <div className={styles.modalSubRow}>
                    <span className={styles.modalOrg}>
                      <FaAward /> {activeCertificate.org}
                    </span>
                    {activeCertificate.date && (
                      <span className={styles.modalDate}>
                        <FaRegCalendarAlt /> {activeCertificate.date}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <a
                    href={activeCertificate.pdfUrl || activeCertificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalOpenBtn}
                    title="Open original document in new tab"
                  >
                    <FaExternalLinkAlt />
                    <span>{activeCertificate.isPdf ? 'Open PDF' : 'View Full Image'}</span>
                  </a>
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
                {activeCertificate.image ? (
                  <img 
                    src={activeCertificate.image} 
                    alt={activeCertificate.title} 
                    className={styles.modalImage} 
                  />
                ) : (
                  <div className={styles.modalPdfPlaceholder}>
                    <FaFilePdf size={64} className={styles.modalPdfIcon} />
                    <h4>{activeCertificate.title}</h4>
                    <p>Click below to open and view the verified PDF certificate.</p>
                    <a
                      href={activeCertificate.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.modalPdfLink}
                    >
                      <FaExternalLinkAlt /> Open Certificate PDF
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
