import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInContainer from '../screens/signin/SignInContainer';
import SignupContainer from '../screens/signup/SignupContainer';

const Stack = createStackNavigator();

export function AnonymousNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignInScreen" component={SignInContainer} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignupContainer} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}