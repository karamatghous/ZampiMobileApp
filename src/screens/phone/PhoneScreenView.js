import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
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
      <>
        <View>
          <View
            style={{
              borderBottomColor: '#D7D7D7',
              borderBottomWidth: 1,
              // marginTop: -26,
            }}
          />
          <View style={styles.verticleLine} />
          <View style={{marginTop: -26}}>
            <TouchableOpacity
              style={{
                // position: 'relative',
                // paddingVertical: -20,
                width: Dimensions.get('screen').width / 3,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() => onNumberPressed(item)}
              onLongPress={() => onNumberLongPressed(item)}>
              <CustomText
                style={{fontSize: 20, fontWeight: 'bold'}}
                displayText={item}
              />
              {item == 0 ? (
                <CustomText style={{fontSize: 16}} displayText={'+'} />
              ) : null}
            </TouchableOpacity>
          </View>

          {/* <View style={styles.verticleLine} /> */}
        </View>
      </>
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
          <View>
            <View
              style={{
                alignItems: 'center',
                marginVertical: '10%',
                marginHorizontal: 10,
              }}>
              <CustomText
                title
                numberOfLines={2}
                style={{textAlign: 'center'}}
                displayText={
                  'Please add the area code infront of the phone number'
                }
              />
            </View>
            <Input
              inputStyle={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}
              inputContainerStyle={{borderBottomWidth: 0, height: 50}}
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
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#53A8E2',
                width: '45%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={onCallPress}>
              <CustomText
                style={{fontSize: 16, fontWeight: 'bold'}}
                displayText={call ? 'END' : 'CALL'}
              />
            </TouchableOpacity>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
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
});

export default PhoneScreenView;
// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import {Input} from 'react-native-elements';
// import Feather from 'react-native-vector-icons/Feather';

// import colors from '../../styles/colors';
// import {ActionBarMenuTitle, CustomText} from '../../components';

// const PhoneScreenView = props => {
//   const {
//     navigation,
//     number,
//     onNumberPressed,
//     onNumberLongPressed,
//     onDeleteButton,
//     onCallPressed,
//     onMessagePressed,
//     isCallActive,
//   } = props;

//   const _renderNumberItem = ({item, index}) => {
//     return (
//       <TouchableOpacity
//         style={{
//           paddingVertical: 26,
//           width: Dimensions.get('screen').width / 3,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//         onPress={() => onNumberPressed(item)}
//         onLongPress={() => onNumberLongPressed(item)}>
//         <CustomText
//           style={{fontSize: 20, fontWeight: 'bold'}}
//           displayText={item}
//         />
//         {item == 0 ? (
//           <CustomText style={{fontSize: 16}} displayText={'+'} />
//         ) : null}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
//       <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
//       <ActionBarMenuTitle title={'CALL'} navigation={navigation} />

//       <FlatList
//         numColumns={3}
//         style={{flex: 1}}
//         contentContainerStyle={{justifyContent: 'center'}}
//         keyExtractor={(item, index) => `${index}`}
//         data={[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#']}
//         renderItem={_renderNumberItem}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={
//           <View>
//             <View
//               style={{
//                 alignItems: 'center',
//                 marginVertical: '10%',
//                 marginHorizontal: 10,
//               }}>
//               <CustomText
//                 title
//                 numberOfLines={2}
//                 style={{textAlign: 'center'}}
//                 displayText={
//                   'Please add the area code infront of the phone number'
//                 }
//               />
//             </View>
//             <Input
//               inputStyle={{
//                 textAlign: 'center',
//                 fontSize: 20,
//                 fontWeight: 'bold',
//               }}
//               inputContainerStyle={{borderBottomWidth: 0, height: 50}}
//               containerStyle={{borderWidth: 0}}
//               value={number}
//               placeholder="please enter number"
//               editable={false}
//               rightIcon={
//                 number.length > 0 ? (
//                   <Feather
//                     onPress={onDeleteButton}
//                     style={{marginRight: 2}}
//                     name={'delete'}
//                     size={24}
//                   />
//                 ) : null
//               }
//             />
//           </View>
//         }
//         ListFooterComponent={
//           <View
//             style={{
//               width: '100%',
//               paddingHorizontal: 16,
//               marginTop: 10,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#53A8E2',
//                 width: '45%',
//                 height: 50,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//               onPress={onCallPressed}>
//               <CustomText
//                 style={{fontSize: 16, fontWeight: 'bold'}}
//                 displayText={isCallActive ? 'END' : 'CALL'}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#53A8E2',
//                 width: '45%',
//                 height: 50,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//               onPress={onMessagePressed}>
//               <CustomText
//                 style={{fontSize: 16, fontWeight: 'bold'}}
//                 displayText="Message"
//               />
//             </TouchableOpacity>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default PhoneScreenView;
