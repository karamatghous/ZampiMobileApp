import React from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from "react-native";
import { Avatar, Input } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import { debounce } from "lodash";
import SearchInput, { createFilter } from 'react-native-search-filter';

import colors from "../../styles/colors";
import { ActionBarMenuTitle, CustomText } from "../../components";
import { strings } from "../../utils/strings";

const KEYS_TO_FILTERS = ['name', 'phone', 'email', 'address'];

const ContactsScreenView = props => {
    const {
        navigation,
        searchValue,
        setSearchValue,
        contactList,
        onChangeSearchText,
        onContactPressed,
        user
    } = props;

    var filteredArrays = [];

    const handler = React.useCallback(debounce(onChangeSearchText, 200), []);
    const onChange = (text) => {
        if (!text || text === "")
            filteredArrays = []
        setSearchValue(text);
        handler(text);
    };

    if (searchValue.length <= 0)
        filteredArrays = [];
    else {
        var toSortArray = contactList;
        filteredArrays = toSortArray.filter(createFilter(searchValue, KEYS_TO_FILTERS));
    }

    const _renderContactItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ marginHorizontal: 12, flexDirection: 'row' }}
                onPress={() => onContactPressed(item, index)}>
                <View style={{ width: '18%' }}>
                    <Avatar
                        rounded
                        source={{ uri: item.profile ? item.profile : strings['defaultImage'] }}
                        size={64}
                    />
                </View>

                <View style={{ width: '4%' }} />

                {/* Phone, email & Address */}
                <View style={{ width: '78%' }}>
                    <CustomText
                        header
                        style={{ color: colors.adminColor, fontWeight: 'bold' }}
                        displayText={item.name}
                    />

                    {/* Phone & email */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginVertical: 6 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', paddingRight: 5 }}>
                            <Foundation
                                style={{ color: '#53A8E2', width: '14%', marginTop: 2 }}
                                name='telephone'
                                size={18}
                            />
                            <CustomText
                                title
                                numberOfLines={1}
                                style={{ marginLeft: 2, width: '86%' }}
                                displayText={item.phone}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', paddingLeft: 5 }}>
                            <Foundation
                                style={{ color: '#53A8E2', width: '16%' }}
                                name='mail'
                                size={18}
                            />
                            <CustomText
                                title
                                numberOfLines={1}
                                style={{ paddingLeft: 2, width: '84%' }}
                                displayText={item.email}
                            />
                        </View>
                    </View>

                    {/* Address */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <Entypo
                            style={{ color: '#53A8E2', width: '10%' }}
                            name='address'
                            size={18}
                        />
                        <CustomText
                            numberOfLines={2}
                            style={{ paddingLeft: 2, width: '90%' }}
                            displayText={item.address}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <ActionBarMenuTitle
                title={'CONTACTS'}
                navigation={navigation}
            />

            <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 30 }}>
                <Input
                    inputStyle={{ fontSize: 16 }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#757575' }}
                    placeholderTextColor={'#757575'}
                    placeholder={'Search Contacts'}
                    value={searchValue}
                    onChangeText={onChange}
                    renderErrorMessage={false}
                    rightIcon={
                        <Ionicons
                            style={{ color: '#757575' }}
                            name='search-outline'
                            size={28}
                        />
                    }
                />
            </View>

            <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={filteredArrays.length > 0 ? filteredArrays : contactList}
                renderItem={_renderContactItem}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 30 }} />
                    )
                }}
                ListFooterComponent={<View style={{ height: 20 }} />}
            />
        </SafeAreaView>
    );
};

export default ContactsScreenView;