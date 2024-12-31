import { api } from '../api';
import { LoginStatus } from '../constants';
import createPrefixedLogger from '../helpers/logger';
import { store } from '../store/store';

const logger = createPrefixedLogger('AuthService');

export default class AuthService {
  static async validateAccessToken() {
    const reduxState = store.getState();
    const authType = reduxState.auth.authType;
    if (!authType) {
      // Empty store means no previous login attempts
      return false;
    }

    try {
      if (authType === LoginStatus.ACG) {
        const isLoggedIn = await api.acg.loginStatus();
        if (!isLoggedIn) {
          // Our access token has been expired
          await api.acg.logout();
          return false;
        }
        return true;
      }
      if (authType === LoginStatus.JWT) {
        const isLoggedIn = await api.jwt.loginStatus();
        if (!isLoggedIn) {
          // Our access token has been expired
          await api.jwt.login();
          return true;
        }
        return true;
      }
      throw new Error('Unexpected authType value in the store.');
    } catch (e) {
      logger.error('Unexpected error while checking login status.', e);
      return false;
    }
  }

  static async logOut() {
    const reduxState = store.getState();
    const authType = reduxState.auth.authType;
    if (!authType) {
      // Not logged in, ignore the call
      return;
    }

    try {
      if (authType === LoginStatus.ACG) {
        await api.acg.logout();
        return;
      }
      if (authType === LoginStatus.JWT) {
        await api.jwt.logout();
        return;
      }
      throw new Error('Unexpected authType value in the store.');
    } catch (e) {
      logger.error('Unexpected error while logging out.', e);
    }
  }
}
