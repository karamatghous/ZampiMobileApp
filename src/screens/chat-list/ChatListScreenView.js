import React from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from "react-native";
import { Avatar, Input } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
const axios = require('axios');
import moment from "moment";

import colors from "../../styles/colors";
import { ActionBarMenuTitle, CustomText } from "../../components";
import { useApp } from "./app-context";
import { TwilioService } from "../../services/twilio-chat-service";
import { strings } from "../../utils/strings";

const getToken = (username) =>
    axios.get(`https://chat-access-token-1947.twil.io/access-token?identity=${username}`).then((twilioUser) => twilioUser.data);

const ChatListScreenView = props => {
    const {
        navigation,
        searchValue,
        setSearchValue,
        user,
        channels,
        updateChannels,
        onChannelPressed
    } = props;

    const channelPaginator = React.useRef();

    const setChannelEvents = React.useCallback(
        (client) => {
            client.on('messageAdded', (message) => {
                updateChannels((prevChannels) =>
                    prevChannels.map((channel) =>
                        channel.id === message.channel.sid ? { ...channel, lastMessageTime: message.dateCreated, lastMessage: message.type == 'text' ? message.body : 'Shared a media file' } : channel,
                    ),
                );
            });
            return client;
        },
        [updateChannels],
    );

    const getSubscribedChannels = React.useCallback(
        (client) =>
            client.getSubscribedChannels().then((paginator) => {
                channelPaginator.current = paginator;
                const newChannels = TwilioService.getInstance().parseChannels(channelPaginator.current.items);
                updateChannels(newChannels);
            }),
        [updateChannels],
    );

    React.useEffect(() => {
        getToken(user.email)
            .then((token) => TwilioService.getInstance().getChatClient(token))
            .then(() => TwilioService.getInstance().addTokenListener(getToken))
            .then(setChannelEvents)
            .then(getSubscribedChannels)
            .catch((err) => console.log({ message: err.message, type: 'danger' }))
            .finally(() => console.log(false));

        return () => TwilioService.getInstance().clientShutdown();
    }, [user, setChannelEvents, getSubscribedChannels]);

    const sortedChannels = React.useMemo(
        () => channels.sort((channelA, channelB) => channelB.lastMessageTime - channelA.lastMessageTime),
        [channels],
    );

    const _renderChatListItem = ({ item, index }) => {
        var lastTIme = item.lastMessageTime ? item.lastMessageTime : item.updatedAt ? item.updatedAt : item.createdAt;
        return (
            <TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={() => onChannelPressed(item, index)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Avatar
                        rounded
                        source={{ uri: strings['defaultImage'] }}
                        size={50}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between' }}>
                        <View style={{ width: '70%' }}>
                            <CustomText
                                subHeader
                                style={{ fontWeight: '600' }}
                                displayText={item.name}
                            />
                            {item.lastMessage ?
                                <CustomText
                                    title
                                    displayText={item.lastMessage}
                                />
                                : null
                            }
                        </View>
                        <CustomText
                            style={{ width: '30%', textAlign: 'right' }}
                            displayText={moment(lastTIme).calendar({
                                sameDay: 'h:mm a',
                                nextDay: '[Tomorrow]',
                                nextWeek: 'dddd',
                                lastDay: '[Yesterday]',
                                lastWeek: '[Last] dddd',
                                sameElse: 'DD/MM/YYYY'
                            })}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <ActionBarMenuTitle
                navigation={navigation}
                title={'Messages'}
            />

            <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 30 }}>
                <Input
                    inputStyle={{ fontSize: 16 }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: colors.borderColor }}
                    placeholderTextColor={'#757575'}
                    placeholder={'Search Chats'}
                    value={searchValue}
                    onChangeText={setSearchValue}
                    renderErrorMessage={false}
                    rightIcon={
                        <Ionicons
                            style={{ color: '#757575' }}
                            name='search-outline'
                            size={28}
                        />
                    }
                />
            </View>

            <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={sortedChannels}
                renderItem={_renderChatListItem}
                ItemSeparatorComponent={() => {
                    return (<View style={{ backgroundColor: colors.grey, height: 1, margin: 16 }} />)
                }}
            />
        </SafeAreaView>
    );
};

export default ChatListScreenView;