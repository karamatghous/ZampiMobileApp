import { handleActions } from 'redux-actions';
import types from '../types/types';

const initialState = {
  isLoading: false,
  message: ''
};

const loaderReducer = handleActions({
  [types.SET_LOADER]: (state, { payload }) => {
    return {
    ...state,
    isLoading: payload ? payload.isLoading || false : false,
    message: payload ? payload.message || '' : ''
  }
}
}, initialState);

export default loaderReducer;
