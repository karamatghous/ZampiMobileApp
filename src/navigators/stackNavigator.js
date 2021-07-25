import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BottomTabNavigator } from './bottomTabNavigator';
import ContactDetailContainer from '../screens/contact-details/ContactDetailContainer';
import ChatContainer from '../screens/chat/ChatContainer';
import SmsContainer from '../screens/sms/SmsContainer';

const Stack = createStackNavigator();

export function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ContactDetailScreen" component={ContactDetailContainer} options={{ headerShown: false }} />
            <Stack.Screen name="SmsScreen" component={SmsContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}