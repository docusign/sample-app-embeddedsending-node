import styles from './Loader.module.css';

const Loader = ({ title, paragraph }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
      {title ? (
        <div>
          <h5 className={styles.title}>{title}</h5>
          <div className={styles.paragraph}>{paragraph}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Loader;
