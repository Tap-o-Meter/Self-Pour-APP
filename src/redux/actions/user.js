import {USER_LOGIN, USER_LOGOUT } from './types';
export default {
  logIn: user => {
    return {
      type: USER_LOGIN,
      data: user,
    };
  },
  logOut: key => {
    return {
      type: USER_LOGOUT,
    };
  }
};
