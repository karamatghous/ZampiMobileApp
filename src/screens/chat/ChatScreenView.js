import React, { useState, useCallback, useRef, useEffect } from 'react'
import { View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Modal, Platform } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat'
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { ActionBar, CustomText } from "../../components";
import { showAlert } from '../../components/ToastAlert';
import { TwilioService } from '../../services/twilio-chat-service';
import { colors } from '../../styles';

const ChatScreenView = props => {
    const {
        navigation,
        user,
        route,
        onTitlePressed,
        uploadImage,
        onSettingPressed,
        modalVisible,
        setModalVisible,
        onDeleteChat
    } = props;

    const { channelId, identity } = route.params;
    const [messages, setMessages] = useState([]);
    const chatClientChannel = useRef();
    const chatMessagesPaginator = useRef();

    const setChannelEvents = useCallback((channel) => {
        chatClientChannel.current = channel;
        chatClientChannel.current.on('messageAdded', (message) => {
            const newMessage = TwilioService.getInstance().parseMessage(message);
            const { giftedId } = message.attributes;
            if (giftedId) {
                setMessages((prevMessages) => prevMessages.map((m) => (m._id === giftedId ? newMessage : m)));
            } else {
                setMessages((prevMessages) => [newMessage, ...prevMessages]);
            }
        });
        return chatClientChannel.current;
    }, []);

    useEffect(() => {
        TwilioService.getInstance()
            .getChatClient()
            .then((client) => client.getChannelBySid(channelId))
            .then((channel) => setChannelEvents(channel))
            .then((currentChannel) => currentChannel.getMessages())
            .then((paginator) => {
                chatMessagesPaginator.current = paginator;
                const newMessages = TwilioService.getInstance().parseMessages(paginator.items);
                setMessages(newMessages);
            })
            .catch((err) => showAlert(err.message))
    }, [channelId, setChannelEvents]);

    const onSend = useCallback((newMessages = []) => {
        const attributes = { giftedId: newMessages[0]._id };
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
        if (chatClientChannel && chatClientChannel.current)
            chatClientChannel.current.sendMessage(newMessages[0].text, attributes);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle='dark-content' backgroundColor={'white'} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TouchableOpacity style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                    <Ionicons
                        name={"arrow-back"}
                        size={28}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', height: 50, width: Dimensions.get('screen').width - 100, marginHorizontal: 50, alignItems: 'center', justifyContent: 'center' }}
                    onPress={onTitlePressed}>
                    <CustomText
                        header
                        style={{ fontWeight: 'bold' }}
                        displayText={route && route.params.name && route.params.name ? route.params.name : ''}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}
                    onPress={onSettingPressed}>
                    <Ionicons
                        name={"ellipsis-vertical-outline"}
                        size={28}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ height: 1, backgroundColor: colors.grey }} />
            <GiftedChat
                isTyping={true}
                showAvatarForEveryMessage={true}
                messagesContainerStyle={{}}
                messages={messages}
                renderAvatarOnTop
                onSend={(messages) => onSend(messages)}
                user={{ _id: identity, name: user.fname, avatar: user.image }}
                renderActions={() => (
                    <Feather
                        style={{ padding: 10, paddingBottom: 0 }}
                        onPress={uploadImage}
                        name='image'
                        size={30}
                        color='#000'
                    />
                )}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ marginTop: Platform.OS == 'ios' ? 20 : 0, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ height: 50, width: 160, backgroundColor: colors.grey, justifyContent: 'center', alignItems: 'center' }}
                        onPress={onDeleteChat}>
                        <CustomText
                            subHeader
                            style={{ fontWeight: '600' }}
                            displayText={'Delete Chat'}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
};

export default ChatScreenView;