import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import { colors, appStyles } from '../assets/styles';
import { ExercisesNavigator } from '../Navigation';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

const ExerciseScreen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);
  const [subscription, setSubscription] = useState<NetInfoSubscription | null>(
    null
  );

  useEffect(() => {
    setSubscription(NetInfo.addEventListener(handleConnectivityChange));
  }, []);
  const handleConnectivityChange = (state: NetInfoState) => {
    setIsConnected(state.isConnected);
  };
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
