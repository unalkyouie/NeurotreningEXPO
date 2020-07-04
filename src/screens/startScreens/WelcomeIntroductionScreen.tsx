import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { appStyles } from '../../assets/styles';
const { height, width } = Dimensions.get('window');

const WelcomeIntroductionScreen = () => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={appStyles.container}
      onPress={() => {
        navigation.navigate('WelcomeSignUpScreen');
      }}
    >
      <LinearGradient
        colors={['#4ecdc4', '#88dac8', '#b3e6d1', '#f7fff7']}
        style={styles.linearGradient}
      >
        <Image source={require('../../assets/images/ProductHunt1.png')} />
        <Text>Opis Aplikacji </Text>
      </LinearGradient>
    </TouchableHighlight>
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
export default WelcomeIntroductionScreen;
