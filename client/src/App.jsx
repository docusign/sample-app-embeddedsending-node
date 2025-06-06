import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Hero from './pages/Hero/Hero.jsx';
import { LoginStatus, AppRoute, AppRouteFactory } from './constants.js';
import { api } from './api';
import {
  authorizeUser,
  closeLoadingCircleInPopup,
  closePopupWindow,
  openLoadingCircleInPopup,
  openPopupWindow,
  showErrorTextInPopup,
} from './store/actions';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Templates from './pages/Templates/Templates.jsx';
import Contacts from './pages/Contacts/Contacts.jsx';
import ContactForm from './pages/ContactForm/ContactForm.jsx';
import DemoAccountInitializer from './services/demoAccountInitializer.js';
import createPrefixedLogger from './helpers/logger.js';
import Navigator from './pages/Navigator/Navigator.jsx';

const logger = createPrefixedLogger('App');

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  useEffect(() => {
    const handleACGAuthCallbackUrl = async () => {
      if (!code || code?.length <= 0) return;

      dispatch(openPopupWindow());
      dispatch(openLoadingCircleInPopup());

      try {
        const { data: userInfo } = await api.acg.callbackExecute(code);
        dispatch(authorizeUser(LoginStatus.ACG, userInfo.name, userInfo.email));
        await DemoAccountInitializer.initializeAccount();
        navigate(AppRoute.DASHBOARD);

        dispatch(closePopupWindow());
        dispatch(closeLoadingCircleInPopup());
      } catch (e) {
        logger.error('Unexpected error during ACG login', e);
        dispatch(showErrorTextInPopup(e.message));
        dispatch(closeLoadingCircleInPopup());
      }
    };

    handleACGAuthCallbackUrl();
  }, [code, dispatch, navigate]);

  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Hero />} />
      <Route path={AppRoute.DASHBOARD} element={<Dashboard />} />
      <Route path={AppRoute.TEMPLATES} element={<Templates />} />
      <Route path={AppRoute.CONTACTS} element={<Contacts />} />
      <Route path={AppRoute.ADD_CONTACT} element={<ContactForm />} />
      <Route path={AppRouteFactory.createEditContact(':contactId')} element={<ContactForm />} />
      <Route path={AppRoute.NAVIGATOR} element={<Navigator />} />
    </Routes>
  );
}

export default App;
