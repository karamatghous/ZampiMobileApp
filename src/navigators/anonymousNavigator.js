import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInContainer from '../screens/signin/SignInContainer';
import SignupContainer from '../screens/signup/SignupContainer';
import { BottomTabNavigator } from './bottomTabNavigator';
import DrawerNavigator from './drawerNavigator';
import ContactsContainer from '../screens/contacts/ContactsContainer';
import ContactDetailScreenView from '../screens/contact-details/ContactDetailScreenView';
import PhoneContainer from '../screens/phone/PhoneContainer';
import SettingsContainer from '../screens/settings/SettingsContainer';
import SmsContainer from '../screens/sms/SmsContainer';
import SmsListContainer from '../screens/sms-list/SmsListContainer';


const Stack = createStackNavigator();

export function AnonymousNavigator() {
    return (
        <Stack.Navigator>

            <Stack.Screen name="SignInScreen" component={SignInContainer} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignupContainer} options={{ headerShown: false }} />
            <Stack.Screen name="TabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ContactsScreen" component={ContactsContainer} options={{ headerShown: false }} />
           <Stack.Screen name="ContactDetailScreen" component={ContactDetailScreenView} options={{ headerShown: false }} />
           <Stack.Screen name="SmsListScreen" component={SmsListContainer} options={{ headerShown: false }} />
           <Stack.Screen name="PhoneScreen" component={PhoneContainer} options={{ headerShown: false }} />
           <Stack.Screen name="SettingsScreen" component={SettingsContainer} options={{ headerShown: false }} />
           <Stack.Screen name="SmsScreen" component={SmsContainer} options={{ headerShown: false }} />



            {/* <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} /> */}

        </Stack.Navigator>
    )
}