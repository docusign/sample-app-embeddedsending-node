import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../constants.js';
import AuthService from '../../services/authService.js';

const withAuth = WrappedComponent => {
  const AuthHOC = props => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
      AuthService.validateAccessToken();
    }, []);

    if (!isAuthenticated) {
      return <Navigate to={AppRoute.ROOT} />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
