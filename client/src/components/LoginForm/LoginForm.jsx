import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx/lite';
import textContent from '../../assets/text.json';
import { LoginStatus, AppRoute } from '../../constants.js';
import { api } from '../../api';
import {
  authorizeUser,
  clearErrorTextInPopup,
  closeLoadingCircleInPopup,
  closePopupWindow,
  openLoadingCircleInPopup,
  showErrorTextInPopup,
} from '../../store/actions';
import createPrefixedLogger from '../../helpers/logger.js';
import DemoAccountInitializer from '../../services/demoAccountInitializer.js';
import BasePopup from '../Popups/BasePopup.jsx';
import Loader from '../Loader/Loader.jsx';
import t from '../../helpers/t.js';
import MyButton from '../MyButton/MyButton.jsx';
import styles from './LoginForm.module.css';

const logger = createPrefixedLogger('LoginForm');

const LoginForm = ({ togglePopup }) => {
  const [authType, setAuthType] = useState(LoginStatus.ACG);
  const isPopupLoading = useSelector(state => state.loginPopup.isLoading);
  const errorMessage = useSelector(state => state.loginPopup.errorMessage);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(openLoadingCircleInPopup());
    dispatch(clearErrorTextInPopup());

    try {
      if (authType === LoginStatus.JWT) {
        const { data: userInfo } = await api.jwt.login();
        dispatch(authorizeUser(authType, userInfo.name, userInfo.email));
        await DemoAccountInitializer.initializeAccount();
        navigate(AppRoute.DASHBOARD);
        dispatch(closePopupWindow());
        dispatch(closeLoadingCircleInPopup());
      }
      if (authType === LoginStatus.ACG) {
        api.acg.login();
      }
    } catch (error) {
      dispatch(closeLoadingCircleInPopup());
      dispatch(showErrorTextInPopup(error.message));
      logger.error(error);
    }
  };

  const handleChange = e => {
    const value = e.target.value;
    setAuthType(value);
  };

  if (isPopupLoading) {
    return (
      <BasePopup contentClassName={styles.loadingPopupContent} hideCloseButton>
        <Loader
          title={t.login.loading.title}
          paragraph={!isAuthenticated ? t.login.loading.signingIn : t.login.loading.setupAccount}
        />
      </BasePopup>
    );
  }

  return (
    <BasePopup onCloseClick={togglePopup}>
      <h5>{t.login.selectType}</h5>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.authVariants}>
          <label className={styles.label}>
            <input
              type="radio"
              name="Auth"
              value={LoginStatus.ACG}
              checked={authType === LoginStatus.ACG}
              onChange={handleChange}
              className={styles.radio}
            />
            <span>{textContent.login.acg}</span>
          </label>
          <label className={styles.label}>
            <input
              type="radio"
              name="Auth"
              value={LoginStatus.JWT}
              checked={authType === LoginStatus.JWT}
              onChange={handleChange}
              className={styles.radio}
            />
            {textContent.login.jwt}
          </label>
        </div>
        {!!errorMessage && <div className={clsx('alert', 'alert-danger', styles.errorAlert)}>{errorMessage}</div>}
        <div className={styles.formButtons}>
          <MyButton type="submit">{textContent.buttons.login}</MyButton>
          <MyButton variant="secondary" onClick={togglePopup}>
            {textContent.buttons.cancel}
          </MyButton>
        </div>
      </form>
    </BasePopup>
  );
};

export default LoginForm;
