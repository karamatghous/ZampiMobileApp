import { compose, withHandlers, withState, withPropsOnChange, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from 'lodash';
const axios = require('axios');

import SmsListScreenView from "./SmsListScreenView";

const mapStateToProps = state => ({
    stateAuth: state.auth,
    user: state.auth.user
});


const enhance = compose(
    connect(mapStateToProps),

    withState('channels', 'setChannels', null),
    withState('loading', 'setLoading', true),
    withState('internalLoader', 'setInternalLoader', { isLoading: false, message: '' }),

    withHandlers({
        onChannelPressed: ({ navigation }) => (channelProps, channelIndex) => {
            navigation.navigate('SmsScreen', { contactDetail: { phone: channelProps } })
        },
        componentDidFocus: ({ channels, setChannels, setLoading, setInternalLoader }) => (payload) => {
            if (!channels || (channels && Object.keys(channels).length == 0))
                setInternalLoader({ isLoading: true, message: 'Fetching Messages...' });
            setLoading(true);
            axios.get(`https://sms-2344.twil.io/fetch-sms?from="+14048566155"`).then((messagesResp) => {
                if (messagesResp && messagesResp.data && messagesResp.data.length > 0) {
                    var tchannels = {};
                    _.each(messagesResp.data, eachMessage => {
                        if (eachMessage.to) {
                            if (!tchannels[eachMessage.to])
                                tchannels[eachMessage.to] = [];
                            tchannels[eachMessage.to].push(eachMessage);
                        }
                    })
                    setChannels(tchannels);
                    setLoading(false);
                    if (!channels || (channels && Object.keys(channels).length == 0))
                        setInternalLoader(null);
                } else {
                    setChannels(null);
                    setLoading(false);
                    if (!channels || (channels && Object.keys(channels).length == 0))
                        setInternalLoader(null);
                }
            }).catch((err) => {
                setLoading(false);
                if (!channels || (channels && Object.keys(channels).length == 0))
                    setInternalLoader(null);
                showAlert('Something went wrong. Please try again!');
            })
        },
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

export default enhance(SmsListScreenView);