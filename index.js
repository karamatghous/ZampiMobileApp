/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { RNTwilioPhone } from 'react-native-twilio-phone';
import TrackPlayer from 'react-native-track-player';

RNTwilioPhone.handleBackgroundState();
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./src/services/trackplayer-service'));