import { compose, withHandlers, withState, withPropsOnChange, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Alert } from "react-native";
const axios = require('axios');

import SmsScreenView from "./SmsScreenView";
import { showAlert } from "../../components/ToastAlert";
import { appName } from "../../services/config";
import _ from "lodash";

const mapStateToProps = state => ({
    user: state.auth.user
});

const enhance = compose(
    connect(mapStateToProps),

    withState('modalVisible', 'setModalVisible', false),
    withState('messages', 'setMessages', []),

    withHandlers({
        onSettingPressed: ({ modalVisible, setModalVisible }) => () => {
            setModalVisible(!modalVisible);
        },
        onDeleteChat: ({ modalVisible, setModalVisible, route, navigation }) => () => {
            const { channelId } = route.params;

            if (!channelId)
                return showAlert('Channel Id Missing');

            setModalVisible(!modalVisible);
            Alert.alert(appName, 'Deleting the chat will delete for all members of the group. Are you sure you want to delete?', [
                {
                    text: 'NO', onPress: () => console.log('Cancel Pressed'),
                },
                {
                    text: 'YES', onPress: () => {
                        // deleteChannel(channelId);
                        navigation.goBack();
                    }
                },
            ],
                { cancelable: false })
        },    
        // onSendSMS: ({ messages, setMessages, route, user }) => (newMessages) => {
        //     console.log(newMessages,"new messages");
        //     axios.get(`https://sms-2344.twil.io/send?body=${newMessages[0].text}&to=${route.params.contactDetail.phone}`).then((postMessageResp) => {
                
        //         var data = postMessageResp.data;
        //         data.createdAt = data.dateCreated;
        //         data.text = data.body;
        //         if (!data.user)
        //             data.user = {};
        //         data.user._id = data.from ? data.from : '+14048566155';
        //         data.user.avatar = user.image;
        //         var tMessages = _.clone(messages);
        //         tMessages.unshift(data)
        //         setMessages(tMessages);
        //     }, err => {
        //         console.log(err);
        //     });
        // }

    
    }),

    lifecycle({
        componentDidMount() {
            var self = this;
            axios.get(`https://sms-2344.twil.io/fetch-sms?to="${self.props.route.params.contactDetail.phone}"`).then((messagesResp) => {
                if (messagesResp && messagesResp.data && messagesResp.data.length > 0) {
                    var messages = _.each(messagesResp.data, eachMessage => {
                        eachMessage.createdAt = eachMessage.dateCreated;
                        eachMessage.text = eachMessage.body;
                        if (!eachMessage.user)
                            eachMessage.user = {};
                        eachMessage.user._id = self.props.route.params.contactDetail.phone == eachMessage.from ? eachMessage.to : eachMessage.from;
                        eachMessage.user.avatar = self.props.route.params.contactDetail.phone == eachMessage.from ? self.props.route.params.contactDetail.profile : self.props.user.image;
                    })
                    self.props.setMessages(messages);
                } else
                    self.props.setMessages([]);
            }).catch((err) => {
                showAlert('Something went wrong. Please try again!');
            })
        }
    })
);

export default enhance(SmsScreenView);