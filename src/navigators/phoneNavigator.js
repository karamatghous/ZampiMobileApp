import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PhoneContainer from '../screens/phone/PhoneContainer';

const Stack = createStackNavigator();

export function PhoneNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PhoneScreen" component={PhoneContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}