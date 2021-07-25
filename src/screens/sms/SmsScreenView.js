import React, { useState, useCallback, useRef, useEffect } from 'react'
import { View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Modal, Platform } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat'
import Ionicons from "react-native-vector-icons/Ionicons";
const axios = require('axios');
import _ from 'lodash';

import { CustomText } from "../../components";
import { colors } from '../../styles';

const SmsScreenView = props => {
    const {
        navigation,
        user,
        route,
        onTitlePressed,
        uploadImage,
        onSettingPressed,
        modalVisible,
        setModalVisible,
        onDeleteChat,
        messages,
        onSendSMS
    } = props;

    const { contactDetail } = route.params;
    var titleName = contactDetail.phone;
    if (contactDetail && contactDetail.phone)
        titleName = contactDetail.phone == '+917598198955' ? 'Tony Stark' : contactDetail.phone == '+917373043355' ? 'Peter Parker' : contactDetail.phone == '+919865711001' ? 'Pepper Potts' : contactDetail.phone == '+918870048772' ? 'Steve Rogers' : contactDetail.phone == '+919841246020' ? `T'Challa` : contactDetail.phone == '+919789260652' ? `Thor` : contactDetail.phone == '+19195990852' ? 'Clint Barton' : contactDetail.phone == '+14049394851' ? 'Carol Danvers' : contactDetail.phone

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
                        displayText={contactDetail && contactDetail.name ? contactDetail.name : titleName ? titleName : ''}
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
                onSend={(messages) => onSendSMS(messages)}
                user={{ _id: "+14048566155", name: user.fname, avatar: user.image }}
            />
        </SafeAreaView>
    )
};

export default SmsScreenView;