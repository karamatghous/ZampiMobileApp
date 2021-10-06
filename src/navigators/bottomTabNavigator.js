import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {colors} from '../styles';

import {ContactsNavigator} from './contactsNavigator';
import {PhoneNavigator} from './phoneNavigator';
import {ChatNavigator} from './chatNavigator';
import {SettingsNavigator} from './settingsNavigator';
import ContactsContainer from '../screens/contacts/ContactsContainer';
import PhoneContainer from '../screens/phone/PhoneContainer';
import SmsListContainer from '../screens/sms-list/SmsListContainer';
import SettingsContainer from '../screens/settings/SettingsContainer';
import {RFValue} from 'react-native-responsive-fontsize';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator({route, navigation}) {
  // coming from signin screen
  const auth_token = route.params?.auth_token;
  const acting_account = route.params?.acting_account;
  console.log(auth_token, 'auth_token');

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';
          if (route.name === 'ContactsScreen' || route.name === 'PhoneScreen') {
            iconName = route.name === 'ContactsScreen' ? 'person' : 'call';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (
            route.name === 'SmsListScreen' ||
            route.name === 'SettingsScreen'
          ) {
            iconName = route.name === 'SmsListScreen' ? 'chat' : 'list';
            return <Entypo name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.adminColor,
        inactiveTintColor: colors.gray,
        showLabel: false,
        labelStyle: {fontSize: RFValue(16), fontWeight: 'bold'},
      }}>
      <Tab.Screen
        name="ContactsScreen"
        children={() => (
          <ContactsContainer
            auth_token={auth_token}
            acting_account={acting_account}
            navigation={navigation}
          />
        )}
      />
      <Tab.Screen
        name="PhoneScreen"
        component={PhoneContainer}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SmsListScreen"
        component={SmsListContainer}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsContainer}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
