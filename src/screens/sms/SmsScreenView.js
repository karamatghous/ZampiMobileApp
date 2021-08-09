import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import {GiftedChat,Bubble} from 'react-native-gifted-chat';
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
  const newMessage = {};
  

  // useEffect(async () => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);
  // const onSend = useCallback((messages = []) => {
  //   //   onSendSMS();
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);
  const {contactDetail} = route.params;
  var titleName = contactDetail.phone;
  console.log(titleName, 'title name');
  // console.log(props,"props sms screen");
  const [messages, setMessages] = useState([]);

  if (contactDetail && contactDetail.phone)
    titleName =
      contactDetail.phone == '+917598198955'
        ? 'Tony Stark'
        : contactDetail.phone == '+917373043355'
        ? 'Peter Parker'
        : contactDetail.phone == '+919865711001'
        ? 'Pepper Potts'
        : contactDetail.phone == '+918870048772'
        ? 'Steve Rogers'
        : contactDetail.phone == '+919841246020'
        ? `T'Challa`
        : contactDetail.phone == '+919789260652'
        ? `Thor`
        : contactDetail.phone == '+19195990852'
        ? 'Clint Barton'
        : contactDetail.phone == '+14049394851'
        ? 'Carol Danvers'
        : contactDetail.phone;

        const [Allmessages, setAllMessages] = useState([]);


        useEffect(async () => {
          const token = await AsyncStorage.getItem('AUTH_TOKEN');
          const allMessages = new FormData();
          allMessages.append('auth_token', token);
          allMessages.append('acting_account', '665');
          allMessages.append('to', '215');
      
          fetch('https://beta.zampi.io/Api/fetch_messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
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
          console.log(Allmessages, 'all messages of state');
      
          // fetch(' https://beta.zampi.io/Api/fetch_messages', {
          //   method: 'POST',
          //   headers: {
          //     Accept: 'application/json',
          //     'Content-Type': 'application/json'
          //   },
          //   body: allMessages,
          // });
        }, []);
      
        const getMappedMessages = () => {
          return Allmessages
            ? Allmessages.map(item => {
                console.log(item, 'item');
                return {
                  _id: item.sid,
                  text: item.message,
                  createdAt: item.date,
                  user: {
                    _id: item.id,
                    name: "item.sender.username",
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                };
              })
            : [];
            
        };      

  const onSendSMS = async messages => {
    const Auth_Token = await AsyncStorage.getItem('AUTH_TOKEN');
    console.log(Auth_Token, 'auth token Async Storage');
    console.log(messages, 'messages');


     newMessage = {
      user: {
        _id: 1,
      },
        createdAt: Math.floor(Date.now() / 1000),
        _id: messages[0]._id,
        text: messages[0].text,
    };
    const formdata = new FormData();
    formdata.append('auth_token', Auth_Token);
    formdata.append('acting_account', '665');
    formdata.append('to', titleName);
  
    formdata.append('message', messages[0].text);
    console.log(formdata, 'form data');
    fetch('https://beta.zampi.io/Api/send_sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(json => {
        setMessages((prevState) => ([
          newMessage,
          ...prevState,
        ]));
        console.log(json, 'sucess');
      })
      .catch(error => {
        return console.log(error, 'error');
      });
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'red',
          },
          left: {
            color: 'red',
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
  console.log(messages,"state messages");
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
        onSend={messages => onSendSMS(messages)}
        user={{
          _id: 665,
        }}
        renderBubble={renderBubble}
        loadEarlier={true}
        avatar={true}
      />
    </SafeAreaView>
  );
};

export default SmsScreenView;
