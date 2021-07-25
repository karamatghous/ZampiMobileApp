import { createActions } from 'redux-actions';
import types from '../types/types';

export const { setUser, removeUser, setFcmToken, setSignInFailureAttempts } = createActions(
  types.SET_USER,
  types.REMOVE_USER,
  types.SET_FCM_TOKEN,
  types.SET_SIGN_IN_FAILURE_ATTEMPTS,
);

export default { setUser, removeUser, setFcmToken, setSignInFailureAttempts };