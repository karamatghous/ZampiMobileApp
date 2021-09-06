import {INCOMING_MESSAGES, SET_MESSAGES} from './types';

export const incomingMessages = (message, friend_id) => ({
  type: INCOMING_MESSAGES,
  message,
  friend_id,
});

export const setMessages = (messages, friend_id) => ({
  type: SET_MESSAGES,
  messages,
  friend_id,
});
