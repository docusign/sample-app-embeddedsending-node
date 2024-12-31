import clsx from 'clsx/lite';
import { NavLink } from 'react-router-dom';
import styles from './MyButton.module.css';

const MyButton = ({
  variant,
  className,
  children,
  type = 'button',
  showLoading = false,
  href = null,
  to = null,
  ...otherProps
}) => {
  const variantClass = styles[variant] || styles.primary;

  const content = (
    <>
      {showLoading && (
        <span className={styles.spinner}>
          <span className={clsx('spinner-border', 'spinner-border-sm')} role="status" aria-hidden="true" />
        </span>
      )}
      {children}
    </>
  );
  const classes = clsx(styles.myButton, variantClass, showLoading && styles.myButtonLoading, className);

  if (href) {
    // According to HTML spec, we shouldn't nest buttons in anchors,
    // therefore we style <a/> as a button instead
    return (
      <a className={classes} href={href} {...otherProps}>
        {content}
      </a>
    );
  }

  if (to) {
    // Overload for a soft navigation
    return (
      <NavLink className={classes} to={to} {...otherProps}>
        {content}
      </NavLink>
    );
  }

  return (
    <button className={classes} type={type} {...otherProps}>
      {content}
    </button>
  );
};

export default MyButton;
