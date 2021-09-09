/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {RNTwilioPhone} from 'react-native-twilio-phone';
import TrackPlayer from 'react-native-track-player';
import messaging from '@react-native-firebase/messaging';

RNTwilioPhone.handleBackgroundState();
TrackPlayer.registerPlaybackService(() =>
  require('./src/services/trackplayer-service'),
);
TrackPlayer.registerPlaybackService(() => require('./tracks'));

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });
AppRegistry.registerComponent(appName, () => App);
