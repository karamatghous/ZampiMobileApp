import React from "react";
import { View } from 'react-native';
import Spinkit from 'react-native-spinkit'
import { colors } from '../../styles';
import CustomText from "../CustomText";

const CustomActivityIndicator = ({ loader, ...props }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinkit size={70}
            visible={true}
            style={{ justifyContent: "center" }}
            color={colors.gray}
            type={"ThreeBounce"} />
        <CustomText
            header
            style={{ padding: 5 }}
            displayText={loader ? loader.message : 'Loading...'}
        />
    </View>
);

export default CustomActivityIndicator;