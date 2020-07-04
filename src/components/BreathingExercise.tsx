import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import usePulse from '../hooks/usePulse';
import Timer from './Timer';
import { colors } from '../assets/styles';

const showText = [
  'Znajdź wygodną dla siebie pozycję i wsłuchaj się w swój oddech.',
  'Całą swoją uwagę skoncentruj na spokojnie wykonywanych wdechach i wydechach.',
  'Postaraj się za każdym wdechem wydłużać czas trwania wdechu',
  'Wyobraź sobie drogę jaką pokonuje powietrze w organiźmie.',
  'Postaraj się poczuć przepływ powietrza w Twoim ciele.',
  'Jeżeli w Twoim umyśle pojawiają się jakies myśli to nie szkodzi.',
  'Pozwalaj im odpłynąć ak, jak spokojnie przepływają po niebie chmury.',
  'Wsłuchaj się teraz w rytm swojego serca.',
  'Kolejnym uderzeniem krew przemieszcza się do wszystkich komórek ciała przenosząc im życiodajny tlen',
  'Pozwól sobie na tę chwilę wsłuchania się w siebie',
];

const Circle = (props: { scale: Animated.Value }) => {
  return (
    <Animated.View
      style={[styles.circle, { transform: [{ scale: props.scale }] }]}
    />
  );
};
const Circles = () => {
  const scale1 = usePulse(10000, 2);
  const scale2 = usePulse(9500, 1.8);
  const scale3 = usePulse(9000, 1.6);
  const scale4 = usePulse(8500, 1.4);
  const scale5 = usePulse(8000, 1.2);
  return (
    <>
      <Circle scale={scale1} />
      <Circle scale={scale2} />
      <Circle scale={scale3} />
      <Circle scale={scale4} />
      <Circle scale={scale5} />
    </>
  );
};
const Counting = () => {
  const [textIndex, setTextIndex] = useState(0);
  const text = ['3', '2', '1', 'Zaczynamy'];
  useEffect(() => {
    if (textIndex < 3) {
      const timeout = setTimeout(() => {
        animation();
        setTextIndex(textIndex + 1);
        clearTimeout(timeout);
      }, 1000);
    }
  }, [textIndex]);
  const opacity = useRef(new Animated.Value(1)).current;
  const size = useRef(new Animated.Value(2)).current;
  const animation = () => {
    Animated.sequence([
      Animated.timing(size, {
        duration: 1000,
        toValue: 0.1,
        useNativeDriver: true,
      }),
      Animated.timing(size, {
        duration: 0,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.sequence([
      Animated.timing(opacity, {
        duration: 1000,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: 0,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const scale = { transform: [{ scale: size }] };
  return (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          width: 500,
          height: 500,
          opacity: opacity,
          position: 'absolute',
          margin: 50,
          flex: 1,
        },
        scale,
      ]}
    >
      <Text style={[{ fontSize: 100, color: colors.mintCream }]}>
        {text[textIndex]}
      </Text>
    </Animated.View>
  );
};
const BreathingExercise = (props: { time: number }) => {
  const [showedText, setShowedText] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animation();
    setTimeout(() => {
      setIsStarted(true);
    }, 5000);
  }, []);
  const animation = () => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.delay(5000),
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            delay: 5000,
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 10000,
            useNativeDriver: true,
          }),
        ])
      ).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (showedText > showText.length - 1) {
        setShowedText(0);
      } else {
        setShowedText(showedText + 1);
      }
    }, 20000);
    console.log(showText[showedText]);
  }, [showedText]);

  return (
    <>
      {isStarted ? (
        <Animated.View style={{ opacity: fadeIn }}>
          <Timer time={props.time} />
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
                {showText[showedText]}
              </Animated.Text>
            </View>
            <Circles />
          </View>
        </Animated.View>
      ) : (
        <Counting />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.mintCream,
    borderColor: colors.mediumTurquise,
    borderRadius: 95,
    borderWidth: 2,
    height: 190,
    margin: 50,
    opacity: 0.2,
    width: 190,
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    color: colors.mintCream,
    fontSize: 30,
    margin: 30,
    marginBottom: 50,
    textAlign: 'center',
  },
});
export default BreathingExercise;
