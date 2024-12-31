import clsx from 'clsx/lite';
import styles from './BaseTable.module.css';

const BaseTable = ({ className, children }) => {
  return (
    <div className={clsx(styles.scrollableWrapper, className)}>
      <table className={styles.table}>{children}</table>
    </div>
  );
};

export default BaseTable;
