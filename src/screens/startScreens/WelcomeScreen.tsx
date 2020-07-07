import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { colors } from '../../assets/styles';
const { height, width } = Dimensions.get('window');

const WelcomeScreen = () => {
  console.log('welv');
  const navigation = useNavigation();
  return (
    <View style={[styles.container]}>
      <TouchableHighlight
        style={styles.container}
        onPress={() => {
          navigation.navigate('WelcomeIntroduction');
        }}
        underlayColor={'transparent'}
      >
        <LinearGradient
          colors={['#4ecdc4', '#88dac8', '#b3e6d1', '#f7fff7']}
          style={styles.linearGradient}
        >
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../../assets/images/ProductHunt2.png')}
            />
            <Text style={styles.text}>Witej</Text>
          </View>
        </LinearGradient>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width,
    height,
  },
  contentCOntainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 0.8 * width,
    height: 0.6 * height,
  },
  text: {
    fontSize: 60,
    color: colors.midnightGreen,
  },
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

export default WelcomeScreen;
