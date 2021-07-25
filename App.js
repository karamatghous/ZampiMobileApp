// required imports
import 'react-native-gesture-handler';// React native V5 requires it to be at the top
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context' //required for react native elements

//imports
import React from 'react';
import { Platform, View } from 'react-native';
import { Provider, connect } from "react-redux";
import { compose, lifecycle, withState, withHandlers } from "recompose";
import { PersistGate } from "redux-persist/es/integration/react";
import firebaseAuth from '@react-native-firebase/auth';
import { RNTwilioPhone, twilioPhoneEmitter } from 'react-native-twilio-phone';
import remoteConfig from '@react-native-firebase/remote-config';
import SplashScreen from 'react-native-splash-screen'
import Config from "react-native-config";
const axios = require('axios');
import _ from 'lodash';

import { store, persistor } from "./src/store/store";
import { SpinKitElement } from './src/components';
import setLoader from './src/reducers/loader/actions';
import { fetchAndUpdateFCMToken } from './src/notification/fcm';
import { appName, getBundleIdentifier } from './src/services/config';
import { userAccountStoreActions } from './src/reducers/auth/all-actions';
import { userAccountServiceActions } from './src/reducers/saga-actions/all-actions';
import { TwilioService } from './src/services/twilio-chat-service';

// screen imports
import { AnonymousNavigator } from './src/navigators/anonymousNavigator';
import DrawerNavigator from './src/navigators/drawerNavigator';
import { showAlert } from './src/components/ToastAlert';
import { useApp } from './src/screens/chat-list/app-context';

// Options passed to CallKeep (https://github.com/react-native-webrtc/react-native-callkeep#setup)
export const callKeepOptions = {
  ios: {
    appName: appName,
    supportsVideo: false,
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'OK',
    additionalPermissions: [],
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'com.example.reactnativetwiliophone',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
    },
  },
};

// Async function that returns Twilio access token
export async function fetchAccessToken() {
  console.log('fetchAccessToken called');
  if (!global.userEmailId)
    return showAlert('Email Missing');
  const identity = global.userEmailId;
  var phoneNumber = '7598198955'
  if (identity == 'nijaahnandhrv@digisenz.com')
    phoneNumber = '7598198955';
  else if (identity == 'gopim@digisenz.com')
    phoneNumber = '9195990852';
  else
    showAlert('Couldnt find email so fetching token with default number. Check fetchAccessToken method in app.js', null, 'top');

  const response = await fetch(
    `https://access-token-2848.twil.io/access-token?identity=${phoneNumber}`
  );
  const accessToken = await response.text();
  console.log('Twilio Voice Token==> ', accessToken, '\nTwilio Voice Response==> ', response);
  return accessToken;
}

// RNTwilioPhone options
export const twilioCallOptions = {
  requestPermissionsOnInit: true, // Default: true - Set to false if you want to request permissions manually
};

const getToken = (username) =>
  axios.get(`https://chat-access-token-1947.twil.io/access-token?identity=${username}`).then((twilioUser) => twilioUser.data);

const getUsers = (username) =>
  axios.get(`https://user-resource-8453.twil.io/users`).then((twilioUsers) => twilioUsers.data);

const createTwilioUser = (params) =>
  axios.get(`https://user-resource-8453.twil.io/create?params=${params}`).then((twilioUsers) => twilioUsers.data);

const updateUser = (params) =>
  axios.get(`https://user-resource-8453.twil.io/update?identity=${params.identity}&params=${JSON.stringify(params.params)}`).then((twilioUsers) => twilioUsers.data);

const App = (_state) => {
  var { user, loader } = _state;

  const { channels, updateChannels } = useApp();
  const channelPaginator = React.useRef();

  const setChannelEvents = React.useCallback(
    (client) => {
      client.on('messageAdded', (message) => {
        updateChannels((prevChannels) =>
          prevChannels.map((channel) =>
            channel.id === message.channel.sid ? { ...channel, lastMessageTime: message.dateCreated, lastMessage: message.type == 'text' ? message.body : 'Shared a media file' } : channel,
          ),
        );
      });
      return client;
    },
    [updateChannels],
  );

  const getSubscribedChannels = React.useCallback(
    (client) =>
      client.getSubscribedChannels().then((paginator) => {
        channelPaginator.current = paginator;
        const newChannels = TwilioService.getInstance().parseChannels(channelPaginator.current.items);
        updateChannels(newChannels);
      }),
    [updateChannels],
  );

  React.useEffect(() => {
    if (user) {
      getToken(user.email)
        .then((token) => TwilioService.getInstance().getChatClient(token))
        .then(() => TwilioService.getInstance().addTokenListener(getToken))
        .then(setChannelEvents)
        .then(getSubscribedChannels)
        .catch((err) => console.log({ message: err.message, type: 'danger' }))
        .finally(() => console.log(false));
    }

    return () => TwilioService.getInstance().clientShutdown();
  }, [user, setChannelEvents, getSubscribedChannels]);

  React.useEffect(() => {
    const subscriptions = [
      twilioPhoneEmitter.addListener('CallConnected', (data) => {
        showAlert('Call Ringing', 'long');
      }),
      twilioPhoneEmitter.addListener('CallConnected', (data) => {
        showAlert('Call Connected', 'long');
      }),
      twilioPhoneEmitter.addListener('CallDisconnected', (data) => {
        if (Platform.OS == 'ios')
          showAlert('Call Disconnected', 'long');
      }),
      twilioPhoneEmitter.addListener('CallDisconnectedError', (data) => {
        console.log(data);
      }),
    ];

    return () => {
      subscriptions.map((subscription) => {
        subscription.remove();
      });
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loader && loader.isLoading ? <SpinKitElement loader={loader || {}} /> : (null)}
      {user && user.id ?
        <DrawerNavigator />
        :
        <AnonymousNavigator />
      }
    </View >
  )
};

const mapStateToProps = state => ({
  user: state.auth ? state.auth.user : {},
  stateAuth: state.auth,
});

const enhance = compose(
  connect(mapStateToProps, { ...userAccountStoreActions, ...userAccountServiceActions, setLoader }),

  lifecycle({
    async componentDidMount() {
      var self = this;
      SplashScreen.hide();

      if (__DEV__) {
        await remoteConfig().setConfigSettings({
          isDeveloperModeEnabled: true,
        });
      }
      self.props.setLoader(null);

      var user = firebaseAuth().currentUser;

      if (!user) {
        return self.props.removeUser(null);
      }

      global.userEmailId = user.email;
      RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken, twilioCallOptions);
      RNTwilioPhone.initializeCallKeep(callKeepOptions, fetchAccessToken, twilioCallOptions);

      await self.props.getAccount({ userId: user.uid, background: true }, function (result) {
        fetchAndUpdateFCMToken(function (token) {
          var params = null;
          if (token && self.props.stateAuth && self.props.stateAuth.user) {
            params = { userId: self.props.stateAuth.user.id, background: true, data: { version: Config.APP_VERSION_NAME, buildNumber: Config.APP_VERSION_CODE } }
          };
          if (self.props.stateAuth && self.props.stateAuth.FCMToken != token) {
            params.data.notificationToken = token;
          }
          if (params) {
            self.props.updateAccount(params, function (result) {
              if (params.data.token)
                self.props.setFcmToken(params.data.token);
            }, function (error) {
              console.log(error);
            });
          }
        });

      }, function (error) {
        console.log(error);
        if (error && error.status && (error.status === 400 || error.status === 403 || error.status === 404))
          self.props.removeUser(null);
      });
    }
  })
);

var RootContainer = enhance(App);

export default class RootComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RootContainer />
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}