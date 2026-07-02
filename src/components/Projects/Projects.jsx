import { motion } from 'framer-motion';
import { projects } from '../../data/portfolio.jsx';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Each project represents a step in my journey — from frontend experiments to full-stack applications.</p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
