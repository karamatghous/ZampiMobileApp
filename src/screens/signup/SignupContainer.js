import { compose, withHandlers, withState, withProps, hoistStatics, withPropsOnChange, lifecycle } from "recompose";
import Signup from "./SignupScreenView";
import firebase from '@react-native-firebase/app';
import { connect } from "react-redux";
import { userAccountServiceActions } from '../../reducers/saga-actions/all-actions';
import { userAccountStoreActions } from "../../reducers/auth/all-actions";
import setLoader from '../../reducers/loader/actions';
import { fetchAndUpdateFCMToken } from '../../notification/fcm';
import { Keyboard, Platform } from 'react-native';
import { strings } from '../../utils/strings';
import { WEBSITE, getDynamicLink, getBundleIdentifier } from "../../services/config";
import Config from "react-native-config";
import { showAlert } from "../../components/ToastAlert";

const mapStateToProps = state => ({
  loader: state.loader || {}
});



const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const enhance = compose(
  connect(mapStateToProps, { ...userAccountStoreActions, ...userAccountServiceActions, setLoader }),
  withState("email", "setEmail", ''),
  withState("password", "setPassword", ""),
  withState("firstName", "setFirstName", ''),
  withState("lastName", "setLastName", ''),
  withState("errorMessage", "setErrorMessage", null),
  withState("confirmPassword", "setConfirmPassword", ""),
  withState('viewPaddingBottom', 'setViewPaddingBottom', 0),
  withState('showPassword', 'setShowPassword', false),
  withHandlers({
    updateAccountWithFCMToken: ({ updateAccount }) => credentials => {
      // fetch and send token to server
      fetchAndUpdateFCMToken(function (token) {
        if (token)
          updateAccount({ userId: credentials.id, background: true, data: { notificationToken: token, version: Config.APP_VERSION_NAME, buildNumber: Config.APP_VERSION_CODE } },
            function (result) {
            },
            function (error) {
              console.log(error);
            });
      });
    }
  }),
  withHandlers({
    onSignupPress: ({
      email,
      lastName,
      firstName,
      password,
      setErrorMessage,
      facebookResult,
      setLoader,
      createAccount,
      updateAccountWithFCMToken,
      submitLog
    }) => async () => {
      if (!firstName || firstName.length < 0) {
        return setErrorMessage({ message: strings['Signup_FirstNameValidation'] });
      }
      if (!lastName || lastName.length < 0) {
        return setErrorMessage({ message: strings['Signup_LastNameValidation'] });
      }
      if (!email || email.length < 0) {
        return setErrorMessage({ message: strings['Signup_EmailValidation'] });
      }
      if (emailPattern.test(email) === false) {
        return setErrorMessage({ message: strings['Signup_ValidEmailValidation'] });
      }
      var strongRegex = new RegExp(strings['Signup_VaildPasswordRegexValidation']);
      if (!strongRegex.test(password)) {
        return setErrorMessage({ message: strings['Signup_PasswordValidation'] });
      }
      setErrorMessage(null);

      let userInfo = { fname: firstName.trim(), lname: lastName.trim(), email: email, password: password };

      // save user info temporarily to recieve on state changed event on app.js
      global.userInfo = userInfo;
      var data = global.userInfo;
      // data.tos = { url: strings['TNC_TermsConditionsURL'], version: strings['TNC_TermsConditionsVersion'], acceptedDate: +new Date() }
      setLoader({ isLoading: true, message: strings['LoaderCreatingAccount'] });
      await firebase.auth.createUserWithEmailAndPassword(email, password).then(function (credentials) {
        createAccount({
          userId: credentials.user.uid,
          data: data,
          isNewUser: credentials.additionalUserInfo.isNewUser,
        }, function (result) {
          setLoader(null);
          updateAccountWithFCMToken(result)
          var currentUser = firebase.auth().currentUser;
          var actionCodeSettings = {
            url: WEBSITE + '/links?verifyEmail=true',
            iOS: {
              bundleId: getBundleIdentifier(),
              setFallbackUrl: strings['UpdateMessage_APPSTOREURL']
            },
            android: {
              packageName: getBundleIdentifier(),
              installApp: false,
              minimumVersion: '1'
            },
            handleCodeInApp: false,
            dynamicLinkDomain: getDynamicLink()
          };
          currentUser.sendEmailVerification(actionCodeSettings).then(function () {
            console.log('email sent');
          }, function (error) {
            console.log('email not sent ' + error);
          });
        }, function (error) {
          setLoader(null);
          setErrorMessage(error);
        });
      }, function (err) {
        if (err) {
          setLoader(null);
          setErrorMessage(err);
        }
      });
    },
    onSetEmail: ({ setEmail }) => text => setEmail(text),
    onSetFirstName: ({ setFirstName }) => text => setFirstName(text),
    onSetLastName: ({ setLastName }) => text => setLastName(text),
    onSetPassword: ({ setPassword }) => text => {
      setPassword(text);
      showAlert(strings['Signup_PasswordValidation'], 'short', 'top');
    }
  }),
  withPropsOnChange(["email"], ({ email }) => ({
    isValidEmail:
      !!email && email.length > 0 && emailPattern.test(email) === true
  })),
  withPropsOnChange(["password"], ({ password }) => ({
    isValidPassword: !!password && password.length > 7
  })),

  // lifecycle({
  //   componentDidMount() {
  //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { Platform.OS == 'android' ? this.props.setViewPaddingBottom(360) : this.props.setViewPaddingBottom(320) });
  //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { this.props.setViewPaddingBottom(0) });
  //   },
    // componentWillUnmount() {
    //   this.keyboardDidShowListener.remove();
    //   this.keyboardDidHideListener.remove();
    // }
  // })
);

export default hoistStatics(enhance)(Signup);
