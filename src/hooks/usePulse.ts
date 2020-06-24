import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

const usePulse = (startDelay = 5000, value = 1.2) => {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.delay(startDelay),
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.0,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: value,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1.0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
  }, []);

  return scale;
};

export default usePulse;
