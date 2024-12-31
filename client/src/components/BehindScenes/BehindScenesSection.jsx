import styles from './BehindScenesSection.module.css';

const BehindScenesSection = ({ title, children }) => {
  return (
    <div>
      <h2 className={styles.header}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default BehindScenesSection;
