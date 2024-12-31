import styles from './BehindScenesContainer.module.css';

const BehindScenesContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default BehindScenesContainer;
