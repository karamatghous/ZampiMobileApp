import { compose, withHandlers, withState, withPropsOnChange, lifecycle } from "recompose";
import { connect } from "react-redux";
import RNCallKeep from 'react-native-callkeep';
import { RNTwilioPhone } from 'react-native-twilio-phone';


import { showAlert } from "../../components/ToastAlert";
import PhoneScreenView from "./PhoneScreenView";

const mapStateToProps = state => ({
    stateAuth: state.auth,
    user: state.auth.user
});

const enhance = compose(
    connect(mapStateToProps),

    withState("number", "setNumber", ''),
    withState('isCallActive', 'setIsCallActive', false),

    withHandlers({
        onNumberPressed: ({ number, setNumber }) => (inputNumber) => {
            number = `${number}` + `${inputNumber}`;
            setNumber(number);
        },
        onNumberLongPressed: ({ number, setNumber }) => (inputNumber) => {
            if (inputNumber == 0) {
                number = `${number}` + `+`;
                setNumber(number);
            }
        },
        onDeleteButton: ({ number, setNumber }) => () => {
            number = number.slice(0, (number.length - 1));
            setNumber(number);
        },
        onCallPressed: ({ number, isCallActive, setIsCallActive }) => async () => {
            if (number.length == 0)
                return showAlert('Enter number');
            var activeCalls = await RNCallKeep.checkIfBusy();
            if (isCallActive || activeCalls) {
                setIsCallActive(false);
                return await RNCallKeep.endAllCalls();
            }
            await RNTwilioPhone.startCall(number);
            setIsCallActive(true);
            showAlert('Call Connecting...', 'long');
        },
        onMessagePressed: ({ number, navigation }) => async () => {
            if (number.length == 0)
                return showAlert('Enter number');
            navigation.navigate('SmsScreen', { contactDetail: { phone: number } });
        },
        componentDidFocus: ({ setIsCallActive }) => async () => {
            var activeCalls = await RNCallKeep.checkIfBusy();
            if (activeCalls)
                setIsCallActive(true);
        }
    }),

    lifecycle({
        componentDidMount() {
            var self = this;
            self.subs = [
                self.props.navigation.addListener('focus', (payload) => self.props.componentDidFocus(payload)),
            ];
        },
        componentWillUnmount() {
            this.subs && this.subs.length > this.subs.forEach(sub => sub && sub.remove && sub.remove());
        }
    })
);

export default enhance(PhoneScreenView);
