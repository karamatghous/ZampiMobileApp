import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Switch,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';

import Collapsible from 'react-native-collapsible';
import _ from 'lodash';

import styles from './styles';
import {colors} from '../../styles';
import {ActionBarMenuTitle, CustomText} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const SettingsScreenView = props => {
  const {
    navigation,
    onLogout,
    notificationList,
    onNotificationPressed,
    isNotificationCollapsed,
    onChangeValue,
  } = props;
  const createTwoButtonAlert = () =>
    Alert.alert('Zampi', 'Logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => onLogOutPress()},
    ]);

  const onLogOutPress = () => {
    AsyncStorage.removeItem('AUTH_TOKEN');
    navigation.navigate('SignInScreen');
  };

  const _renderNotificationItem = ({item, index}) => {
    var paddingRight = 0;
    var paddingLeft = 0;
    if (index % 2 == 0) {
      paddingRight = 5;
    } else {
      paddingLeft = 5;
    }
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '50%',
          paddingRight: paddingRight,
          paddingLeft: paddingLeft,
        }}
        onPress={() => onChangeValue(item, index)}>
        <CustomText title displayText={item.name} />
        <Switch
          style={{
            transform: [
              {scaleX: Platform.OS == 'ios' ? 0.8 : 1},
              {scaleY: Platform.OS == 'ios' ? 0.8 : 1},
            ],
          }}
          value={item.isEnabled}
          onValueChange={() => onChangeValue(item, index)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{flex: 1}}>
        <ActionBarMenuTitle title={'App Settings'} navigation={navigation} />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
          }}
          onPress={onNotificationPressed}>
          <CustomText subHeader displayText={'Notifications'} />
          <Ionicons
            style={{color: colors.adminColor}}
            name={
              isNotificationCollapsed ? 'caret-forward' : 'caret-down-sharp'
            }
            size={RFValue(20)}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: colors.grey,
            marginHorizontal: 20,
            height: 1,
          }}
        />
        <Collapsible
          style={{marginHorizontal: 20}}
          collapsed={isNotificationCollapsed}>
          <FlatList
            numColumns={2}
            keyExtractor={(item, index) => `${index}`}
            data={notificationList}
            renderItem={_renderNotificationItem}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
        </Collapsible>
        <View
          style={{
            // marginTop: '100%',
            top: RFValue(450),
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.adminColor,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              height: RFValue(40),
              justifyContent: 'center',
            }}
            onPress={() => createTwoButtonAlert()}>
            <CustomText
              subHeader
              // style={{paddingHorizontal: 20}}
              displayText={'LogOut'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreenView;
