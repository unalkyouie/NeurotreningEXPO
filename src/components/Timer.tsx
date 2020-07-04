import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
const { height, width } = Dimensions.get('window');

const formatNumber = (number: number) => `0${number}`.slice(-2);

const getRemaining = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

const Timer = (props: { time: number }) => {
  const [remainingSec, setRemainingSec] = useState(props.time);
  const { mins, secs } = getRemaining(remainingSec);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSec(remainingSec - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingSec]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{`${mins}:${secs}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    resizeMode: 'cover',
  },
  timer: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Timer;
