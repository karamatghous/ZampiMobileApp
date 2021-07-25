import React from "react";
import { View, TouchableOpacity, SafeAreaView, StatusBar, FlatList, ScrollView, Dimensions, Platform } from "react-native";
import { Avatar } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import * as Progress from 'react-native-progress';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';

import { ActionBar, CustomText } from "../../components";
import { colors } from "../../styles";
import { strings } from "../../utils/strings";
import { useApp } from "../chat-list/app-context";

const ContactDetailScreenView = props => {
    const {
        navigation,
        contactDetail,
        onPlayRecordingPressed,
        onStopPlayingPressed,
        onCallPressed,
        onMessagePressed,
        isCallActive
    } = props;

    const { channels, updateChannels } = useApp();

    var progress = useTrackPlayerProgress();

    const _renderCallHistory = ({ item, index }) => {

        var totalMins = item.totalMin || 0;
        if (progress && progress.duration) {
            totalMins = progress.duration / 60;
            item.totalMin = totalMins;
        }

        var playingMin = item.playingMin || 0;
        if (progress && progress.position) {
            playingMin = progress.position / 60;
            item.playingMin = playingMin;
        }

        return (
            <View style={{ padding: 16, marginTop: index == 0 ? 16 : 0 }}>
                {/* Number & Date */}
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    {/* Number */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                        <Foundation
                            style={{ color: '#53A8E2', width: '14%', marginTop: 2 }}
                            name='telephone'
                            size={18}
                        />
                        <CustomText
                            subHeader
                            numberOfLines={1}
                            style={{ marginLeft: 2, width: '86%' }}
                            displayText={item.phone}
                        />
                    </View>

                    {/* Date */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                        <Ionicons
                            style={{ color: '#53A8E2', width: '14%' }}
                            name='calendar'
                            size={18}
                        />
                        <CustomText
                            subHeader
                            numberOfLines={1}
                            style={{ marginLeft: 2, width: '86%' }}
                            displayText={moment(item.date).format('LL')}
                        />
                    </View>
                </View>

                {/* Audio Recording */}
                {item.recordedVoice ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        {item.isLoading || item.isBuffering ?
                            <Progress.Circle style={{ marginRight: 6 }} size={20} indeterminate={true} />
                            :
                            <Ionicons
                                onPress={() => onPlayRecordingPressed(item, index)}
                                style={{ color: colors.greyLighter, paddingRight: 4, marginLeft: -4 }}
                                name={item.isPlaying ? 'pause' : 'play'}
                                size={28}
                            />
                        }
                        {item.isPlaying || item.isLoading || item.isBuffering || item.isPaused ?
                            <Ionicons
                                onPress={() => onStopPlayingPressed(item, index)}
                                style={{ color: colors.greyLighter, paddingRight: 4 }}
                                name={'stop'}
                                size={28}
                            />
                            : null
                        }
                        {item.isPlaying || item.isLoading || item.isBuffering || item.isPaused ?
                            <View>
                                <Entypo
                                    style={{ color: colors.greyLighter, paddingRight: 4 }}
                                    name={'ccw'}
                                    size={28}
                                />
                                <TouchableOpacity style={{ position: 'absolute', top: 0, left: 10, right: 0, bottom: 0, justifyContent: 'center' }}
                                    onPress={() => {
                                        var seekPosition = progress.position > 10 ? progress.position - 5 : 0;
                                        TrackPlayer.seekTo(seekPosition);
                                    }}>
                                    <CustomText
                                        style={{ color: colors.greyLighter, fontSize: 8 }}
                                        displayText={'-10'}
                                    />
                                </TouchableOpacity>
                            </View>
                            : null
                        }
                        {item.isPlaying || item.isLoading || item.isBuffering || item.isPaused ?
                            <View>
                                <Ionicons
                                    style={{ color: colors.greyLighter, paddingRight: 4 }}
                                    name={'reload'}
                                    size={28}
                                />
                                <TouchableOpacity style={{ position: 'absolute', top: 0, left: 6, right: 0, bottom: 0, justifyContent: 'center' }}
                                    onPress={() => {
                                        var seekPosition = (progress.position + 10) > progress.duration ? progress.duration : (progress.position + 10)
                                        TrackPlayer.seekTo(seekPosition);
                                    }}>
                                    <CustomText
                                        style={{ color: colors.greyLighter, fontSize: 8 }}
                                        displayText={'+10'}
                                    />
                                </TouchableOpacity>
                            </View>
                            : null
                        }
                        {item.isPlaying || item.isLoading || item.isBuffering || item.isPaused ?
                            <CustomText
                                style={{ color: colors.greyLighter, marginRight: 4 }}
                                displayText={playingMin.toFixed(2)}
                            />
                            :
                            null
                        }

                        <Progress.Bar
                            style={{ height: 12, marginRight: 4 }}
                            borderRadius={6}
                            borderWidth={0}
                            color={colors.adminColor}
                            unfilledColor={colors.greyLighter}
                            progress={(item.isPlaying || item.isBuffering || item.isPaused) && totalMins > 0 ? (playingMin / totalMins) : 0}
                            height={12}
                            width={item.isPlaying || item.isBuffering || item.isPaused ? Dimensions.get('screen').width - 252 : Dimensions.get('screen').width - 90}
                        />

                        {item.isPlaying || item.isLoading || item.isBuffering || item.isPaused ?
                            <CustomText
                                style={{ color: colors.greyLighter }}
                                displayText={totalMins.toFixed(2)}
                            />
                            :
                            null
                        }
                    </View>
                    : null
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle='dark-content' backgroundColor='white' />
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <ActionBar
                    navigation={navigation}
                    title={contactDetail && contactDetail.name ? contactDetail.name : ''}
                />

                <View style={{ height: 1, backgroundColor: colors.grey, marginTop: -6, marginBottom: 16 }} />

                {/* Profile Image, Name, Phone, email, Address & Send Message */}
                <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>
                    {/*  Profile Image */}
                    <View style={{ width: '20%' }}>
                        <Avatar
                            rounded
                            source={{ uri: contactDetail && contactDetail.profile ? contactDetail.profile : strings['defaultImage'] }}
                            size={80}
                        />
                    </View>

                    {/* Name, Phone, email, Address & Send Message */}
                    <View style={{ width: '80%', paddingLeft: 26 }}>
                        <CustomText
                            subHeader
                            style={{ color: colors.adminColor, fontWeight: 'bold' }}
                            displayText={contactDetail && contactDetail.name}
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
                                    displayText={contactDetail && contactDetail.phone}
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
                                    displayText={contactDetail && contactDetail.email}
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
                                displayText={contactDetail && contactDetail.address}
                            />
                        </View>

                        {/* Send Message */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ width: 80, height: 26, alignItems: 'center', justifyContent: 'center', borderWidth: 1.4, borderRadius: 16, marginTop: 6 }}
                                onPress={onCallPressed}>
                                <CustomText
                                    displayText={isCallActive ? 'End' : 'Call'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 14, width: 120, height: 26, alignItems: 'center', justifyContent: 'center', borderWidth: 1.4, borderRadius: 16, marginTop: 6 }}
                                onPress={() => onMessagePressed(channels, updateChannels)}>
                                <CustomText
                                    displayText={'Send Message'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: colors.grey, marginVertical: 16 }} />

                {contactDetail && contactDetail.callHistory ?
                    <View style={{ marginHorizontal: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CustomText
                                subHeader
                                style={{ fontWeight: 'bold' }}
                                displayText='Call History'
                            />
                        </View>
                        <FlatList
                            scrollEnabled={false}
                            keyExtractor={(item, index) => `${index}`}
                            data={contactDetail && contactDetail.callHistory ? contactDetail.callHistory : []}
                            renderItem={_renderCallHistory}
                        />
                    </View>
                    : null
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default ContactDetailScreenView;