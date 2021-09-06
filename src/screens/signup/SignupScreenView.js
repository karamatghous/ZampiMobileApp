import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import colors from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Button, Input} from 'react-native-elements';
import {showAlert} from '../../components/ToastAlert';
import {strings} from '../../utils/strings';
import {CustomText, ActionBar} from '../../components';

export default function SignupScreenView({navigation}) {
  // const {
  //   // email,
  //   onSetEmail,
  //   // password,
  //   onSetPassword,
  //   isValidEmail,
  //   isValidPassword,
  //   // onSignupPress,
  //   errorMessage,
  //   // lastName,
  //   onSetLastName,
  //   // firstName,
  //   onSetFirstName,
  //   navigation,
  //   viewPaddingBottom,
  //   loader,
  //   // setShowPassword,
  //   // showPassword,
  // } = props;
  const [state, setState] = useState({
    firstName,
    lastName,
    email,
    password,
  });
  const {firstName, lastName, email, password} = state;
  const [showPassword, setShowPassword] = useState();

  const updateField = field => {
    setState(prev => ({...prev, ...field}));
  };

  const FIRST_NAME = strings['Signup_FIRST_NAME_Placeholder'];
  const LAST_NAME = strings['Signup_LAST_NAME_Placeholder'];
  const EMAIL_PLACEHOLDER = strings['Signup_EMAIL_PLACEHOLDER'];
  const PASSWORD_PLACEHOLDER = strings['Signup_PASSWORD_PLACEHOLDER'];
  const SIGNUP_BUTTON = strings['Signup_SIGNUP_BUTTON'];

  const emailPattern = /^[^\s@]+@[^\s@]+$/;
  var passwordpattern = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  );

  const onSignupPress = () => {
    navigation.navigate('DrawerNavigator');
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      forceInset={{top: 'always'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {/* <ActionBar
        navigation={navigation}
      /> */}
      <ScrollView
        contentContainerStyle={{flexGrow: 1, marginHorizontal: 30}}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            // paddingBottom: viewPaddingBottom
          }}>
          <View style={{width: '100%', alignItems: 'center', marginBottom: 20}}>
            <Image
              style={{height: 100, width: 150}}
              source={require('../../assets/images/logo.png')}
            />
          </View>
          <Input
            inputStyle={[styles.emailText]}
            inputContainerStyle={{borderColor: 'transparent', marginTop: 10}}
            placeholder={'First Name'}
            value={firstName}
            onChangeText={firstName => updateField({firstName})}
            textDecorationLine={Platform.OS == 'android' ? 'transparent' : null}
          />

          <Input
            inputStyle={[styles.emailText]}
            inputContainerStyle={{borderColor: 'transparent', marginTop: 10}}
            placeholder={'Last Name'}
            value={lastName}
            onChangeText={lastName => updateField({lastName})}
            textDecorationLine={Platform.OS == 'android' ? 'transparent' : null}
          />

          <Input
            inputStyle={[styles.emailText]}
            inputContainerStyle={{borderColor: 'transparent', marginTop: 10}}
            placeholder={'Email'}
            autoCapitalize="none"
            value={email}
            onChangeText={email => updateField({email})}
          />

          <Input
            inputStyle={[styles.emailText]}
            secureTextEntry={showPassword ? false : true}
            inputContainerStyle={{
              borderColor: 'transparent',
              marginTop: 10,
              backgroundColor: styles.emailText.backgroundColor,
              borderRadius: styles.emailText.borderRadius,
            }}
            value={password}
            onChangeText={password => updateField({password})}
            placeholder={PASSWORD_PLACEHOLDER}
            rightIcon={
              password != null ? (
                <Feather
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={{marginRight: 10}}
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                />
              ) : null
            }
          />
          {/* {errorMessage && errorMessage.message ?
            <CustomText
              multiline
              style={{ color: colors.red, justifyContent: "center", alignSelf: "center", textAlign: "center", marginTop: 20 }}
              displayText={errorMessage && errorMessage.message}
            />
            : null
          } */}

          <Button
            titleStyle={{fontWeight: 'bold', borderRadius: 30}}
            buttonStyle={{
              paddingVertical: 16,
              backgroundColor: colors.adminColor,
              borderRadius: 30,
            }}
            containerStyle={{marginVertical: 20}}
            title={SIGNUP_BUTTON}
            onPress={() => {
              if (firstName != null)
                if (lastName != null)
                  if (emailPattern.test(email))
                    if (passwordpattern.test(password)) onSignupPress();
                    else
                      showAlert(
                        strings['Signup_PasswordLengthValidation'],
                        'short',
                      );
                  else
                    showAlert(
                      strings['Signup_Please_Enter_Valid_Email'],
                      'short',
                    );
                else showAlert(strings['Signup_LastNameValidation'], 'short');
              else showAlert(strings['Signup_FirstNameValidation'], 'short');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },

  pageStyle: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: colors.white,
  },

  sectionRoot: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  emailText: {
    fontSize: 16,
    height: 50,
    borderWidth: 0,
    flex: 1,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 10,
    borderRadius: 30,
    paddingHorizontal: 14,
  },

  textGroup: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 20,
  },

  authorizeText: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: colors.gray,
    fontSize: 14,
  },
});
