import { handleActions } from 'redux-actions';
import types from '../types/types';
import _ from 'lodash';

const initialState = {
  user: {},
  signInFailureAttempts: {},
  FCMToken: {},
};

const authReducer = handleActions({
  [types.SET_USER]: (state, { payload }) => {
    if (state && state.user && _.isEqual(state.user, payload))
      return state;
    else
      return { ...state, user: payload };
  },
  [types.REMOVE_USER]: state => ({ ...state, user: null, FCMToken: {} }),
  [types.SET_FCM_TOKEN]: (state, { payload }) => {
    return { ...state, FCMToken: payload }
  },
  [types.SET_SIGN_IN_FAILURE_ATTEMPTS]: (state, { payload }) => {
    var signInFailureAttempts = state.signInFailureAttempts || {};
    if (payload) {
      signInFailureAttempts[payload] ? signInFailureAttempts[payload] = { count: ++signInFailureAttempts[payload].count, time: new Date().getTime() } : signInFailureAttempts[payload] = { count: 1, time: new Date().getTime() }
    } else {
      signInFailureAttempts = {}
    }
    return { ...state, signInFailureAttempts: signInFailureAttempts }
  }
}, initialState);

export default authReducer;
