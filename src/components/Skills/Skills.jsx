import { motion } from 'framer-motion';
import { 
  FaCode, FaPalette, FaServer, FaTools, FaCss3Alt, FaAws, FaJava, 
  FaDatabase, FaCloud, FaInfinity, FaVial, FaLock, FaUserShield 
} from 'react-icons/fa';
import {
  SiCplusplus, SiPython, SiJavascript, SiHtml5, SiReact,
  SiNodedotjs, SiExpress, SiMongodb, SiGit, SiGithub,
  SiFigma, SiLinux, SiVercel, SiMysql, SiMongoose, SiTailwindcss,
  SiBootstrap, SiEjs, SiSocketdotio, SiJsonwebtokens, SiCloudinary,
  SiRender, SiDocker, SiGithubactions, SiJest, SiTestinglibrary,
  SiPostman, SiVite, SiMapbox
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
  FaAws: <FaAws />, SiCloudinary: <SiCloudinary />, SiRender: <SiRender />,
  SiDocker: <SiDocker />, SiGithubactions: <SiGithubactions />,
  SiJest: <SiJest />, SiTestinglibrary: <SiTestinglibrary />,
  SiGit: <SiGit />, SiGithub: <SiGithub />, SiPostman: <SiPostman />,
  SiVite: <SiVite />, SiMapbox: <SiMapbox />, SiVscode: <FaCode />
};

const categories = [
  { key: 'languages', title: 'Languages', icon: <FaCode /> },
  { key: 'frontend', title: 'Frontend', icon: <FaPalette /> },
  { key: 'backend', title: 'Backend', icon: <FaServer /> },
  { key: 'databases', title: 'Databases', icon: <FaDatabase /> },
  { key: 'cloud', title: 'Cloud', icon: <FaCloud /> },
  { key: 'devops', title: 'DevOps', icon: <FaInfinity /> },
  { key: 'testing', title: 'Testing', icon: <FaVial /> },
  { key: 'tools', title: 'Tools & Platforms', icon: <FaTools /> }
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">Technologies I work with to bring ideas to life.</p>
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
