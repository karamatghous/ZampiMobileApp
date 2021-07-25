import { compose, withHandlers, withState, withPropsOnChange, lifecycle } from "recompose";
import { connect } from "react-redux";
import { Alert } from "react-native";

import ChatScreenView from "./ChatScreenView";
import { showAlert } from "../../components/ToastAlert";
import { appName } from "../../services/config";

const mapStateToProps = state => ({
    user: state.auth.user
});

const deleteChannel = (channelId) =>
    axios.get(`https://channel-7954.twil.io/delete?channelId=${channelId}`).then((delteResp) => delteResp);

const enhance = compose(
    connect(mapStateToProps),

    withState('modalVisible', 'setModalVisible', false),

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
        }
    })
);

export default enhance(ChatScreenView);