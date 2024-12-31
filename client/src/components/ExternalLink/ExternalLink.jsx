import clsx from 'clsx/lite';
import ExternalLinkIcon from './ExternalLinkIcon';
import styles from './ExternalLink.module.css';

const ExternalLink = ({ children, className, ...otherProps }) => {
  return (
    <a rel="noopener noreferrer" target="_blank" className={clsx(styles.link, className)} {...otherProps}>
      {children}
      <span className={styles.noWrapBetweenTextAndIcon}>
        &nbsp;
        <ExternalLinkIcon className={styles.icon} />
      </span>
    </a>
  );
};

export default ExternalLink;
