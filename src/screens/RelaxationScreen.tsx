import React, {useState, useEffect, Dispatch} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import BreathingExercise from '../components/BreathingExercise';
import Button from '../components/Button';
import {appStyles} from '../assets/styles';
import {setRelaxation, RelaxationActions} from '../reducers/relaxationReducer';
import {useNavigation} from '@react-navigation/native';

const RelaxationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<Dispatch<RelaxationActions>>();
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const time = 300;

  useEffect(() => {
    if (isExerciseStarted) {
      setTimeout(() => {
        dispatch(setRelaxation(false));
        setIsExerciseStarted(false);
        navigation.navigate('main');
      }, (time + 5) * 1000);
    }
  }, [isExerciseStarted]);
  return (
    <View style={[appStyles.container]}>
      {!isExerciseStarted && (
        <View>
          <Text style={appStyles.titleText}>Zrelaksuj się</Text>
          <Text
            style={[appStyles.titleText, {fontSize: 24, marginVertical: 0}]}>
            Bierz wdech gdy kółko będzie rosło i wydychaj gdy będzie malało
          </Text>
          <Text
            style={[appStyles.titleText, {fontSize: 20, marginVertical: 0}]}>
            Aby rozpocząć naciśnij przycisk poniżej
          </Text>
        </View>
      )}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        {isExerciseStarted ? (
          <BreathingExercise time={time} />
        ) : (
          <Button
            buttonType="start"
            onPress={() => {
              setIsExerciseStarted(true);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default RelaxationScreen;
