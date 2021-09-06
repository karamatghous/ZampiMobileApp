import {
  compose,
  withHandlers,
  withState,
  withPropsOnChange,
  lifecycle,
} from 'recompose';
import {connect} from 'react-redux';
import RNCallKeep from 'react-native-callkeep';
import {RNTwilioPhone} from 'react-native-twilio-phone';

import {showAlert} from '../../components/ToastAlert';
import PhoneScreenView from './PhoneScreenView';
import {Platform} from 'react-native';
import {appName} from '../../services/config';
const mapStateToProps = state => ({
  stateAuth: state.auth,
  user: state.auth.user,
});

const enhance = compose(
  connect(mapStateToProps),

  withState('number', 'setNumber', ''),
  withState('isCallActive', 'setIsCallActive', false),

  withHandlers({
    onNumberPressed:
      ({number, setNumber}) =>
      inputNumber => {
        number = `${number}` + `${inputNumber}`;
        setNumber(number);
      },
    onNumberLongPressed:
      ({number, setNumber}) =>
      inputNumber => {
        if (inputNumber == 0) {
          number = `${number}` + `+`;
          setNumber(number);
        }
      },
    onDeleteButton:
      ({number, setNumber}) =>
      () => {
        number = number.slice(0, number.length - 1);
        setNumber(number);
      },
    onMessagePressed:
      ({number, navigation}) =>
      async () => {
        if (number.length == 0) return showAlert('Enter number');
        navigation.navigate('SmsScreen', {
          contactDetail: {phone: number, valid: 'from phone'},
        });
      },
    componentDidFocus:
      ({setIsCallActive}) =>
      async () => {
        if (Platform.OS == 'ios') {
          var activeCalls = await RNCallKeep.checkIfBusy();
          if (activeCalls) setIsCallActive(true);
        }
      },
  }),

  lifecycle({
    componentDidMount() {
      var self = this;
      self.subs = [
        self.props.navigation.addListener('focus', payload =>
          self.props.componentDidFocus(payload),
        ),
      ];
    },
    componentWillUnmount() {
      this.subs &&
        this.subs.length >
          this.subs.forEach(sub => sub && sub.remove && sub.remove());
    },
  }),
);
export default enhance(PhoneScreenView);
// import {
//   compose,
//   withHandlers,
//   withState,
//   withPropsOnChange,
//   lifecycle,
// } from 'recompose';
// import {connect} from 'react-redux';
// import RNCallKeep from 'react-native-callkeep';
// import {RNTwilioPhone} from 'react-native-twilio-phone';

// import {showAlert} from '../../components/ToastAlert';
// import PhoneScreenView from './PhoneScreenView';
// import {fetchAccessToken} from '../../../App';
// import {Platform,LogBox} from 'react-native';
// LogBox.ignoreAllLogs();


// const mapStateToProps = state => ({
//   stateAuth: state.auth,
//   user: state.auth.user,
// });

// const enhance = compose(
//   connect(mapStateToProps),

//   withState('number', 'setNumber', ''),
//   withState('isCallActive', 'setIsCallActive', false),

//   withHandlers({
//     onNumberPressed:
//       ({number, setNumber}) =>
//       inputNumber => {
//         number = `${number}` + `${inputNumber}`;
//         setNumber(number);
//       },
//     onNumberLongPressed:
//       ({number, setNumber}) =>
//       inputNumber => {
//         if (inputNumber == 0) {
//           number = `${number}` + `+`;
//           setNumber(number);
//         }
//       },
//     onDeleteButton:
//       ({number, setNumber}) =>
//       () => {
//         number = number.slice(0, number.length - 1);
//         setNumber(number);
//       },
//     onCallPressed:
//       ({number, isCallActive, setIsCallActive}) =>
//       async () => {
//         console.log(number, 'check for number');
//         if (number.length == 0) return showAlert('Enter number');
//         if (Platform.OS == 'ios') {
//           var activeCalls = await RNCallKeep.checkIfBusy();
//           if (isCallActive || activeCalls) {
//             setIsCallActive(false);
//             return await RNCallKeep.endAllCalls();
//           }
//         }
//       //  await fetchAccessToken();
//          RNTwilioPhone.startCall(number);
//         setIsCallActive(true);
//         console.log('startCall');
//         showAlert('Call Connecting...', 'long');
//       },
//     onMessagePressed:
//       ({number, navigation}) =>
//       async () => {
//         if (number.length == 0) return showAlert('Enter number');
//         navigation.navigate('SmsScreen', {
//           contactDetail: {phone: number, valid: 'from phone'},
//         });
//       },
//     componentDidFocus:
//       ({setIsCallActive}) =>
//       async () => {
//         // var activeCalls = await RNCallKeep.checkIfBusy();
//         // if (activeCalls) setIsCallActive(true);
//       },
//   }),

//   lifecycle({
//     componentDidMount() {
//       var self = this;
//       self.subs = [
//         self.props.navigation.addListener('focus', payload =>
//           self.props.componentDidFocus(payload),
//         ),
//       ];
//     },
//     componentWillUnmount() {
//       this.subs &&
//         this.subs.length >
//           this.subs.forEach(sub => sub && sub.remove && sub.remove());
//     },
//   }),
// );

// export default enhance(PhoneScreenView);
