import React, {useEffect, useState} from 'react';
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
  Keyboard,
  ToastAndroid,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import {Input, Button} from 'react-native-elements';
import colors from '../../styles/colors';
import {showAlert} from '../../components/ToastAlert';
import {strings} from '../../utils/strings';
import Feather from 'react-native-vector-icons/Feather';
import {CustomText} from '../../components';
import {TextInput} from 'react-native-gesture-handler';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';
import {BottomTabNavigator} from '../../navigators/bottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {ActivityIndicator} from 'react-native';

export default function SignInScreenView({navigation}) {
  // const {
  //   // email,
  //   onSetEmail,
  //   isValidEmail,
  //   isValidPassword,
  //   // password,
  //   onSetPassword,
  //   onLoginPress,
  //   onCreateAccountPress,
  //   onForgotPasswordPress,
  //   viewPaddingBottom,
  //   setShowPassword,
  //   showPassword,
  // } = props;

  const FORGOT_PASSWORD_BUTTON = strings['SignIn_FORGOT_PASSWORD_BUTTON'];

  const [state, setState] = useState({
    email,
    password,
    indicator: false,
  });

  const {email, password, indicator} = state;
  const updateField = field => {
    setState(prev => ({...prev, ...field}));
  };
  const [showPassword, setShowPassword] = useState();
  const [loading, setLoading] = useState(false);
  var passwordpattern = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  );
  const emailPattern = /^[^\s@]+@[^\s@]+$/;

  const formdata = new FormData();
  formdata.append('email',email);
  formdata.append('password',password);

  // if(  emailPattern.test(email))

  const fireBase_FCM_Token = (fcm_token, auth_token, acting_account) => {
    // const updatedFCMToken = AsyncStorage.getItem('FCM_TOKEN');
    const FCM_Token = new FormData();
    FCM_Token.append('updated_fcm', fcm_token);
    FCM_Token.append('auth_token', auth_token);
    FCM_Token.append('acting_account', acting_account);
    return fetch('https://beta.zampi.io/api/update_fcm', {
      method: 'POST',
      headers: {
        // '': 'application/json',
      },
      body: FCM_Token,
    })
      .then(response => response.json())
      .then(json => {
        console.log(json, 'FCM token API response');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onSignInPressed = async () => {
    console.log(formdata, 'sign in form data');
    try {
      if (email != null)
        if (password != null)
          fetch('https://beta.zampi.io/Api/auth', {
            method: 'POST',
            headers: {
              // '': 'application/json',
            },
            body: formdata,
          })
            .then(response => response.json())
            .then(async json => {
              if (json.authentication.status == 0) {
                console.log(json, 'no account error');
                Toast.show(json.authentication.message, Toast.LONG);
                return;
              } else if (
                json.userdata.fcm_token == null
                // || json.userdata.fcm_token.length <50
              ) {
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(async response => {
                    const fcmToken = await messaging().getToken();
                    if (fcmToken) {
                      console.log(fcmToken, 'fcmtoken');
                    }
                    await AsyncStorage.setItem(
                      'ACTING_ACCOUNT',
                      json.userdata.acting_account,
                    );
                    await AsyncStorage.setItem(
                      'AUTH_TOKEN',
                      json.authentication.auth_token,
                    );
                    fireBase_FCM_Token(
                      fcmToken,
                      json.authentication.auth_token,
                      json.userdata.acting_account,
                    );
                    console.log(response, 'fire base response');
                    Toast.show('signed in with firebase', Toast.LONG);
                    navigation.navigate('TabNavigator', {
                      auth_token: json.authentication.auth_token,
                      acting_account: json.userdata.acting_account,
                      navigation: navigation,
                    });
                    return;
                  })
                  .catch(error => {
                    console.log(error, 'firebase error');
                  });
              } else {
                await AsyncStorage.setItem(
                  'ACTING_ACCOUNT',
                  json.userdata.acting_account,
                );
                await AsyncStorage.setItem(
                  'AUTH_TOKEN',
                  json.authentication.auth_token,
                );

                console.log(json, 'this is signin response');
                navigation.navigate('TabNavigator', {
                  auth_token: json.authentication.auth_token,
                  acting_account: json.userdata.acting_account,
                  navigation: navigation,
                });
              }
            })
            .catch(error => {
              return console.error(error, 'this is error');
            });
        // else
        //   Toast.show(
        //     'Enter Valid Password \n must have 8 characters 1 upper case one lower case special character and one number ',
        //     Toast.LONG,
        //   );
        else Toast.show('Enter Valid Email', Toast.LONG);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const readToken = async () => {
    try {
      const token = await AsyncStorage.getItem('AUTH_TOKEN');
      if (token !== null) {
        setLoading(true);

        navigation.navigate('TabNavigator');
        setLoading(false);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  useEffect(() => {
    readToken();
  }, []);
  return (
    // <View>
    //   {loading == true ? (
    //     <ActivityIndicator size="large" color="#e8ab00" />
    //   ) : (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      forceInset={{top: 'always'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, marginHorizontal: 30}}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            // paddingBottom: viewPaddingBottom
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -40,
              marginBottom: 40,
            }}>
            <Image
              style={{height: 100, width: 150}}
              source={require('../../assets/images/logo.png')}
            />
          </View>
          <Input
            inputStyle={[styles.emailText]}
            inputContainerStyle={{borderBottomWidth: 0}}
            value={email}
            onChangeText={email => updateField({email})}
            placeholder={strings['SignIn_EmailPlaceHolder']}
            autoCapitalize="none"
          />
          <Input
            inputStyle={styles.emailText}
            secureTextEntry={showPassword ? false : true}
            inputContainerStyle={{
              borderBottomWidth: 0,
              marginTop: 10,
              backgroundColor: styles.emailText.backgroundColor,
              borderRadius: styles.emailText.borderRadius,
            }}
            value={password}
            onChangeText={password => updateField({password})}
            placeholder={strings['SignIn_PasswordPlaceHolder']}
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

          <Button
            onPress={() => {
              onSignInPressed();
            }}
            titleStyle={{fontWeight: 'bold'}}
            buttonStyle={{
              paddingVertical: 16,
              backgroundColor: colors.adminColor,
              borderRadius: 30,
            }}
            containerStyle={{
              marginTop: 20,
              marginHorizontal: 10,
              borderRadius: 30,
            }}
            title={'Sign In'}

            // if (isValidEmail)
            //   if (isValidPassword)
            //     onLoginPress()
            //   else
            //     showAlert(strings['SignIn_Please_Enter_Valid_Password'], 'short')
            // else
            //   showAlert(strings['SignIn_Please_Enter_Valid_Email'], 'short')
          />

          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              paddingVertical: 10,
            }}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <CustomText
              style={{fontSize: 14, color: colors.gray, fontWeight: 'bold'}}
              displayText={'Dont have an account?'}
            />
            <CustomText
              title
              style={{
                color: colors.adminColor,
                fontWeight: 'bold',
                paddingLeft: 5,
              }}
              displayText={'Sign Up'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageStyle: {
    width: '100%',
    height: '100%',
    flex: 1,
  },

  sectionRoot: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },

  logo: {
    resizeMode: 'stretch',
    alignContent: 'center',
    alignItems: 'baseline',
    alignSelf: 'baseline',
    justifyContent: 'flex-end',
  },

  emailText: {
    fontSize: 16,
    height: 50,
    borderWidth: 0,
    flex: 1,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 14,
    borderRadius: 30,
  },

  sectionStyle: {
    width: '85%',
    height: 50,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 0.5,
    height: 50,
    width: '85%',
    borderRadius: 5,
  },
  ImageIconStyle: {
    padding: 4,
    marginLeft: 24,
    height: 24,
    width: 24,
    resizeMode: Platform.OS == 'android' ? 'center' : null,
  },
  TextStyle: {
    fontSize: 16,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  SeparatorLine: {
    width: 1,
    height: 40,
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
