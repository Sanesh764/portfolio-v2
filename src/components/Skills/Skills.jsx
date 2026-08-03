import { motion } from 'framer-motion';
import { 
  FaCode, FaPalette, FaServer, FaTools, FaCss3Alt, FaAws, FaJava, 
  FaDatabase, FaCloud, FaInfinity, FaVial, FaLock, FaUserShield,
  FaCheckCircle, FaExclamationTriangle, FaBug, FaCogs, FaRobot, FaBrain
} from 'react-icons/fa';
import {
  SiCplusplus, SiPython, SiJavascript, SiHtml5, SiReact,
  SiNodedotjs, SiExpress, SiMongodb, SiGit, SiGithub,
  SiFigma, SiLinux, SiVercel, SiMysql, SiMongoose, SiTailwindcss,
  SiBootstrap, SiEjs, SiSocketdotio, SiJsonwebtokens, SiCloudinary,
  SiRender, SiDocker, SiGithubactions, SiJest, SiTestinglibrary,
  SiPostman, SiVite, SiMapbox, SiRailway, SiNginx
} from 'react-icons/si';
import { skills } from '../../data/portfolio.jsx';
import styles from './Skills.module.css';

const iconMap = {
  SiC: <FaCode />, SiCplusplus: <SiCplusplus />, SiPython: <SiPython />,
  SiJavascript: <SiJavascript />, FaJava: <FaJava />, SiMysql: <SiMysql />,
  SiReact: <SiReact />, SiHtml5: <SiHtml5 />, FaCss3Alt: <FaCss3Alt />,
  SiTailwindcss: <SiTailwindcss />, SiBootstrap: <SiBootstrap />, SiEjs: <SiEjs />,
  SiNodedotjs: <SiNodedotjs />, SiExpress: <SiExpress />, SiSocketdotio: <SiSocketdotio />,
  SiJsonwebtokens: <SiJsonwebtokens />, FaUserShield: <FaUserShield />, FaLock: <FaLock />,
  SiMongodb: <SiMongodb />, SiMongoose: <SiMongoose />,
  FaAws: <FaAws />, SiCloudinary: <SiCloudinary />, SiRender: <SiRender />, SiVercel: <SiVercel />,
  SiRailway: <SiRailway />, SiDocker: <SiDocker />, SiGithubactions: <SiGithubactions />, SiNginx: <SiNginx />,
  FaInfinity: <FaInfinity />, FaCogs: <FaCogs />, FaCloud: <FaCloud />,
  SiJest: <SiJest />, SiTestinglibrary: <SiTestinglibrary />, SiPostman: <SiPostman />,
  FaCheckCircle: <FaCheckCircle />, FaExclamationTriangle: <FaExclamationTriangle />, FaBug: <FaBug />,
  FaRobot: <FaRobot />, FaBrain: <FaBrain />,
  SiGit: <SiGit />, SiGithub: <SiGithub />, SiVite: <SiVite />, SiMapbox: <SiMapbox />, SiVscode: <FaCode />
};

const categories = [
  { key: 'languages', title: 'Languages', icon: <FaCode /> },
  { key: 'frontend', title: 'Frontend', icon: <FaPalette /> },
  { key: 'backend', title: 'Backend', icon: <FaServer /> },
  { key: 'databases', title: 'Databases', icon: <FaDatabase /> },
  { key: 'cloud', title: 'Cloud', icon: <FaCloud /> },
  { key: 'devops', title: 'DevOps & Infrastructure', icon: <FaInfinity /> },
  { key: 'testing', title: 'Testing & QA', icon: <FaVial /> },
  { key: 'ai', title: 'AI & Machine Learning', icon: <FaRobot /> },
  { key: 'tools', title: 'Tools & Ecosystem', icon: <FaTools /> }
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="section-label">Technical Stack & Proficiency</span>
          <h2 className="section-title">Skills & Capabilities</h2>
          <p className="section-subtitle">A comprehensive breakdown of technologies, devops pipelines, testing utilities, and tools I use in production.</p>
        </motion.div>

        <div className={styles.skillsContainer}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              className={`glass-card ${styles.category}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.05 }}
            >
              <div className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                {cat.title}
              </div>
              <div className={styles.skillsGrid}>
                {skills[cat.key]?.map((skill, si) => (
                  <span key={si} className={styles.skill}>
                    {iconMap[skill.icon] || <FaCode />}
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
