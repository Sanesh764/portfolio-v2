import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaDownload, FaEnvelope, FaChevronRight, FaAws } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb, SiDocker } from 'react-icons/si';
import { personalInfo, stats, socialLinks } from '../../data/portfolio.jsx';
import styles from './Hero.module.css';

export default function Hero() {
  const techBadges = [
    { name: 'React 19', icon: <SiReact /> },
    { name: 'Node.js', icon: <SiNodedotjs /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Docker', icon: <SiDocker /> },
    { name: 'AWS', icon: <FaAws /> }
  ];

  return (
    <section id="home" className={styles.hero}>
      {/* Background Decorative Ambient Gradients */}
      <div className={styles.gradientOrb1} />
      <div className={styles.gradientOrb2} />
      <div className={styles.gridPattern} />

      <div className={styles.heroContainer}>
        {/* Left Column: Text & CTAs */}
        <motion.div
          className={styles.contentLeft}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Availability Status Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            {personalInfo.status}
          </div>

          <p className={styles.greeting}>Hi, I'm <span className={styles.nameHighlight}>{personalInfo.name}</span></p>

          <h1 className={styles.title}>
            Software Engineer <br />
            <span className={styles.subGradient}>& Full Stack Developer</span>
          </h1>

          <p className={styles.tagline}>{personalInfo.tagline}</p>

          <p className={styles.intro}>
            {personalInfo.bio}
          </p>

          {/* Tech Badges Row */}
          <div className={styles.techBadgeRow}>
            <span className={styles.techLabel}>Primary Stack:</span>
            {techBadges.map((badge, idx) => (
              <span key={idx} className={styles.techPill}>
                {badge.icon} {badge.name}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={styles.buttons}>
            <a href="#projects" className={styles.btnPrimary}>
              Explore Work <FaChevronRight style={{ fontSize: '0.75rem' }} />
            </a>
            <a href={personalInfo.resumeLink} download className={styles.btnOutline} target="_blank" rel="noopener noreferrer">
              <FaDownload /> Resume
            </a>
            <a href={socialLinks[0].url} className={styles.iconBtn} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={socialLinks[1].url} className={styles.iconBtn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={socialLinks[3].url} className={`${styles.iconBtn} ${styles.leetcodeBtn}`} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <FaCode />
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className={styles.statsRow}>
            {stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statNumber}>{s.value}{typeof s.value === 'number' ? '+' : ''}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Visual Photo & Floating Badges */}
        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className={styles.photoWrapper}>
            <div className={styles.photoRing}>
              <img src={personalInfo.photo} alt={personalInfo.name} className={styles.photo} />
            </div>

            {/* Floating Experience Badge */}
            <motion.div 
              className={styles.floatingBadge1}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <div className={styles.badgeIcon}><FaCode /></div>
              <div>
                <div className={styles.floatingTitle}>200+ LeetCode</div>
                <div className={styles.floatingSub}>Problem Solving</div>
              </div>
            </motion.div>

            {/* Floating Status Badge */}
            <motion.div 
              className={styles.floatingBadge2}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            >
              <div className={styles.badgeIconAlt}>MERN</div>
              <div>
                <div className={styles.floatingTitle}>MERN Stack</div>
                <div className={styles.floatingSub}>Full Stack Arch</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
