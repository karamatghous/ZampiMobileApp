import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
const axios = require('axios');
import _ from 'lodash';

import {CustomText} from '../../components';
import {colors} from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // messages,
    // onSendSMS
  } = props;
  console.log(props, 'sms screen props');

  const {contactDetail} = route.params;
  var titleName = contactDetail.phone;
  const [messages, setMessages] = useState([]);
  const [Allmessages, setAllMessages] = useState([]);
  const appandMessages = [];

  useEffect(async () => {
    console.log(global.AUTH_TOKEN, 'global');
    const token = await AsyncStorage.getItem('AUTH_TOKEN');
    const acting_account = await AsyncStorage.getItem('ACTING_ACCOUNT');

    const allMessages = new FormData();
    // allMessages.append('auth_token',global.AUTH_TOKEN);
    allMessages.append('auth_token', token);
    allMessages.append('acting_account', acting_account);
    allMessages.append('to', '215');

    fetch('https://beta.zampi.io/Api/fetch_messages', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: allMessages,
    })
      .then(response => response.json())
      .then(json => {
        setAllMessages(json.data.messages);
        console.log(json, 'all messages');
      })
      .catch(error => {
        console.error(error);
      });
    // console.log(Allmessages, 'all messages of state');
  }, []);

  const getMappedMessages = () => {
    return Allmessages
      ? Allmessages.map(item => {
          return {
            _id: item.sid,
            text: item.message,
            createdAt: item.date,
            user: {
              _id: item.id,
              name: 'item.sender.username',
              // avatar: 'https://placeimg.com/140/140/any',
            },
          };
        })
      : [];
  };
  const onSendSMS = async messages => {
    const token = await AsyncStorage.getItem('AUTH_TOKEN');
    const acting_account = await AsyncStorage.getItem('ACTING_ACCOUNT');

    const formdata = new FormData();
    formdata.append('auth_token', token);
    formdata.append('acting_account', acting_account);
    if (props.route.params.contactDetail.valid) {
      formdata.append('to', titleName);
    } else formdata.append('to', props.route.params.contactDetail.item.number);
    formdata.append('message', messages);
    console.log(messages, 'this is gifted chat masg');
    console.log(formdata, 'form data');
    fetch('https://beta.zampi.io/Api/send_sms', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(json => {
        // setMessages(prevState => [newMessage, ...prevState]);
        console.log(json, 'sucess');
      })
      .catch(error => {
        return console.log(error, 'error');
      });
  };
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: 'green',
            left: 2,
          },
          right: {
            backgroundColor: 'red',
          },
        }}
      />
    );
  };
  // const onSend = useCallback((messages = []) => {
  //   console.log(messages,"messages")
  //   setAllMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, {

  //     appandMessages:
  //         {
  //         _id: messages[0]._id,
  //         text: messages[0].text,
  //         createdAt: new Date(),
  //         user:{
  //           _id:messages[0].user._id,
  //           name:"react native",
  //           avatar: 'https://placeimg.com/140/140/any',
  //         }
  //         }
  //     }),
  //   );
  //   // onSendSMS(messages[0].text);
  // }, []);
  const onSend = useCallback((messages = []) => {
    console.log(messages, 'messages of gifted chat');
    setAllMessages(previousMessages =>
      GiftedChat.append(previousMessages, {
        sid: messages[0]._id,
        message: messages[0].text,
        createdAt: new Date(),
        id: messages[0].user._id,
      }),
    );
    onSendSMS(messages[0].text);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            height: 50,
            width: Dimensions.get('screen').width - 100,
            marginHorizontal: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onTitlePressed}>
          <CustomText
            header
            style={{fontWeight: 'bold'}}
            displayText={
              contactDetail && contactDetail.name
                ? contactDetail.name
                : titleName
                ? titleName
                : ''
            }
          />
        </TouchableOpacity>
      </View>
      <View style={{height: 1, backgroundColor: colors.grey}} />
      {/* <GiftedChat
                isTyping={true}
                showAvatarForEveryMessage={true}
                messagesContainerStyle={{}}
                messages={messages}
                renderAvatarOnTop
                onSend={(messages) =>onSend(messages)}
                user={{ _id: "665" }}
            /> */}
      <GiftedChat
        messages={getMappedMessages()}
        onSend={messages => onSend(messages)}
        user={{
          _id: 215,
        }}
        renderBubble={renderBubble}
        // loadEarlier={true}
        // avatar={false}
      />
    </SafeAreaView>
  );
};

export default SmsScreenView;
