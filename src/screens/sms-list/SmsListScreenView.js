import React from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar, FlatList, RefreshControl } from "react-native";
import { Avatar, Input } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
const axios = require('axios');
import moment from "moment";

import colors from "../../styles/colors";
import { ActionBarMenuTitle, CustomActivityIndicator, CustomText } from "../../components";
import { useApp } from "./app-context";
import { TwilioService } from "../../services/twilio-chat-service";
import { strings } from "../../utils/strings";

const getToken = (username) =>
    axios.get(`https://chat-access-token-1947.twil.io/access-token?identity=${username}`).then((twilioUser) => twilioUser.data);

const SmsListScreenView = props => {
    const {
        navigation,
        searchValue,
        setSearchValue,
        user,
        channels,
        onChannelPressed,
        loading,
        componentDidFocus,
        internalLoader
    } = props;

    const _renderChatListItem = ({ item, index }) => {
        var messageHistory = channels[item];
        var lastTIme = messageHistory[0].dateSent ? messageHistory[0].dateSent : messageHistory[0].dateUpdated ? messageHistory[0].dateUpdated : messageHistory[0].dateCreated;
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
                                displayText={item == '+917598198955' ? 'Tony Stark' : item == '+917373043355' ? 'Peter Parker' : item == '+919865711001' ? 'Pepper Potts' : item == '+918870048772' ? 'Steve Rogers' : item == '+919841246020' ? `T'Challa` : item == '+919789260652' ? `Thor` : item == '+19195990852' ? 'Clint Barton' : item == '+14049394851' ? 'Carol Danvers' : item}
                            />
                            {messageHistory[0].body ?
                                <CustomText
                                    title
                                    displayText={messageHistory[0].body}
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

    return internalLoader && internalLoader.isLoading ? (
        <CustomActivityIndicator loader={internalLoader} />
    ) : (
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
                    containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#757575' }}
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
            {channels && Object.keys(channels).length > 0 ?
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={componentDidFocus}
                        />
                    }
                    keyExtractor={(item, index) => `${index}`}
                    data={Object.keys(channels)}
                    renderItem={_renderChatListItem}
                    ItemSeparatorComponent={() => {
                        return (<View style={{ backgroundColor: colors.grey, height: 1, margin: 16 }} />)
                    }}
                />
                : null
            }
        </SafeAreaView>
    );
};

export default SmsListScreenView;