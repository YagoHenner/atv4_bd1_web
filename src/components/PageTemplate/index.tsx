import { PageTemplateProps } from '../../assets/interfaces';
import styles from './PageTemplate.module.css';
import { motion } from 'framer-motion';

export default function PageTemplate({ title, children }: PageTemplateProps) {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '100vw',
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: '-100vw',
    },
  };

  const pageTransition = {
    damping: 20,
    ease: [0.6, -0.05, 0.01, 0.99],
    duration: 1,
  };
  return (
    <div className="fullScreen">
      <div className={styles.page}>
        <div className={styles.bar}>
          <div className={styles.title}>{title}</div>
        </div>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className={styles.children}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
