import { motion } from 'framer-motion';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <motion.div
      className={styles.loader}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.bracket}>&lt;</span>Sanesh<span className={styles.bracket}>/&gt;</span>
        </div>
        <div className={styles.bar}>
          <div className={styles.barFill} />
        </div>
      </div>
    </motion.div>
  );
}
