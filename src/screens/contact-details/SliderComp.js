import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

export default function SliderComp() {
  const {position, duration} = useProgress();
  console.log(position, 'position');
  console.log(duration, 'duration');
  const m = Math.max(duration);
  console.log(m, 'maximum number');
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

  return (
    <View>
      <Slider
        style={{width: 320, height: 40, alignItems: 'center'}}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="red"
        onSlidingComplete={_handleChnage}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timers}>{formatTime(position)}</Text>
        <Text style={styles.timers}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  timers: {
    color: 'black',
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
