import { createActions } from 'redux-actions';
import types from '../types/types';

export const { setLoader} = createActions(
  types.SET_LOADER,
);

export default setLoader;