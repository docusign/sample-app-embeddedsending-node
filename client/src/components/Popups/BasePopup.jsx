import clsx from 'clsx/lite'
import t from '../../helpers/t';
import styles from './BasePopup.module.css';

const BasePopup = ({ onCloseClick, hideCloseButton, children, contentClassName = null }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.popupWindow}>
        {!hideCloseButton && (
          <button className={styles.close} onClick={onCloseClick} type="button" aria-label={t.buttons.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        )}

        <div className={clsx(styles.content, contentClassName)}>{children}</div>
      </div>
    </div>
  );
};

export default BasePopup;
