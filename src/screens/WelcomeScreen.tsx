import React, { useRef } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors } from '../assets/styles';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  console.log('welv');
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const onPress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2200,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      navigation.navigate('main');
    }, 2000);
  };
  return (
    <View style={[styles.container]}>
      <TouchableHighlight
        style={styles.container}
        onPress={onPress}
        underlayColor={'transparent'}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../assets/images/ProductHunt2.png')}
          />
          <Text style={styles.text}>Witej</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  contentCOntainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '60%',
  },
  text: {
    fontSize: 60,
    color: colors.midnightGreen,
  },
});

export default WelcomeScreen;
