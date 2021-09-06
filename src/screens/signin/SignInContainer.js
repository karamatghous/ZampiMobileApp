import { compose, withHandlers, withState, withPropsOnChange, lifecycle } from "recompose";
import { connect } from "react-redux";
import auth from '@react-native-firebase/auth';
import { Keyboard } from 'react-native';
import Config from "react-native-config";
import { RNTwilioPhone } from 'react-native-twilio-phone';

import { userAccountServiceActions } from '../../reducers/saga-actions/all-actions';
import { userAccountStoreActions } from "../../reducers/auth/all-actions";
import setLoader from '../../reducers/loader/actions';
import { strings } from '../../utils/strings';
import { fetchAndUpdateFCMToken } from "../../notification/fcm";

import SignInScreenView from "./SignInScreenView";
import { appName } from "../../services/config";
import { callKeepOptions, fetchAccessToken, twilioCallOptions } from "../../../App";
import { showAlert } from "../../components/ToastAlert";

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// const callKeepOptions = {
//   ios: {
//     appName: appName,
//     supportsVideo: false,
//   },
//   android: {
//     alertTitle: 'Permissions required',
//     alertDescription: 'This application needs to access your phone accounts',
//     cancelButton: 'Cancel',
//     okButton: 'OK',
//     additionalPermissions: [],
//     // Required to get audio in background when using Android 11
//     foregroundService: {
//       channelId: 'com.example.reactnativetwiliophone',
//       channelName: 'Foreground service for my app',
//       notificationTitle: 'My app is running on background',
//     },
//   },
// };



RNTwilioPhone 
const options = {
  requestPermissionsOnInit: true, // Default: true - Set to false if you want to request permissions manually
};


const mapStateToProps = state => ({
    stateAuth: state.auth,
    loader: state.loader || {}
});

const enhance = compose(
    connect(mapStateToProps, { ...userAccountStoreActions, ...userAccountServiceActions, setLoader }),

    withState("email", "setEmail", ""),
    withState("password", "setPassword", ""),
    withState("errorMessage", "setErrorMessage", null),
    withState('viewPaddingBottom', 'setViewPaddingBottom', 0),
    withState('viewPaddingTop', 'setViewPaddingTop', 10),
    withState('showPassword', 'setShowPassword', false),

    withHandlers({
        onLoginPress: ({ email, password, setLoader, getAccount, updateAccount, setSignInFailureAttempts, stateAuth, navigation }) => async () => {
            if (!stateAuth.signInFailureAttempts[email] || new Date().getTime() - stateAuth.signInFailureAttempts[email].time >= strings['SignIn_MaximumFailureTimeLimit'] || stateAuth.signInFailureAttempts[email].count < strings['SignIn_MaximumFailureAttemptsCount']) {
                setLoader({ isLoading: true, message: strings['Loader_Sign_In'] });
                await auth().signInWithEmailAndPassword(email, password).then(function (credentials) {
                    var user = credentials.user;
                    setSignInFailureAttempts();
                    getAccount({ userId: user.uid, data: global.userInfo, isNewUser: credentials.additionalUserInfo.isNewUser }, function (result) {
                        global.userEmailId = result.email;
                       RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken, options);
                       RNTwilioPhone.initializeCallKeep(callKeepOptions, fetchAccessToken, options);
                        // fetch and send token to server
                        fetchAndUpdateFCMToken(function (token) {
                            if (token)
                                updateAccount({ userId: result.id, background: true, data: { notificationToken: token, version: Config.APP_VERSION_NAME, buildNumber: Config.APP_VERSION_CODE } }, function (result) { }, function (error) { console.log(error); });
                        });
                        setLoader(null);
                    }, function (error) {
                        setLoader(null);
                        showAlert(error);
                    });
                }, function (err) {
                    if (err) {
                        setLoader(null);
                        showAlert(err.message);
                        var errorCode = err.code;
                        if (errorCode == 'auth/wrong-password') {
                            setSignInFailureAttempts(email)
                        }
                    }
                });
            } else {
                showAlert(strings['SignIn_MaximumFailureAttempts'])
            }
        },

        onCreateAccountPress: ({ navigation }) => () => {
            navigation.navigate("SignUpScreen");
        },
        onForgotPasswordPress: ({ navigation }) => () => {
            navigation.navigate("ForgotPassword", {});
        },
        onSetEmail: ({ setEmail }) => text => setEmail(text.trim()),
        onSetPassword: ({ setPassword }) => text => setPassword(text),
    }),
    withPropsOnChange(["email"], ({ email }) => ({
        isValidEmail: !!email && email.length > 0 && emailPattern.test(email) === true
    })),
    withPropsOnChange(["password"], ({ password }) => ({
        isValidPassword: !!password && password.length > 5
    })),
    lifecycle({
        async componentDidMount() {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { this.props.setViewPaddingBottom(300); this.props.setViewPaddingTop(80); });
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { this.props.setViewPaddingBottom(0); this.props.setViewPaddingTop(10); });
        },
        componentWillUnmount() {
            if (this.keyboardDidShowListener)
                this.keyboardDidShowListener.remove();
            if (this.keyboardDidHideListener)
                this.keyboardDidHideListener.remove();
        }
    })
);

export default enhance(SignInScreenView);
