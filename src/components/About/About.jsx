import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaBriefcase, FaRocket, FaBullseye, FaCheckCircle } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolio.jsx';
import styles from './About.module.css';

export default function About() {
  const focusAreas = [
    'Full Stack Systems Engineering (MERN Stack)',
    'Scalable Microservices & RESTful API Architecture',
    'Cloud Deployment (AWS EC2, S3, Docker & Render)',
    'Algorithmic Problem Solving (200+ LeetCode Solved)',
    'AI Microservices Integration (NVIDIA NIM APIs)'
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="section-header" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Background & Engineer Profile</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A comprehensive look into my academic journey, technical specialization, and software engineering philosophy.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className={styles.aboutGrid}>
          {/* Left Card: Profile & Academics */}
          <motion.div 
            className={`glass-card ${styles.profileCard}`}
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
          >
            <div className={styles.ring}>
              <img src={personalInfo.photo} alt={personalInfo.name} />
            </div>
            <h3 className={styles.name}>{personalInfo.name}</h3>
            <p className={styles.role}>{personalInfo.role}</p>

            <div className={styles.academicInfo}>
              <div className={styles.academicItem}>
                <FaGraduationCap className={styles.academicIcon} />
                <div>
                  <div className={styles.academicDegree}>{personalInfo.degree}</div>
                  <div className={styles.academicSchool}>{personalInfo.college}</div>
                  <div className={styles.cgpaBadge}>CGPA: {personalInfo.cgpa}</div>
                </div>
              </div>
            </div>

            <div className={styles.badgeRow}>
              <span className={styles.statusBadge}>
                <span className={styles.dot} /> {personalInfo.status}
              </span>
            </div>
          </motion.div>

          {/* Right Content: Bio & Engineering Focus */}
          <motion.div 
            className={styles.infoSide}
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={styles.subTitle}>Engineering Story</h3>
            {personalInfo.about.map((text, i) => (
              <p key={i} className={styles.paragraph}>{text}</p>
            ))}

            {/* Current Focus */}
            <div className={styles.focusBox}>
              <div className={styles.boxHeader}>
                <FaRocket className={styles.boxIcon} />
                <h4>Current Technical Focus</h4>
              </div>
              <ul className={styles.focusList}>
                {focusAreas.map((area, idx) => (
                  <li key={idx} className={styles.focusItem}>
                    <FaCheckCircle className={styles.checkIcon} />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Goals */}
            <div className={styles.goalBox}>
              <div className={styles.boxHeader}>
                <FaBullseye className={styles.goalIcon} />
                <h4>Career Objective</h4>
              </div>
              <p className={styles.goalText}>{personalInfo.careerGoals}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
