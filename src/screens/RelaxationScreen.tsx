import React, { Dispatch, useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { appStyles } from '../assets/styles';
import BreathingExercise from '../components/BreathingExercise';
import Button from '../components/Button';
import { AppState } from '../reducers';
import {
  setRelaxation,
  RelaxationActions,
} from '../reducers/relaxationReducer';

const { height, width } = Dimensions.get('window');

const RelaxationScreen = () => {
  const dispatch = useDispatch<Dispatch<RelaxationActions>>();
  const background = useSelector<AppState, string>(
    (state) => state.background.background
  );
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const time = 300;

  useEffect(() => {
    if (isExerciseStarted) {
      setTimeout(() => {
        dispatch(setRelaxation(false));
        setIsExerciseStarted(false);
      }, (time + 5) * 1000);
    }
  }, [isExerciseStarted]);
  return (
    <View style={[appStyles.container]}>
      <ImageBackground
        style={styles.image}
        source={require(`../assets/images/${background}`)}
      >
        {!isExerciseStarted && (
          <View>
            <Text style={appStyles.titleText}>Zrelaksuj się</Text>
            <Text
              style={[appStyles.titleText, { fontSize: 24, marginVertical: 0 }]}
            >
              Bierz wdech gdy kółko będzie rosło i wydychaj gdy będzie malało
            </Text>
            <Text
              style={[appStyles.titleText, { fontSize: 20, marginVertical: 0 }]}
            >
              Aby rozpocząć naciśnij przycisk poniżej
            </Text>
          </View>
        )}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          {isExerciseStarted ? (
            <BreathingExercise time={time} />
          ) : (
            <Button
              // buttonType="start"
              onPress={() => {
                setIsExerciseStarted(true);
              }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    top: 0,
    left: 0,
    width,
    height,
    right: 0,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-around',
  },
});
export default RelaxationScreen;
