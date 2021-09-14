import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import {debounce} from 'lodash';
import SearchInput, {createFilter} from 'react-native-search-filter';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../../styles/colors';
import {ActionBarMenuTitle, CustomText} from '../../components';
import {strings} from '../../utils/strings';
import {SearchBar} from 'react-native-elements/dist/searchbar/SearchBar';

const KEYS_TO_FILTERS = ['name', 'phone', 'email', 'address'];
const ContactsScreenView = props => {
  const {
    navigation,
    searchValue,
    setSearchValue,
    contactList,
    onChangeSearchText,
    onContactPressed,
    user,
  } = props;
  const winHeight = Dimensions.get('window').height;


  console.log(props, 'props');
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState();
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

  // props from contactContainer
  // const auth_token = props.auth_token;
  // const acting_account = props.acting_account;

  useEffect(async () => {
    setLoading(true);
    const auth_token = await AsyncStorage.getItem('AUTH_TOKEN');
    const acting_account = await AsyncStorage.getItem('ACTING_ACCOUNT');

    const formdata = new FormData();

    formdata.append('acting_account', acting_account);
    formdata.append('auth_token', auth_token);
    // console.log(formdata, "form data contact");
    fetch('https://beta.zampi.io/Api/get_contacts', {
      method: 'POST',
      headers: {
        // "Content-Type": "application/json",
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(async json => {
        setState(json.contacts);
        setMasterDataSource(json.contacts);
        setLoading(false);

        // console.log(json, "contacts");
        return;
      })
      .catch(error => {
        setLoading(false);
        return console.log(error, 'error');
      });
  }, []);
  const contact_Pressed = contactProp => {
    navigation.navigate('ContactDetailScreen', {
      contactProp: contactProp,
      state: state,
    });
  };

  var filteredArrays = [];

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.fname
          ? item.fname.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setState(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setState(masterDataSource);
      setSearch(text);
    }
  };
  const handler = React.useCallback(debounce(onChangeSearchText, 200), []);
  const onChange = text => {
    if (!text || text === '') filteredArrays = [];
    setSearchValue(text);
    handler(text);
  };
  if (searchValue.length <= 0) filteredArrays = [];
  else {
    var toSortArray = contactList;
    filteredArrays = toSortArray.filter(
      createFilter(searchValue, KEYS_TO_FILTERS),
    );
  }
  const _renderContactItem = ({item, index}) => {
    return (
      <View
        style={{
          borderWidth: 0.2,
          width: "90%",
          height: winHeight * 0.3 / 2.3,
          borderRadius: 4,
          borderColor: '#D7D7D7',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',

        }}>
        <TouchableOpacity
          style={{marginHorizontal: 12, flexDirection: 'row'}}
          onPress={() => contact_Pressed(item, index)}>
          <View style={{width: '18%', justifyContent: 'center'}}>
            <Avatar
              rounded
              // source={{
              //   uri: item.photo
              //     ? item.photo
              //     : 'https://pixabay.com/images/search/sun/',
              // }}
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
              size={56}
            />
          </View>
          <View style={{width: '4%'}} />

          {/* Phone, email & Address */}
          <View style={{width: '78%', justifyContent: 'center',marginTop:"3%"}}>
            <CustomText
              header
              style={{
                color: colors.adminColor,
                fontWeight: 'bold',
                fontSize: 22,
              }}
              displayText={item.fname}
            />

            {/* Phone & email */}
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                width: '100%',
                marginVertical: 6,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '50%',
                  paddingRight: 5,
                }}>
                <Foundation
                  style={{color: '#53A8E2', width: '14%', marginTop: 2}}
                  name="telephone"
                  size={18}
                />
                <CustomText
                  title
                  numberOfLines={1}
                  style={{marginLeft: 2, width: '86%', fontSize: 15}}
                  displayText={item.number}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '50%',
                  paddingLeft: 5,
                }}>
                <Foundation
                  style={{color: '#53A8E2', width: '16%'}}
                  name="mail"
                  size={18}
                />
                <CustomText
                  title
                  numberOfLines={1}
                  style={{paddingLeft: 2, width: '84%', fontSize: 15}}
                  displayText={item.email1}
                />
              </View>
            </View>
            {/* Address */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginBottom: "5%",
              }}>
              <Entypo
                style={{color: '#53A8E2', width: '10%'}}
                name="address"
                size={18}
              />
              <CustomText
                numberOfLines={2}
                style={{paddingLeft: 2, width: '90%', fontSize: 15}}
                displayText={item.address}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // console.log(state);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ActionBarMenuTitle title={'CONTACTS'} navigation={navigation} />

      <View style={{width: '100%', paddingHorizontal: 10, marginVertical: 30}}>
        {/* <Input
                    inputStyle={{ fontSize: 16 }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#757575' }}
                    placeholderTextColor={'#757575'}
                    placeholder={'Search Contacts'}
                    value={searchValue}
                    // onChangeText={onChange}
                    onChangeText={(text) => searchFilterFunction(text)}
                    on

                    renderErrorMessage={false}
                    rightIcon={
                        <Ionicons
                            style={{ color: '#757575' }}
                            name='search-outline'
                            size={28}
                        />
                    }
                /> */}
        <SearchBar
          lightTheme
          round={true}
          searchIcon={{size: 27, color: 'grey'}}
          onChangeText={text => searchFilterFunction(text)}
          onClear={text => searchFilterFunction(text)}
          placeholder="Search Contacts"
        
          placeholderTextColor="grey"
          color="grey"
          value={search}
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 0.1,
            borderRadius: 13,
            borderRightWidth:0.2,
            borderLeftWidth:0.2,
            borderEndColor:"grey",
            
            // borderColor: '#E5E5E5',
            // borderWidth: 0.2,
            height: winHeight * 0.2/3.2,
            justifyContent: 'center',
            alignItems:"center",
            alignSelf:"center",
            width:"95%"
          }}
        />
      </View>
      <View>
        {loading == true ? (
          <ActivityIndicator
            style={{marginTop: 100}}
            size="large"
            color="#e8ab00"
          />
        ) : (
          <FlatList
            // keyExtractor={(item, index) => `${index}`}
            // keyExtractor={(item,index)}
            // data={state != null ? state : contactList}
            keyExtractor={(item, index) => index.toString()}
            data={state}
            renderItem={_renderContactItem}
            ItemSeparatorComponent={() => {
              return <View style={{height: 30}} />;
            }}
            ListFooterComponent={<View style={{height: 20}} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ContactsScreenView;
