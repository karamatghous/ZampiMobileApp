import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContactsContainer from '../screens/contacts/ContactsContainer';
import ContactDetailContainer from '../screens/contact-details/ContactDetailContainer';

const Stack = createStackNavigator();

export function ContactsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ContactsScreen" component={ContactsContainer} options={{ headerShown: false }} />
            {/* <Stack.Screen name="ContactDetailScreen" component={ContactDetailContainer} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    )
}