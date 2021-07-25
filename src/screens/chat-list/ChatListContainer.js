import { compose, withHandlers, withState, withPropsOnChange, lifecycle } from "recompose";
import { connect } from "react-redux";
import _ from 'lodash';

import ChatListScreenView from "./ChatListScreenView";
import { TwilioService } from "../../services/twilio-chat-service";

const mapStateToProps = state => ({
    stateAuth: state.auth,
    user: state.auth.user
});

const enhance = compose(
    connect(mapStateToProps),

    withState('channels', 'updateChannels', []),

    withHandlers({
        onChannelPressed: ({ navigation, user, channels, updateChannels }) => (channelProps, channelIndex) => {
            const onAddChannel = (channel) => {
                const newChannel = TwilioService.getInstance().parseChannel(channel);
                global.channelId = newChannel.id;
                var foundIndex = _.findIndex(channels, eachChannel => eachChannel.id == newChannel.id)
                if (foundIndex >= 0) {
                    channels[foundIndex] = newChannel;
                    updateChannels(channels)
                } else
                    updateChannels(channels.push(newChannel));
            };
            var uniqueName = channelProps.name;

            TwilioService.getInstance()
                .getChatClient()
                .then((client) =>
                    client
                        .getChannelByUniqueName(uniqueName)
                        .then((channel) => (channel.channelState.status !== 'joined' ? channel.join() : channel))
                        .then(onAddChannel)
                        .catch(),
                )
                .then(() => {
                    navigation.navigate('ChatScreen', { name: uniqueName, identity: user.email, channelId: global.channelId })
                })
                .catch((err) => showAlert(err.message))
                .finally(() => console.log(false));
        }
    })
);

export default enhance(ChatListScreenView);