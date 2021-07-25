import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { colors } from '../styles';

import { ContactsNavigator } from './contactsNavigator';
import { PhoneNavigator } from './phoneNavigator';
import { ChatNavigator } from './chatNavigator';
import { SettingsNavigator } from './settingsNavigator';
import ContactsContainer from '../screens/contacts/ContactsContainer';
import PhoneContainer from '../screens/phone/PhoneContainer';
import SmsListContainer from '../screens/sms-list/SmsListContainer';
import SettingsContainer from '../screens/settings/SettingsContainer';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home';

                    if (route.name === 'ContactsScreen' || route.name === 'PhoneScreen') {
                        iconName = route.name === 'ContactsScreen' ? 'person' : 'call';
                        return (
                            <Ionicons name={iconName} size={size} color={color} />
                        )
                    } else if (route.name === 'SmsListScreen' || route.name === 'SettingsScreen') {
                        iconName = route.name === 'SmsListScreen' ? 'chat' : 'list';
                        return (
                            <Entypo name={iconName} size={size} color={color} />
                        )
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: colors.adminColor,
                inactiveTintColor: colors.gray,
                showLabel: false,
                labelStyle: { fontSize: 16, fontWeight: 'bold' }
            }}>
            <Tab.Screen name="ContactsScreen" component={ContactsContainer} options={{ headerShown: false }} />
            <Tab.Screen name="PhoneScreen" component={PhoneContainer} options={{ headerShown: false }} />
            <Tab.Screen name="SmsListScreen" component={SmsListContainer} options={{ headerShown: false }} />
            <Tab.Screen name="SettingsScreen" component={SettingsContainer} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}