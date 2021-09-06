import {handleActions} from 'redux-actions';
import {INCOMING_MESSAGES, SET_MESSAGES} from './types';
const initialState = {};
const MessageReducers = handleActions(
  {
    [INCOMING_MESSAGES]: (state, action) => {
      if (state[action.friend_id]) {
        return {
          ...state,
          [action.friend_id]: [action.message, ...state[action.friend_id]],
        };
      }
      return {
        ...state,
        [action.friend_id]: [action.message],
      };
    },
    [SET_MESSAGES]: (state, action) => {
      return {
        ...state,
        [action.friend_id]: action.messages,
      };
    },
  },
  initialState,
);
export default MessageReducers;
