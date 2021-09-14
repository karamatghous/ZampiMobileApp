import {compose, withHandlers, withState, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import {RNTwilioPhone} from 'react-native-twilio-phone';
import _ from 'lodash';
import RNCallKeep from 'react-native-callkeep';
const axios = require('axios');
import ContactDetailScreenView from './ContactDetailScreenView';
import {appName} from '../../services/config';
import {strings} from '../../utils/strings';
import {showAlert} from '../../components/ToastAlert';
import {Platform} from 'react-native';
const mapStateToProps = state => ({
  user: state.auth.user,
});
const enhance = compose(
  connect(mapStateToProps),
  withState('contactDetail', 'setContactDetail', null),
  withState('isCallActive', 'setIsCallActive', false),
  withHandlers({
    // onPlayRecordingPressed:
    //   ({contactDetail, setContactDetail}) =>
    //   async (audioProp, audioIndex) => {
    //     if (contactDetail.callHistory[audioIndex].isPlaying) {
    //       await TrackPlayer.pause();
    //       return;
    //     } else if (contactDetail.callHistory[audioIndex].isLoading) {
    //       await TrackPlayer.stop();
    //       return;
    //     } else if (contactDetail.callHistory[audioIndex].isPaused) {
    //       await TrackPlayer.play();
    //       return;
    //     }
    //     if (contactDetail.callHistory.length > 1) {
    //       _.each(contactDetail.callHistory, eachRec => {
    //         if (
    //           eachRec.recordedVoice &&
    //           audioProp.recordedVoice != eachRec.recordedVoice
    //         ) {
    //           eachRec.isPlaying = false;
    //           eachRec.isLoading = false;
    //           eachRec.isPaused = false;
    //           eachRec.isBuffering = false;
    //           eachRec.isStopped = true;
    //         }
    //       });
    //     }
    //     await TrackPlayer.reset();

    //     global.audioTrackIndex = audioIndex;

    //     TrackPlayer.setupPlayer().then(
    //       async setUpPlayerResp => {
    //         await TrackPlayer.updateOptions({
    //           stopWithApp: true,
    //           capabilities: [
    //             TrackPlayer.CAPABILITY_PLAY,
    //             TrackPlayer.CAPABILITY_PAUSE,
    //             TrackPlayer.CAPABILITY_STOP,
    //           ],
    //           compactCapabilities: [
    //             TrackPlayer.CAPABILITY_PLAY,
    //             TrackPlayer.CAPABILITY_PAUSE,
    //             TrackPlayer.CAPABILITY_STOP,
    //           ],
    //         });
    //         TrackPlayer.addEventListener(
    //           'playback-state',
    //           async data => {
    //             console.log(data);
    //             if (
    //               data.state == TrackPlayer.STATE_BUFFERING &&
    //               global.audioTrackIndex == audioIndex &&
    //               !contactDetail.callHistory[audioIndex].isBuffering
    //             ) {
    //               contactDetail.callHistory[audioIndex].isBuffering = true;
    //               contactDetail.callHistory[audioIndex].isLoading = false;
    //               contactDetail.callHistory[audioIndex].isPlaying = false;
    //               contactDetail.callHistory[audioIndex].isPaused = false;
    //               contactDetail.callHistory[audioIndex].isStopped = false;
    //               setContactDetail(contactDetail);
    //             } else if (
    //               data.state == TrackPlayer.STATE_LOADING &&
    //               global.audioTrackIndex == audioIndex &&
    //               !contactDetail.callHistory[audioIndex].isLoading
    //             ) {
    //               contactDetail.callHistory[audioIndex].isBuffering = false;
    //               contactDetail.callHistory[audioIndex].isLoading = true;
    //               contactDetail.callHistory[audioIndex].isPlaying = false;
    //               contactDetail.callHistory[audioIndex].isPaused = false;
    //               contactDetail.callHistory[audioIndex].isStopped = false;
    //               setContactDetail(contactDetail);
    //             } else if (
    //               data.state == TrackPlayer.STATE_PLAYING &&
    //               global.audioTrackIndex == audioIndex &&
    //               !contactDetail.callHistory[audioIndex].isPlaying
    //             ) {
    //               contactDetail.callHistory[audioIndex].isBuffering = false;
    //               contactDetail.callHistory[audioIndex].isLoading = false;
    //               contactDetail.callHistory[audioIndex].isPlaying = true;
    //               contactDetail.callHistory[audioIndex].isPaused = false;
    //               contactDetail.callHistory[audioIndex].isStopped = false;
    //               setContactDetail(contactDetail);
    //             } else if (
    //               data.state == TrackPlayer.STATE_PAUSED &&
    //               global.audioTrackIndex == audioIndex &&
    //               !contactDetail.callHistory[audioIndex].isPaused &&
    //               !contactDetail.callHistory[audioIndex].isStopped
    //             ) {
    //               contactDetail.callHistory[audioIndex].isPaused = true;
    //               contactDetail.callHistory[audioIndex].isBuffering = false;
    //               contactDetail.callHistory[audioIndex].isPlaying = false;
    //               contactDetail.callHistory[audioIndex].isLoading = false;
    //               contactDetail.callHistory[audioIndex].isStopped = false;
    //               setContactDetail(contactDetail);
    //             } else if (
    //               data.state == TrackPlayer.STATE_STOPPED &&
    //               global.audioTrackIndex == audioIndex &&
    //               !contactDetail.callHistory[audioIndex].isStopped
    //             ) {
    //               contactDetail.callHistory[audioIndex].isPaused = false;
    //               contactDetail.callHistory[audioIndex].isBuffering = false;
    //               contactDetail.callHistory[audioIndex].isPlaying = false;
    //               contactDetail.callHistory[audioIndex].isLoading = false;
    //               contactDetail.callHistory[audioIndex].isStopped = true;
    //               setContactDetail(contactDetail);
    //             }
    //           },
    //           error => {
    //             contactDetail.callHistory[audioIndex].isLoading = false;
    //             setContactDetail(contactDetail);
    //           },
    //         );
    //         TrackPlayer.addEventListener(
    //           'playback-track-changed',
    //           async data => {
    //             console.log(data);
    //           },
    //           error => {
    //             contactDetail.callHistory[audioIndex].isLoading = false;
    //             setContactDetail(contactDetail);
    //           },
    //         );
    //         TrackPlayer.addEventListener(
    //           'playback-queue-ended',
    //           async data => {
    //             console.log(data);
    //             if (!contactDetail.callHistory[audioIndex].isStopped) {
    //               contactDetail.callHistory[audioIndex].isPaused = false;
    //               contactDetail.callHistory[audioIndex].isBuffering = false;
    //               contactDetail.callHistory[audioIndex].isPlaying = false;
    //               contactDetail.callHistory[audioIndex].isLoading = false;
    //               contactDetail.callHistory[audioIndex].isStopped = true;
    //               setContactDetail(contactDetail);
    //             }
    //           },
    //           error => {
    //             contactDetail.callHistory[audioIndex].isLoading = false;
    //             setContactDetail(contactDetail);
    //           },
    //         );
    //         TrackPlayer.add({
    //           id: audioIndex,
    //           url: contactDetail.callHistory[audioIndex].recordedVoice,
    //           title: contactDetail.callHistory[audioIndex].phone,
    //           artist: appName,
    //           artwork: strings['defaultImage'],
    //         }).then(
    //           trackAddResp => {
    //             TrackPlayer.play().then(
    //               async playResp => {
    //                 const position = await TrackPlayer.getPosition();
    //                 const duration = await TrackPlayer.getDuration();
    //                 console.log(`${duration - position} seconds left.`);
    //                 contactDetail.callHistory[audioIndex].isPlaying = true;
    //                 contactDetail.callHistory[audioIndex].isLoading = false;
    //                 contactDetail.callHistory[audioIndex].isPaused = false;
    //                 contactDetail.callHistory[audioIndex].isBuffering = false;
    //                 contactDetail.callHistory[audioIndex].playingMin =
    //                   position / 60;
    //                 contactDetail.callHistory[audioIndex].totalMin =
    //                   duration / 60;
    //                 setContactDetail(contactDetail);
    //               },
    //               error => {
    //                 contactDetail.callHistory[audioIndex].isLoading = false;
    //                 setContactDetail(contactDetail);
    //               },
    //             );
    //           },
    //           error => {
    //             contactDetail.callHistory[audioIndex].isLoading = false;
    //             setContactDetail(contactDetail);
    //           },
    //         );
    //       },
    //       error => {
    //         contactDetail.callHistory[audioIndex].isLoading = false;
    //         setContactDetail(contactDetail);
    //       },
    //     );
    //   },
    // onStopPlayingPressed:
    //   ({contactDetail, setContactDetail}) =>
    //   async (audioProp, audioIndex) => {
    //     contactDetail.callHistory[audioIndex].isPlaying = false;
    //     contactDetail.callHistory[audioIndex].isLoading = false;
    //     contactDetail.callHistory[audioIndex].isPaused = false;
    //     contactDetail.callHistory[audioIndex].isBuffering = false;
    //     contactDetail.callHistory[audioIndex].isStopped = true;
    //     setContactDetail(contactDetail);
    //     await TrackPlayer.stop();
    //   },
    onCallPressed:
      ({contactDetail, user}) =>
      async () => {
        const identity = contactDetail.email;
        var phoneNumber = '7598198955';
        if (identity == 'nijaahnandhrv@digisenz.com')
          phoneNumber = '7598198955';
        else if (identity == 'gopim@digisenz.com') phoneNumber = '9195990852';
        global.phoneNumber = contactDetail.phone;
        RNTwilioPhone.startCall(contactDetail.phone).then(
          resp => {
            console.log(resp);
          },
          err => {
            console.log(err);
          },
        );
      },
    onMessagePressed:
      ({contactDetail, navigation, user}) =>
      (channels, updateChannels) => {
        navigation.navigate('SmsScreen', {contactDetail});
      },
  }),

  lifecycle({
    async componentDidMount() {
      var self = this;
      if (Platform.OS == 'ios') {
      var activeCalls = await RNCallKeep.checkIfBusy();
      if (activeCalls) self.props.setIsCallActive(true);
      }

      var contactDetail =
        self.props.route.params && self.props.route.params.contactProp
          ? self.props.route.params.contactProp
          : null;
      self.props.setContactDetail(contactDetail);
    },
  }),
);

export default enhance(ContactDetailScreenView);
