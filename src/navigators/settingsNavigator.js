import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsContainer from '../screens/settings/SettingsContainer';

const Stack = createStackNavigator();

export function SettingsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsScreen" component={SettingsContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}