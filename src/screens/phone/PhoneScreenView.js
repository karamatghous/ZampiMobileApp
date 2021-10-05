import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
  Modal,
  ScrollView,
  TextInput
} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import RNCallKeep from 'react-native-callkeep';
import {
  RNTwilioPhone,
  twilioPhoneEmitter,
  EventType,
} from 'react-native-twilio-phone';
import {showAlert} from '../../components/ToastAlert';

import colors from '../../styles/colors';
import {ActionBarMenuTitle, CustomText} from '../../components';
import {TwilioService} from '../../services/twilio-chat-service';
import {Platform} from 'react-native';
const callKeepOptions = {
  ios: {
    appName: 'appName',
    supportsVideo: false,
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'OK',
    additionalPermissions: [],
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'com.example.reactnativetwiliophone',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
    },
  },
};
const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;

const from = Platform.select({
  ios: 'client:Steve',
  android: 'client:Larry',
});
const identity = Platform.select({
  ios: 'keeton',
  android: 'keeton',
});
async function fetchAccessToken() {
  console.log('working');
  await fetch(
    // 'https://access-token-2848.twil.io/access-token?identity=' +
    //   identity +
    //   '&os=' +
    //   Platform.OS,
    `https://access-token-2848.twil.io/access-token?identity=${number}`,
  )
    .then(res => res.text())
    .then(respons => {
      const response = respons;
      // setToken(respons);
      const accessToken = response;
      console.log(accessToken, 'acess token of twilio call');
      return accessToken;
    });
}

const PhoneScreenView = props => {
  const {
    navigation,
    number,
    onNumberPressed,
    onNumberLongPressed,
    onDeleteButton,
    onCallPressed,
    onMessagePressed,
    isCallActive,
  } = props;
  const [call, setCall] = useState(false);
  const [callInProgress, setCallInProgress] = useState(false);
  const [state, setState] = useState(false);

  // const [token, setToken] = useState();

  useEffect(() => {
    return RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken);

    // RNTwilioPhone.initialize(
    //   callKeepOptions,
    //   fetchAccessToken,
    //   twilioCallOptions,
    // );
    // RNTwilioPhone.initializeCallKeep(
    //   callKeepOptions,
    //   fetchAccessToken,
    //   twilioCallOptions,
    // );
  }, []);
  // useEffect(() => {
  //   const subscriptions = [
  //     twilioPhoneEmitter.addListener('CallConnected', data => {
  //       console.log(data, 'checking tha data');
  //     }),
  //     twilioPhoneEmitter.addListener('CallDisconnected', data => {
  //       console.log(data);
  //     }),
  //     twilioPhoneEmitter.addListener('CallDisconnectedError', data => {
  //       console.log(data);
  //     }),
  //   ];

  //   return () => {
  //     subscriptions.map(subscription => {
  //       subscription.remove();
  //     });
  //   };
  // }, []);
  React.useEffect(() => {
    const subscriptions = [
      twilioPhoneEmitter.addListener(EventType.CallConnected, () => {
        console.log('CallConnected');
        setCallInProgress(true);
      }),
      twilioPhoneEmitter.addListener(EventType.CallDisconnected, () => {
        console.log('CallDisConnected');

        setCallInProgress(RNTwilioPhone.calls.length > 0);
      }),
      twilioPhoneEmitter.addListener(EventType.CallDisconnectedError, data => {
        console.log(data, 'this is emmiter');
        setCallInProgress(RNTwilioPhone.calls.length > 0);
      }),
    ];

    return () => {
      subscriptions.map(subscription => {
        console.log(subscription, 'subscription');
        subscription.remove();
      });
    };
  }, []);
  const _renderNumberItem = ({item, index}) => {
    return (
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#D7D7D7',
          height: (winHeight * 0.2) / 1.8,
          justifyContent: 'center',
        }}>
        {/* <View
            style={{
              borderBottomColor: '#D7D7D7',
              borderBottomWidth: 1,
              // marginTop: -26,
            }}
          /> */}
        {/* <View style={styles.verticleLine} /> */}

        <TouchableOpacity
          style={{
            width: Dimensions.get('screen').width / 3,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => onNumberPressed(item)}
          onLongPress={() => onNumberLongPressed(item)}>
          <CustomText
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              // paddingBottom:18
            }}
            displayText={item}
          />
          {item == 0 ? (
            <CustomText style={{fontSize: 20}} displayText={'+'} />
          ) : null}
        </TouchableOpacity>

        {/* <View style={styles.verticleLine} /> */}
      </View>
    );
  };

  const twilioCallOptions = {
    requestPermissionsOnInit: true, // Default: true - Set to false if you want to request permissions manually
  };

  const onCallPress = async () => {
    console.log(number, 'number');
    if (number.length == 0) return showAlert('Enter number');

    if (Platform.OS == 'ios') {
      var activeCalls = await RNCallKeep.checkIfBusy();
      if (activeCalls) {
        setCall(false);
        console.log('call end');

        return await RNCallKeep.endAllCalls();
      }
    }

    await RNTwilioPhone.startCall(number, 'karamat', from);
    console.log('calling');
    setCall(true);
    showAlert('Call Connecting...', 'long');
  };
  return (
    <>
      {state === true ? (
        <View style={{}}>
          <Modal animationType="slide" transparent={false} visible={state}>
            <SafeAreaView>
              <ScrollView
                style={{
                  height: winHeight * 1,
                  backgroundColor: colors.adminColor,
                }}>
                <View
                  style={{
                    // paddingTop: '70%',

                    // position:"absolute",
                    // padding:20,

                    alignSelf: 'center',
                    alignItems: 'center',
                    // justifyContent:"center",
                    backgroundColor: 'white',
                    height: (winHeight * 0.9) / 0.1,
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        marginLeft: RFPercentage(-2),
                        width: (winWidth * 1) / 3.6,
                        height: (winHeight * 0.9) / 9,
                        justifyContent: 'flex-start',
                        // backgroundColor:"red",
                        paddingHorizontal: 20,

                        alignItems: 'center',
                        left: '2%',
                      }}
                      onPress={() => setState(!state)}>
                      <Text style={{fontSize: RFValue(18)}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        // left: RFPercentage(53),
                        justifyContent: 'flex-end',
                        paddingHorizontal: 20,

                        width: (winWidth * 0.9) / 4,
                        height: (winHeight * 0.9) / 9,
                        // backgroundColor: 'blue',
                        alignItems: 'center',
                      }}
                      onPress={() => setState(!state)}>
                      <Text style={{fontSize: RFValue(18)}}>Save</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderRadius:
                        Math.round(
                          Dimensions.get('window').width +
                            Dimensions.get('window').height,
                        ) / 2,
                      marginTop: RFValue(-40),
                      width: Dimensions.get('window').width * 0.4,
                      height: Dimensions.get('window').width * 0.4,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',

                      borderWidth: 1,
                    }}></View>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      marginTop: RFValue(9),
                    }}>
                    <Text style={{fontSize: RFValue(18)}}>Edit</Text>
                  </TouchableOpacity>
                  <View style={{alignItems: 'center'}}>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      clearButtonMode="while-editing"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      clearButtonMode="while-editing"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Business Name"
                      clearButtonMode="while-editing"
                    />
                  </View>
                  <View
                    style={{
                      // paddingLeft: RFValue(15.5),
                      marginTop: RFValue(25),
                      flexDirection: 'row',
                      // alignItems: 'center'
                    }}>
                    <View>
                      <TextInput
                        style={[styles.input, styles.country]}
                        placeholder="USA"
                        clearButtonMode="while-editing"
                      />
                    </View>
                    <View>
                      <TextInput
                        style={[styles.input, styles.customWidth]}
                        placeholder="USA"
                        clearButtonMode="while-editing"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      // paddingLeft: RFValue(15.5),
                      alignItems: 'center',
                      marginTop: RFValue(25),
                    }}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      clearButtonMode="while-editing"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Birth Date"
                      clearButtonMode="while-editing"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="URL"
                      clearButtonMode="while-editing"
                    />
                    <TextInput
                      style={[styles.input, styles.customHeight]}
                      placeholder="Notes"
                      clearButtonMode="while-editing"
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      // backgroundColor: '#61ce70',
                      width: '70%',
                      marginTop: RFValue(40),
                      height: (winHeight * 0.1) / 1.3,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderRadius: 4,
                      borderColor: 'grey',
                      borderWidth: 0.3,
                    }}>
                    <Text style={{fontSize: RFValue(23), color: 'grey'}}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </View>
      ) : (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          <ActionBarMenuTitle title={'CALL'} navigation={navigation} />

          <FlatList
            numColumns={3}
            style={{flex: 1}}
            contentContainerStyle={{justifyContent: 'center'}}
            keyExtractor={(item, index) => `${index}`}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#']}
            renderItem={_renderNumberItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View
                style={{
                  height: (winHeight * 0.4) / 2,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    marginVertical: '10%',
                    marginHorizontal: 10,
                  }}></View>
                <Input
                  inputStyle={{
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                    height: (winHeight * 0) / 1.8,
                  }}
                  containerStyle={{borderWidth: 0}}
                  value={number}
                  placeholder="please enter number"
                  editable={false}
                  rightIcon={
                    number.length > 0 ? (
                      <Feather
                        onPress={onDeleteButton}
                        style={{marginRight: 2}}
                        name={'delete'}
                        size={24}
                      />
                    ) : null
                  }
                />
              </View>
            }
            ListFooterComponent={
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 16,
                  marginTop: '5%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#61ce70',
                    width: '70%',
                    height: winHeight*0.1/1.3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                  }}
                  onPress={onCallPress}>
                  <CustomText
                    style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}
                    displayText={call ? 'END' : 'CALL'}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
            style={{
              backgroundColor: '#53A8E2',
              width: '45%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onMessagePressed}>
            <CustomText
              style={{fontSize: 16, fontWeight: 'bold'}}
              displayText="Message"
            />
          </TouchableOpacity> */}
              </View>
            }
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '5%',
            }}>
            <TouchableOpacity onPress={() => setState(!state)}>
              <Text style={{color: '#99A0BA'}}>Create New Contact</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  verticleLine: {
    flexDirection: 'column',
    height: 60,
    // flex: 1,
    width: 1,
    backgroundColor: '#D7D7D7',
  },
  input: {
    marginTop: RFValue(10),
    width: (winWidth * 1) / 1.1,
    height: (winHeight * 0.1) / 1.6,
    borderRadius: 10,
    borderWidth: 0.3,
    paddingLeft: 8,
    borderColor: 'grey',
    // justifyContent:"flex-start"
  },
  country: {
    width: winWidth * 0.1,
    // marginLeft:"-6%"

    // marginLeft: RFPercentage(0),
    // marginRight:5
  },
  customWidth: {
    width: winWidth * 0.8,

    marginLeft: RFValue(5),
  },
  customHeight: {
    height: (winHeight * 0.2) / 1.7,
    // justifyContent:"flex-start",
    alignItems: 'baseline',
  },
});

export default PhoneScreenView;
