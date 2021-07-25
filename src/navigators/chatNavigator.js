import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChatListContainer from '../screens/chat-list/ChatListContainer';

const Stack = createStackNavigator();

export function ChatNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatListScreen" component={ChatListContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}