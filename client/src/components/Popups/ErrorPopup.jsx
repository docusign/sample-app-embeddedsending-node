import t from '../../helpers/t';
import BasePopup from './BasePopup';
import styles from './ErrorPopup.module.css';

const ErrorPopup = ({
  togglePopup,
  title = t.popups.errorPopup.title,
  message = t.popups.errorPopup.unexpectedError,
}) => {
  return (
    <BasePopup onCloseClick={togglePopup}>
      <h5>{title}</h5>
      <div className={styles.message}>{message}</div>
    </BasePopup>
  );
};

export default ErrorPopup;
