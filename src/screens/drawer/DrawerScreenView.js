import React from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { CustomText } from "../../components";
import { colors } from "../../styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-elements";

const DrawerScreenView = props => {
  const {
    navigation,
    user
  } = props;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '30%', backgroundColor: colors.adminColor, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity activeOpacity={1} style={{ position: 'absolute', top: 24, left: '84%', right: 0, height: 50 }}
          onPress={() => {
            navigation.closeDrawer();
          }}>
          <Ionicons
            color={colors.white}
            name='ios-close'
            size={28}
          />
        </TouchableOpacity>
        <Avatar
          containerStyle={{ marginTop: 30 }}
          rounded
          size={100}
          source={user && user.image ? { uri: user.image } : require('../../assets/images/logo_image.png')}
        />
        <CustomText
          style={{ fontWeight: 'bold', fontSize: 16, marginTop: 30, color: colors.white }}
          displayText={user && user.fname && user.lname ? user.fname + ' ' + user.lname : user && user.fname ? user.fname : 'Zampi'}
        />
      </View>
      <View style={{ height: '70%' }}>
      </View>
    </View>
  );
};


export default DrawerScreenView;