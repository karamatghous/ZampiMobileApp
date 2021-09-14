import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import {Avatar, Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
const axios = require('axios');
import moment from 'moment';

import colors from '../../styles/colors';
import {
  ActionBarMenuTitle,
  CustomActivityIndicator,
  CustomText,
} from '../../components';
import {useApp} from './app-context';
import {TwilioService} from '../../services/twilio-chat-service';
import {strings} from '../../utils/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Badge} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {incomingMessages} from '../../../myRedux/actions';

const getToken = username =>
  axios
    .get(
      `https://chat-access-token-1947.twil.io/access-token?identity=${username}`,
    )
    .then(twilioUser => twilioUser.data);

const SmsListScreenView = props => {
  const {
    navigation,
    searchValue,
    setSearchValue,
    user,
    channels,
    onChannelPressed,
    // loading,
    componentDidFocus,
    internalLoader,
  } = props;
  console.log(props, 'list msg screen props');
  const [loading, setLoading] = useState(false);
  const [Onloading, setOnLoading] = useState(false);

  const [state, setState] = useState();
  useEffect(() => {
    ApiContact();
  }, [incomingMessages]);

  const ApiContact = async () => {
    setOnLoading(true);
    setLoading(true);

    const auth_token = await AsyncStorage.getItem('AUTH_TOKEN');
    const acting_account = await AsyncStorage.getItem('ACTING_ACCOUNT');
    const formdata = new FormData();
    formdata.append('acting_account', acting_account);
    formdata.append('auth_token', auth_token);
    console.log(formdata, 'form data contact');
    fetch('https://beta.zampi.io/Api/get_contacts', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(async json => {
        setLoading(false);
        setState(json.contacts);
        setOnLoading(false);
        return;
      })
      .catch(error => {
        setLoading(false);
        setOnLoading(false);
        return console.log(error, 'error');
      });
  };
  const onSendId = async id => {
    const auth_token = await AsyncStorage.getItem('AUTH_TOKEN');
    const acting_account = await AsyncStorage.getItem('ACTING_ACCOUNT');
    const formdata = new FormData();
    formdata.append('acting_account', acting_account);
    formdata.append('auth_token', auth_token);
    formdata.append('sender_id', id);
    console.log(formdata, 'form data contact');
    fetch('https://beta.zampi.io/Api/read_chats', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(json => {
        console.log(formdata, 'new api form data');
        console.log(json, 'sender id');
        return;
      })
      .catch(error => {
        return console.log(error, 'error');
      });
  };

  const _renderChatListItem = ({item, index}) => {
    // var messageHistory = channels[item];
    // var lastTIme = messageHistory[0].dateSent
    //   ? messageHistory[0].dateSent
    //   : messageHistory[0].dateUpdated
    //   ? messageHistory[0].dateUpdated
    //   : messageHistory[0].dateCreated;
    return (
      <View
        style={{
         
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{paddingHorizontal: 16}}
          // onPress={() => onChannelPressed(item, index)}
          onPress={() => {
            navigation.navigate('SmsScreen', {contactDetail: {item: item}});
            onSendId(item.id);
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Avatar
              rounded
              // source={{uri: strings['defaultImage']}}
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
              size={50}
            />
            <Badge
              value={item.unseen}
              status="warning"
              badgeStyle={{backgroundColor:"#53A8E2"}}
              
              // badgeStyle={{width: 40, height: 20}}
            />
            {/* <Avatar
            rounded
            source={{ uri: item.photo ? item.photo : strings["defaultImage"] }}
            size={64}
          /> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
                // justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View style={{marginLeft: 12, width: 120}}>
                <CustomText
                  subHeader
                  style={{fontWeight: 'bold', fontSize: 18}}
                  displayText={item.fname + item.lname}
                  // displayText={
                  //   item == '+917598198955'
                  //     ? 'Tony Stark'
                  //     : item == '+917373043355'
                  //     ? 'Peter Parker'
                  //     : item == '+919865711001'
                  //     ? 'Pepper Potts'
                  //     : item == '+918870048772'
                  //     ? 'Steve Rogers'
                  //     : item == '+919841246020'
                  //     ? `T'Challa`
                  //     : item == '+919789260652'
                  //     ? `Thor`
                  //     : item == '+19195990852'
                  //     ? 'Clint Barton'
                  //     : item == '+14049394851'
                  //     ? 'Carol Danvers'
                  //     : item
                  // }
                />
                {/* {messageHistory[0].body ? ( */}
                <CustomText
                  style={{marginTop: 5, fontSize: 12}}
                  title
                  displayText={'Hi There'}
                />
                {/* ) : null} */}
              </View>
              <Text
                style={{
                  marginLeft: 25,
                  marginTop: -23,
                  color: '#53A8E2',
                  fontSize: 12,
                }}>
                2123851384
              </Text>
              <Text style={{marginLeft: 10, marginTop: -23, color: '#99A0BA'}}>
                2AM
              </Text>

              {/* <CustomText
              style={{width: '30%', textAlign: 'right'}}
              displayText={moment(lastTIme).calendar({
                sameDay: 'h:mm a',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'DD/MM/YYYY',
              })}
            /> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return internalLoader && internalLoader.isLoading ? (
    <CustomActivityIndicator loader={internalLoader} />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ActionBarMenuTitle navigation={navigation} title={'Messages'} />

      <View style={{ paddingHorizontal: 10, marginVertical: 30,justifyContent:"center",alignItems:"center"}}>
        <Input
          inputStyle={{fontSize: 16}}
          inputContainerStyle={{borderBottomWidth: 0}}
          containerStyle={{
            borderWidth: 0.2,
            borderRadius: 8,
            borderColor: '#757575',
            width: "95%",
          }}
          placeholderTextColor={'#757575'}
          placeholder={'Search Chats'}
          value={searchValue}
          onChangeText={setSearchValue}
          renderErrorMessage={false}
          rightIcon={
            <Ionicons
              style={{color: '#757575'}}
              name="search-outline"
              size={28}
            />
          }
        />
      </View>
      {channels && Object.keys(channels).length > 0 ? (
        <>
          <View>
            {Onloading == true ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => ApiContact()}
                  />
                }
                keyExtractor={(item, index) => `${index}`}
                // data={Object.keys(channels)}
                data={state}
                renderItem={_renderChatListItem}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        backgroundColor: "white",
                        height: 1,
                        margin: 16,
                      }}
                    />
                  );
                }}
              />
            )}
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default SmsListScreenView;
