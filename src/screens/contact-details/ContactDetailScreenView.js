import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
  Dimensions,
  Platform,
  Text,
  Linking,
  Button,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import * as Progress from 'react-native-progress';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

import {ActionBar, CustomText} from '../../components';
import {colors} from '../../styles';
import {strings} from '../../utils/strings';
import {useApp} from '../chat-list/app-context';
import Slider from '@react-native-community/slider';
import {RFValue} from 'react-native-responsive-fontsize';

const ContactDetailScreenView = props => {
  const {
    navigation,
    contactDetail,
    onPlayRecordingPressed,
    onStopPlayingPressed,
    onCallPressed,
    onMessagePressed,
    isCallActive,
  } = props;
  const winWidth = Dimensions.get('window').width;
  const {position, duration} = useProgress();
  const isPlaying = useRef('paused'); //paused play loading

  const _handleChnage = val => {
    console.log(val, 'value');
    TrackPlayer.seekTo(val);
  };
  const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };
  const winHeight = Dimensions.get('window').height;
  const tracks = [
    {
      title: 'first track',
      artist: 'karamat',
      artwork: 'react',
      url: 'https://www.chosic.com/wp-content/uploads/2021/04/kvgarlic__largestreamoverloginforestmarch.mp3',
      id: 1,
    },
  ];
  const playbackstate = usePlaybackState();
  // TrackPlayer.updateOptions({
  //   stopWithApp: false,
  //   capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  //   compactCapabilities: [
  //     TrackPlayer.CAPABILITY_PLAY,
  //     TrackPlayer.CAPABILITY_PAUSE,
  //   ],
  // });
  // const _callHistory = async () => {
  //   try {
  //     await TrackPlayer.setupPlayer();
  //     await TrackPlayer.add(tracks);
  //     console.log('track added');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   _callHistory();
  //   return () => TrackPlayer.destroy();
  // }, []);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add(tracks);
    });
  }, []);

  const {channels, updateChannels} = useApp();
  var history = ['Pankaj', 'Rita', 'Mohan', 'Amit', 'Babulal', 'Sakshi'];
  const _onRenderCallHistory = ({item, index}) => {
    console.log(item, 'this is item');
    return (
      <View
        style={{
          width: winWidth * 0.95,
          height: (winHeight * 0.5) / 3,
          borderWidth: 0.3,
          borderColor: '#D7D7D7',
          alignSelf: 'center',
          borderRadius: 4,
          marginBottom: '2%',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '56%',
              marginTop: '4%',
            }}>
            <Foundation
              style={{
                color: colors.iconcolor,
                width: '14%',
                marginTop: '2%',
                marginLeft: '4%',
              }}
              name="telephone"
              size={RFValue(17)}
            />
            <CustomText
              subHeader
              numberOfLines={1}
              style={{marginLeft: 2, width: '86%', fontSize: RFValue(14)}}
              displayText={'2123851384'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
              marginTop: '4%',
            }}>
            <Ionicons
              style={{color: colors.iconcolor, width: '14%'}}
              name="calendar"
              size={RFValue (17)}
            />
            <CustomText
              subHeader
              numberOfLines={1}
              style={{marginLeft: 2, width: '86%', fontSize: RFValue(14)}}
              // displayText={moment(item.date).format('LL')}
              displayText="June 16, 2020"
            />
          </View>
        </View>
        <View
          style={{
            marginTop: '5%',
            // marginLeft: '1%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignSelf: 'center'}}
            onPress={() => onPlayPause(index)}>
            {returnPlayBtn()}
          </TouchableOpacity>
          <Text style={styles.timers}>{formatTime(position)}</Text>
          <Slider
            style={{
              width: "67%",
              // height: 40,
              alignItems: 'center',
              marginTop: '1%',
            }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#F8C84B"
            maximumTrackTintColor="#E7EBEF"
            thumbTintColor={colors.adminColor}
            onSlidingComplete={_handleChnage}
          />
          <View style={styles.timeContainer}>
            {/* {tracks.map(id => (
              <Text>{id}</Text>
            ))} */}
            <Text style={styles.timers}>{formatTime(duration)}</Text>
            {/* <Text style={styles.timers}>{item.duration[0]}</Text> */}
          </View>
        </View>
      </View>
    );
  };
  const onPlayPause = async url => {
    console.log(url, 'url of press');
    if (isPlaying.current === 'playing') {
      await TrackPlayer.pause(url);
      return;
    } else if (isPlaying.current === 'paused') {
      await TrackPlayer.play(url);
      return;
    }
  };
  useEffect(() => {
    console.log(playbackstate, 'play back');
    if (
      playbackstate === 2 ||
      playbackstate === 0 ||
      playbackstate === 1 ||
      playbackstate === 8 ||
      playbackstate === 6 ||
      playbackstate === 'paused' ||
      playbackstate === 'ready' ||
      playbackstate === 'idle'
    ) {
      isPlaying.current = 'paused';
      console.log('paused state');
    } else {
      isPlaying.current = 'playing';
      console.log('playing state');
    }
  }, [playbackstate]);

  const returnPlayBtn = () => {
    switch (isPlaying.current) {
      case 'playing':
        return (
          <Foundation
            color="black"
            name="pause"
            size={RFValue(20)}
            style={{color: '#E5E5E5'}}
          />
        );
      case 'paused':
        return (
          <Foundation
            color="black"
            name="play"
            size={RFValue (20)}
            style={{color: '#E5E5E5'}}
          />
        );
    }
  };

  // var progress = useTrackPlayerProgress();

  // const _renderCallHistory = ({item, index}) => {
  //   var totalMins = item.totalMin || 0;
  //   if (progress && progress.duration) {
  //     totalMins = progress.duration / 60;
  //     item.totalMin = totalMins;
  //   }

  //   var playingMin = item.playingMin || 0;
  //   if (progress && progress.position) {
  //     playingMin = progress.position / 60;
  //     item.playingMin = playingMin;
  //   }

  //   return (
  //     <View style={{padding: 16, marginTop: index == 0 ? 16 : 0}}>
  //       {/* Number & Date */}
  //       <View
  //         style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
  //         {/* Number */}
  //         <View
  //           style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
  //           <Foundation
  //             style={{color: '#53A8E2', width: '14%', marginTop: 2}}
  //             name="telephone"
  //             size={18}
  //           />
  //           <CustomText
  //             subHeader
  //             numberOfLines={1}
  //             style={{marginLeft: 2, width: '86%'}}
  //             displayText={item.phone}
  //           />
  //         </View>

  //         {/* Date */}
  //         <View
  //           style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
  //           <Ionicons
  //             style={{color: '#53A8E2', width: '14%'}}
  //             name="calendar"
  //             size={18}
  //           />
  //           <CustomText
  //             subHeader
  //             numberOfLines={1}
  //             style={{marginLeft: 2, width: '86%'}}
  //             displayText={moment(item.date).format('LL')}
  //           />
  //         </View>
  //       </View>

  //       {/* Audio Recording */}
  //       {item.recordedVoice ? (
  //         <View
  //           style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
  //           {item.isLoading || item.isBuffering ? (
  //             <Progress.Circle
  //               style={{marginRight: 6000}}
  //               size={20}
  //               indeterminate={true}
  //             />
  //           ) : (
  //             <Ionicons
  //               onPress={() => onPlayRecordingPressed(item, index)}
  //               style={{
  //                 color: colors.greyLighter,
  //                 paddingRight: 4,
  //                 marginLeft: -4,
  //               }}
  //               name={item.isPlaying ? 'pause' : 'play'}
  //               size={28}
  //             />
  //           )}
  //           {item.isPlaying ||
  //           item.isLoading ||
  //           item.isBuffering ||
  //           item.isPaused ? (
  //             <Ionicons
  //               onPress={() => onStopPlayingPressed(item, index)}
  //               style={{color: colors.greyLighter, paddingRight: 4}}
  //               name={'stop'}
  //               size={28}
  //             />
  //           ) : null}
  //           {item.isPlaying ||
  //           item.isLoading ||
  //           item.isBuffering ||
  //           item.isPaused ? (
  //             <View>
  //               <Entypo
  //                 style={{color: colors.greyLighter, paddingRight: 4}}
  //                 name={'ccw'}
  //                 size={28}
  //               />
  //               <TouchableOpacity
  //                 style={{
  //                   position: 'absolute',
  //                   top: 0,
  //                   left: 10,
  //                   right: 0,
  //                   bottom: 0,
  //                   justifyContent: 'center',
  //                 }}
  //                 onPress={() => {
  //                   var seekPosition =
  //                     progress.position > 10 ? progress.position - 5 : 0;
  //                   TrackPlayer.seekTo(seekPosition);
  //                 }}>
  //                 <CustomText
  //                   style={{color: colors.greyLighter, fontSize: 8}}
  //                   displayText={'-10'}
  //                 />
  //               </TouchableOpacity>
  //             </View>
  //           ) : null}
  //           {item.isPlaying ||
  //           item.isLoading ||
  //           item.isBuffering ||
  //           item.isPaused ? (
  //             <View>
  //               <Ionicons
  //                 style={{color: colors.greyLighter, paddingRight: 4}}
  //                 name={'reload'}
  //                 size={28}
  //               />
  //               <TouchableOpacity
  //                 style={{
  //                   position: 'absolute',
  //                   top: 0,
  //                   left: 6,
  //                   right: 0,
  //                   bottom: 0,
  //                   justifyContent: 'center',
  //                 }}
  //                 onPress={() => {
  //                   var seekPosition =
  //                     progress.position + 10 > progress.duration
  //                       ? progress.duration
  //                       : progress.position + 10;
  //                   TrackPlayer.seekTo(seekPosition);
  //                 }}>
  //                 <CustomText
  //                   style={{color: colors.greyLighter, fontSize: 8}}
  //                   displayText={'+10'}
  //                 />
  //               </TouchableOpacity>
  //             </View>
  //           ) : null}
  //           {item.isPlaying ||
  //           item.isLoading ||
  //           item.isBuffering ||
  //           item.isPaused ? (
  //             <CustomText
  //               style={{color: colors.greyLighter, marginRight: 4}}
  //               displayText={playingMin.toFixed(2)}
  //             />
  //           ) : null}

  //           <Progress.Bar
  //             style={{height: 12, marginRight: 4}}
  //             borderRadius={6}
  //             borderWidth={0}
  //             color={colors.adminColor}
  //             unfilledColor={colors.greyLighter}
  //             progress={
  //               (item.isPlaying || item.isBuffering || item.isPaused) &&
  //               totalMins > 0
  //                 ? playingMin / totalMins
  //                 : 0
  //             }
  //             height={12}
  //             width={
  //               item.isPlaying || item.isBuffering || item.isPaused
  //                 ? Dimensions.get('screen').width - 252
  //                 : Dimensions.get('screen').width - 90
  //             }
  //           />

  //           {item.isPlaying ||
  //           item.isLoading ||
  //           item.isBuffering ||
  //           item.isPaused ? (
  //             <CustomText
  //               style={{color: colors.greyLighter}}
  //               displayText={totalMins.toFixed(2)}
  //             />
  //           ) : null}
  //         </View>
  //       ) : null}
  //     </View>
  //   );
  // };
  const _renderAppointment = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            borderWidth: 0.2,
            borderColor: '#D7D7D7',
            width: '90%',
            height: 59,
            backgroundColor: '#FFFFFF',
            marginBottom: 10,
            // justifyContent: 'center',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Avatar
              containerStyle={{marginLeft: 10}}
              // avatarStyle={{marginLeft:10}}
              rounded
              //
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
              size={RFValue (32)}
            />
          </View>

          <View style={{paddingLeft: 10}}>
            <Text style={{color: '#454545', fontWeight: 'bold', fontSize:RFValue (12)}}>
              Karamat Ghous
            </Text>
            <Text style={{color: '#454545', marginTop: 10, fontSize:RFValue (12)}}>
              jhelum
            </Text>
          </View>
          <View style={{marginLeft: 40}}>
            <View style={{marginTop: 5, flexDirection: 'row'}}>
              <Ionicons
                style={{color: colors.iconcolor}}
                name="calendar"
                size={RFValue (16)}
              />
              <Text style={{marginLeft: 5, color: '#454545'}}>Jun 16,2020</Text>
            </View>
            <View style={{marginTop: 5, flexDirection: 'row'}}>
              <Ionicons
                style={{color: colors.iconcolor}}
                name="time"
                size={RFValue (16)}
              />
              <Text style={{marginLeft: 5, color: '#454545'}}>
                9:00 - 10:00 AM
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* <ScrollView contentContainerStyle={{flex: 1}}> */}
      <ActionBar
        navigation={navigation}
        title={contactDetail && contactDetail.name ? contactDetail.name : ''}
      />

      <View
        style={{
          height: 1,
          backgroundColor: colors.grey,
          marginTop: -6,
          marginBottom: 16,
        }}
      />

      {/* Profile Image, Name, Phone, email, Address & Send Message */}
      <View style={{flexDirection: 'row', marginHorizontal: 16}}>
        {/*  Profile Image */}
        <View style={{width: '20%', marginTop: 19, marginRight: 10}}>
          <Avatar
            rounded
            // source={{
            //   uri: props.route.params.contactProp.photo
            //     ? props.route.params.contactProp.photo
            //     : strings['defaultImage'],
            // }}
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            size={RFValue (72)}
          />
        </View>

        {/* Name, Phone, email, Address & Send Message */}
        <View style={{width: '80%', paddingLeft: 10}}>
          <CustomText
            subHeader
            style={{
              color: colors.adminColor,
              fontWeight: 'bold',
              fontSize:RFValue (18),
            }}
            displayText={
              props.route.params.contactProp.fname +
              props.route.params.contactProp.lname
            }
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
                width: '40%',
                paddingRight: 5,
              }}>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Foundation
                  style={{
                    color: colors.iconcolor,
                    marginTop: 3,
                    marginRight: 5,
                  }}
                  name="telephone"
                  size={RFValue (13)}
                />
                <CustomText
                  title
                  numberOfLines={1}
                  style={{marginLeft: 2, width: '86%', fontSize:RFValue (12)}}
                  displayText={props.route.params.contactProp.number}
                />
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Foundation
                  style={{
                    color: colors.iconcolor,
                    marginTop: '3%',
                    marginRight: 5,
                  }}
                  name="mail"
                  size={RFValue (13)}
                />
                <CustomText
                  title
                  numberOfLines={1}
                  style={{paddingLeft: 2, width: '75%', fontSize:RFValue (12)}}
                  displayText={props.route.params.contactProp.email1}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Address */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginTop: 5,
            }}>
            <Entypo
              style={{color: colors.iconcolor}}
              name="price-ribbon"
              size={RFValue (13)}
            />
            <CustomText
              numberOfLines={2}
              style={{paddingLeft: 3, width: '90%', fontSize:RFValue (12)}}
              displayText={props.route.params.contactProp.fname}
            />
          </View>

          {/* Send Message */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: RFValue (7),
              marginLeft: -16,
            }}>
            {/* <TouchableOpacity
                style={{
                  width: 80,
                  height: 26,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1.4,
                  borderRadius: 16,
                  marginTop: 6,
                }}
                onPress={onCallPressed}>
                <CustomText displayText={isCallActive ? 'End' : 'Call'} />
              </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                marginLeft: 14,
                width: "30%",
                // height: "40%",
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderWidth: 1.33,
                borderRadius: 29.18,
                marginTop:RFValue (6),
              }}
              onPress={() => onMessagePressed(channels, updateChannels)}>
              <CustomText
                displayText={'Send Message'}
                style={{
                  marginBottom: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize:RFValue (10),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: colors.grey,
          marginTop: '7%',
          marginBottom: 16,
        }}
      />
      <View
        style={{
          height: winHeight * 0.1,
          width: '100%',
          // backgroundColor: 'red',
          justifyContent: 'center',
          marginLeft: '2%',
        }}>
        <Text style={{fontSize:RFValue(20)}}>Call History</Text>
      </View>

      <FlatList
        // scrollEnabled={true}
        data={tracks}
        renderItem={_onRenderCallHistory}
        keyExtractor={item => item}
      />

      {/* <FlatList
          scrollEnabled={true}
          renderItem={_renderAppointment}
          data={history}
          keyExtractor={item => item}
        /> */}

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  timers: {
    color: '#E5E5E5',
    fontSize:RFValue (14),
    marginLeft: '4%',
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ContactDetailScreenView;
