import t from '../../helpers/t';
import styles from './CopyrightFooter.module.css';

const CopyrightFooter = () => {
  return <footer className={styles.footer}>{t.footer.copyright}</footer>;
};

export default CopyrightFooter;
