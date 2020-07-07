import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { ExercisesNavigator } from '../Navigation';

const { height, width } = Dimensions.get('window');

const ExerciseScreen = () => {
  return (
    <>
      <LinearGradient
        colors={['#4ecdc4', '#88dac8', '#b3e6d1', '#f7fff7']}
        style={styles.linearGradient}
      >
        <ExercisesNavigator />
      </LinearGradient>
    </>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    alignSelf: 'center',
    bottom: 0,
    top: 0,
    left: 0,
    width,
    height,
    right: 0,
    justifyContent: 'center',
  },
});

export default ExerciseScreen;
