import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { StackNavigator } from './stackNavigator'

const Drawer = createDrawerNavigator();
import DrawerContainer from '../screens/drawer/DrawerContainer';


const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContainer {...props} />}>
            <Drawer.Screen name="Home" component={StackNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;