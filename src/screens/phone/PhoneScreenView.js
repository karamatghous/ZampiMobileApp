import React from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Dimensions } from "react-native";
import { Input } from 'react-native-elements';
import Feather from "react-native-vector-icons/Feather";

import colors from "../../styles/colors";
import { ActionBarMenuTitle, CustomText } from "../../components";

const PhoneScreenView = props => {
    const {
        navigation,
        number,
        onNumberPressed,
        onNumberLongPressed,
        onDeleteButton,
        onCallPressed,
        onMessagePressed,
        isCallActive
    } = props;

    const _renderNumberItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ paddingVertical: 26, width: Dimensions.get('screen').width / 3, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => onNumberPressed(item)}
                onLongPress={() => onNumberLongPressed(item)}>
                <CustomText
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                    displayText={item}
                />
                {item == 0 ?
                    <CustomText
                        style={{ fontSize: 16 }}
                        displayText={'+'}
                    />
                    : null}
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <ActionBarMenuTitle
                title={'CALL'}
                navigation={navigation}
            />


            <FlatList
                numColumns={3}
                style={{ flex: 1 }}
                contentContainerStyle={{ justifyContent: 'center' }}
                keyExtractor={(item, index) => `${index}`}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#']}
                renderItem={_renderNumberItem}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View style={{ alignItems: 'center', marginVertical: '10%', marginHorizontal: 10 }}>
                            <CustomText
                                title
                                numberOfLines={2}
                                style={{ textAlign: 'center' }}
                                displayText={'Please add the area code infront of the phone number'}
                            />
                        </View>
                        <Input
                            inputStyle={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
                            inputContainerStyle={{ borderBottomWidth: 0, height: 50 }}
                            containerStyle={{ borderWidth: 0 }}
                            value={number}
                            editable={false}
                            rightIcon={
                                number.length > 0 ?
                                    <Feather
                                        onPress={onDeleteButton}
                                        style={{ marginRight: 2 }}
                                        name={'delete'}
                                        size={24}
                                    />
                                    :
                                    (null)
                            }
                        />
                    </View>
                }
                ListFooterComponent={<View style={{ width: '100%', paddingHorizontal: 16, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ backgroundColor: '#53A8E2', width: '45%', height: 50, alignItems: 'center', justifyContent: 'center' }}
                        onPress={onCallPressed}>
                        <CustomText
                            style={{ fontSize: 16, fontWeight: 'bold' }}
                            displayText={isCallActive ? 'END' : 'CALL'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#53A8E2', width: '45%', height: 50, alignItems: 'center', justifyContent: 'center' }}
                        onPress={onMessagePressed}>
                        <CustomText
                            style={{ fontSize: 16, fontWeight: 'bold' }}
                            displayText='Message'
                        />
                    </TouchableOpacity>
                </View>}
            />
        </SafeAreaView>
    );
};

export default PhoneScreenView;
