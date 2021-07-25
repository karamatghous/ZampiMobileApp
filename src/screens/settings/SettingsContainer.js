import {
  compose,
  hoistStatics,
  withHandlers,
  lifecycle,
  withState
} from "recompose";
import { connect } from "react-redux";
import SettingsScreenView from "./SettingsScreenView";
import firebase from '@react-native-firebase/app';
import { userAccountStoreActions } from "../../reducers/auth/all-actions";
import { userAccountServiceActions } from '../../reducers/saga-actions/all-actions';
import { FAQ_URL, CONTACT_US_URL, appName } from "../../services/config";
import { strings } from "../../utils/strings";
import { Alert } from 'react-native';
import setLoader from '../../reducers/loader/actions';
import { RNTwilioPhone } from 'react-native-twilio-phone';

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  loader: state.loader || {},
});

const enhance = compose(
  connect(mapStateToProps, { ...userAccountStoreActions, ...userAccountServiceActions, setLoader }),

  withState('isNotificationCollapsed', 'setIsNotificationCollapsed', true),
  withState('notificationList', 'setNotificationList', [{ name: 'New Contact', isEnabled: false }, { name: 'Purchaeses', isEnabled: false }, { name: 'Form Submission', isEnabled: false }, { name: 'SMS Message', isEnabled: false }]),

  withHandlers({
    onNotificationPressed: ({ isNotificationCollapsed, setIsNotificationCollapsed }) => () => {
      setIsNotificationCollapsed(!isNotificationCollapsed);
    },
    onChangeValue: ({ notificationList, setNotificationList }) => (item, index) => {
      notificationList[index].isEnabled = !notificationList[index].isEnabled;
      setNotificationList(notificationList);
    },
    onLogout: ({ logOutUser, user, auth, removeUser }) => async (event) => {
      Alert.alert(appName, strings['Settings_LogoutAlert'], [
        {
          text: 'NO', onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'YES', onPress: async () => {
            firebase.auth().signOut().then(async () => {
              removeUser(null);
            }).catch(async (error) => {
              removeUser(null);
            });
            await RNTwilioPhone.unregister();
          }
        },
      ],
        { cancelable: false }
      );
    }
  }),
  lifecycle({
    componentDidMount() {
      var self = this;
    }
  })
);

export default hoistStatics(enhance)(SettingsScreenView);
