import clsx from 'clsx/lite';
import t from '../../../helpers/t';
import styles from './NoEnvelopesBanner.module.css';
import MyButton from '../../../components/MyButton/MyButton';
import { AppRoute } from '../../../constants';

const NoEnvelopesBanner = ({ className }) => {
  return (
    <div className={clsx(styles.noEnvelopesBanner, className)}>
      <p>{t.envelopes.emptyList}</p>
      <MyButton className={styles.ctaButton} to={AppRoute.CONTACTS}>
        {t.envelopes.goToContacts}
      </MyButton>
    </div>
  );
};

export default NoEnvelopesBanner;
