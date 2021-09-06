import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { colors } from '../../styles';
import CustomText from '../CustomText';

const ActionBarMenuTitle = ({
    title,
    navigation
}) => (
    <View style={{ backgroundColor: 'white', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14 }}>
            <View style={{ paddingHorizontal: 24 }}>
                {/* <View style={{ height: 2, backgroundColor: colors.adminColor, width: 10 }} />
                <View style={{ height: 2, backgroundColor: colors.adminColor, width: 20, marginVertical: 3 }} />
                <View style={{ height: 2, backgroundColor: colors.adminColor, width: 14 }} /> */}
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <CustomText
                    header
                    style={{ fontWeight: 'bold', color: colors.adminColor }}
                    displayText={title.toUpperCase()}
                />
            </View>
            <TouchableOpacity style={{ position: 'absolute', left: 0, top: 0, right: '80%', height: 50 }} onPress={() => {
                navigation.openDrawer()
            }} />
        </View>
        <View style={{ height: 1, marginTop: 10, backgroundColor: colors.grey }} />
    </View>
)

export default ActionBarMenuTitle;