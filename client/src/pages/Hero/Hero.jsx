import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx/lite';
import Header from '../../components/Header/Header.jsx';
import CopyrightFooter from '../../components/CopyrightFooter/CopyrightFooter.jsx';
import MyButton from '../../components/MyButton/MyButton.jsx';
import t from '../../helpers/t.js';
import PopupLoginForm from '../../components/LoginForm/LoginForm.jsx';
import { openPopupWindow, closePopupWindow } from '../../store/actions';
import { AppRoute } from '../../constants.js';
import AuthService from '../../services/authService.js';
import styles from './Hero.module.css';

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPopupOpened = useSelector(state => state.loginPopup.isOpened);
  const [isTryButtonLoading, setTryButtonLoading] = useState(false);

  const handleTryButtonClick = async () => {
    // Sometimes it takes longer to check token's validity,
    // therefore show a spinner if the user waits too long
    const unobtrusiveLoadingTimeout = setTimeout(setTryButtonLoading, 100, true);
    if (await AuthService.validateAccessToken()) {
      navigate(AppRoute.DASHBOARD);
      return;
    }
    clearTimeout(unobtrusiveLoadingTimeout);
    setTryButtonLoading(false);

    togglePopup();
  };
  const togglePopup = async () => {
    dispatch(!isPopupOpened ? openPopupWindow() : closePopupWindow());
  };

  return (
    <div className={styles.hero}>
      <Header />
      <div className={clsx('container', styles.heroContent)}>
        <section className={styles.messageBox}>
          <h1 className={styles.header}>{t.hero.title}</h1>
          <p>{t.hero.paragraph}</p>
          <p><strong><em>{t.hero.authenticationList}</em></strong></p>
          <MyButton onClick={handleTryButtonClick} className={styles.ctaButton} showLoading={isTryButtonLoading}>
            {t.hero.tryButton}
          </MyButton>
          {isPopupOpened && <PopupLoginForm togglePopup={togglePopup} />}
        </section>
        <section className={styles.devAccountPanel} aria-labelledby="devAccountTitle">
          <div id="devAccountTitle" className={styles.devAccountTitleText}>
            {t.hero.devPanel.blurb}
          </div>
          <p>{t.hero.devPanel.subtitle}</p>
          <div className={styles.devAccountButtons}>
            <MyButton
              className={styles.devAccountButton}
              href={t.links.createsandbox}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.hero.devPanel.createDevAccount}
            </MyButton>
            <MyButton
              variant="secondary"
              className={styles.devAccountButton}
              href={t.links.learnmore}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.hero.devPanel.learnMore}
            </MyButton>
          </div>
        </section>
      </div>
      <CopyrightFooter />
    </div>
  );
};

export default Hero;
