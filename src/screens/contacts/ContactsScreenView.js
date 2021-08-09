import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
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

  console.log(props, 'props');
  const [state, setState] = useState();
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

  // props from contactContainer
  // const auth_token = props.auth_token;
  // const acting_account = props.acting_account;
  

  useEffect(async() => {
    const auth_token = await AsyncStorage.getItem("AUTH_TOKEN");
    const acting_account = await AsyncStorage.getItem("ACTING_ACCOUNT");

  const formdata = new FormData();

  formdata.append('acting_account', acting_account);
  formdata.append('auth_token', auth_token);
    console.log(formdata,"form data contact");
    fetch('https://beta.zampi.io/Api/get_contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(json => {
        setState(json.contacts);
        setMasterDataSource(json.contacts);
        console.log(json, 'contacts');
        return;
      })
      .catch(error => {
        return console.log(error, 'error');
      });
  }, []);

  const contact_Pressed = (contactProp) => {
    navigation.navigate('ContactDetailScreen', {contactProp:contactProp,state:state});
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
      <TouchableOpacity
        style={{marginHorizontal: 12, flexDirection: 'row'}}
        onPress={() => contact_Pressed(item, index)}>
        <View style={{width: '18%'}}>
          <Avatar
            rounded
            source={{uri: item.photo ? item.photo : strings['defaultImage']}}
            size={64}
          />
        </View>
        <View style={{width: '4%'}} />

        {/* Phone, email & Address */}
        <View style={{width: '78%'}}>
          <CustomText
            header
            style={{color: colors.adminColor, fontWeight: 'bold'}}
            displayText={item.fname}
          />

          {/* Phone & email */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
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
                style={{marginLeft: 2, width: '86%'}}
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
                style={{paddingLeft: 2, width: '84%'}}
                displayText={item.email1}
              />
            </View>
          </View>

          {/* Address */}
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Entypo
              style={{color: '#53A8E2', width: '10%'}}
              name="address"
              size={18}
            />
            <CustomText
              numberOfLines={2}
              style={{paddingLeft: 2, width: '90%'}}
              displayText={item.address}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  console.log(state);

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
          style={{width: 70, height: 10}}
          round={true}
          searchIcon={{size: 27}}
          onChangeText={text => searchFilterFunction(text)}
          onClear={text => searchFilterFunction(text)}
          placeholder="Search"
          value={search}
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'grey',
            borderWidth: 0.5,
            height: 50,
            justifyContent: 'center',
          }}
        />
      </View>

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
    </SafeAreaView>
  );
};

export default ContactsScreenView;
