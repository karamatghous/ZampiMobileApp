import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Keyboard
} from "react-native";
import { Input, Button } from "react-native-elements";
import colors from "../../styles/colors";
import { showAlert } from '../../components/ToastAlert';
import { strings } from '../../utils/strings';
import Feather from "react-native-vector-icons/Feather";
import { CustomText } from "../../components";

const SignInScreenView = props => {
  const {
    email,
    onSetEmail,
    isValidEmail,
    isValidPassword,
    password,
    onSetPassword,
    onLoginPress,
    onCreateAccountPress,
    onForgotPasswordPress,
    viewPaddingBottom,
    setShowPassword,
    showPassword,
  } = props;

  const FORGOT_PASSWORD_BUTTON = strings['SignIn_FORGOT_PASSWORD_BUTTON'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} forceInset={{ top: 'always' }}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginHorizontal: 30 }} keyboardShouldPersistTaps='handled'>
        <View style={{ height: '100%', justifyContent: 'center', paddingBottom: viewPaddingBottom }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -40, marginBottom: 40 }}>
            <Image
              style={{ height: 100, width: 150 }}
              source={require('../../assets/images/logo.png')}
            />
          </View>
          <Input
            inputStyle={[styles.emailText]}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            value={email}
            onChangeText={onSetEmail}
            placeholder={strings['SignIn_EmailPlaceHolder']}
            autoCapitalize='none'
          />

          <Input
            inputStyle={styles.emailText}
            secureTextEntry={showPassword ? false : true}
            inputContainerStyle={{ borderBottomWidth: 0, marginTop: 10, backgroundColor: styles.emailText.backgroundColor, borderRadius: styles.emailText.borderRadius }}
            value={password}
            onChangeText={onSetPassword}
            placeholder={strings['SignIn_PasswordPlaceHolder']}
            rightIcon={password.length > 0 ?
              <Feather
                onPress={() => { setShowPassword(!showPassword) }}
                style={{ marginRight: 10 }}
                name={showPassword ? "eye" : "eye-off"}
                size={20}
              />
              : null
            }
          />

          <Button
            titleStyle={{ fontWeight: 'bold' }}
            buttonStyle={{ paddingVertical: 16, backgroundColor: colors.adminColor, borderRadius: 30 }}
            containerStyle={{ marginTop: 20, marginHorizontal: 10, borderRadius: 30 }}
            title={strings['SignIn_LoginButton']}
            onPress={() => {
              if (isValidEmail)
                if (isValidPassword)
                  onLoginPress()
                else
                  showAlert(strings['SignIn_Please_Enter_Valid_Password'], 'short')
              else
                showAlert(strings['SignIn_Please_Enter_Valid_Email'], 'short')
            }}
          />

          <TouchableOpacity activeOpacity={1} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, paddingVertical: 10 }}
            onPress={onCreateAccountPress}>
            <CustomText
              style={{ fontSize: 14, color: colors.gray, fontWeight: 'bold' }}
              onTextPressed={onCreateAccountPress}
              displayText={'Dont have an account?'}
            />
            <CustomText
              title
              style={{ color: colors.adminColor, fontWeight: 'bold', paddingLeft: 5 }}
              displayText={'Sign Up'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageStyle: {
    width: "100%",
    height: "100%",
    flex: 1
  },

  sectionRoot: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },

  logo: {
    resizeMode: "stretch",
    alignContent: "center",
    alignItems: "baseline",
    alignSelf: "baseline",
    justifyContent: "flex-end"
  },

  emailText: {
    fontSize: 16,
    height: 50,
    borderWidth: 0,
    flex: 1,
    backgroundColor: colors.inputBg, paddingHorizontal: 14,
    borderRadius: 30
  },

  sectionStyle: {
    width: "85%",
    height: 50,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },

  FacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 0.5,
    height: 50,
    width: "85%",
    borderRadius: 5
  },
  ImageIconStyle: {
    padding: 4,
    marginLeft: 24,
    height: 24,
    width: 24,
    resizeMode: Platform.OS == 'android' ? "center" : null
  },
  TextStyle: {
    fontSize: 16,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  SeparatorLine: {
    width: 1,
    height: 40
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreenView;
