import React, { useState, useEffect, Dispatch } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';

import DictionaryProvider from '../../api/DictionaryProvider';
import { lettersList } from '../../assets/consts';
import { colors, appStyles } from '../../assets/styles';
import Button from '../Button';
import EndOfExerciseModal from '../EndOfExerciseModal';
import List from '../List';
import Timer from '../Timer';
import { useDispatch, useSelector } from 'react-redux';
import { PointsActions, setPoints } from '../../reducers/pointsReducer';
import { AppState } from '../../reducers';
const { height, width } = Dimensions.get('window');

const CompleteWords = () => {
  const dispatchPoints = useDispatch<Dispatch<PointsActions>>();
  const previousPoints = useSelector<AppState, number>(
    (state) => state.points.points
  );
  const [wordsList, setWordsList] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');
  const [letter, setLetter] = useState('');
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const time = 300;
  useEffect(() => {
    setWordsList([]);
    setCurrentPoints(previousPoints);
    const l = Math.floor(Math.random() * lettersList.length);
    setLetter(lettersList[l]);
  }, []);

  const startExercise = () => {
    setIsExerciseStarted(true);
    setIsExerciseFinished(false);
    dispatchPoints(setPoints(currentPoints));
    setTimeout(() => {
      setIsExerciseStarted(false);
      setIsExerciseFinished(true);
    }, time * 1000);
  };
  const isWordValid = async () => {
    try {
      const res = await DictionaryProvider.numberOfWords(newWord);
      if (res.response > 0) {
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
    }
    return false;
  };
  const isWordUsed = () => {
    if (wordsList.indexOf(newWord) > -1) {
      return true;
    }
    return false;
  };
  const addNewWord = async () => {
    const isValid = await isWordValid();
    if (newWord[0] === letter && newWord.length > 1) {
      if (isValid && !isWordUsed()) {
        setWordsList((prev) => {
          const arr = [...prev, newWord];
          return arr;
        });
        setCurrentPoints(currentPoints + 1);
      }
    }
  };
  return (
    <>
      {isExerciseStarted && !isExerciseFinished && <Timer time={time} />}
      <View style={appStyles.container}>
        {!isExerciseStarted ? (
          <>
            <Text style={appStyles.titleText}>Znajdowanie słów</Text>
            <Text
              style={[
                appStyles.titleText,
                {
                  fontSize: 24,
                  marginVertical: 0,
                  marginHorizontal: 30,
                  textAlign: 'center',
                },
              ]}
            >
              Zadanie polega na ułożeniu jak największej ilości wyrazów
              rozpoczynających się na podaną literę.
            </Text>
            <Text
              style={[appStyles.titleText, { fontSize: 20, marginVertical: 0 }]}
            >
              Aby rozpocząć naciśnij przycisk poniżej
            </Text>
            <Button onPress={startExercise} buttonType="start" />
          </>
        ) : (
          <>
            <Timer time={time} />
            <View style={styles.inputWrapper}>
              <View style={styles.letterContainer}>
                <Text style={styles.letter}>{letter}</Text>
              </View>
              <TextInput
                autoFocus={true}
                clearTextOnFocus={true}
                style={styles.input}
                onChangeText={(text) => {
                  setNewWord(letter + text.toLowerCase());
                }}
              />
              <Button
                icon="plus"
                onPress={addNewWord}
                iconColor={colors.mintCream}
                style={{
                  borderColor: 'transparent',
                  backgroundColor: 'transparent',
                  padding: 10,
                }}
              />
            </View>
            <View style={styles.listWrapper}>
              <List data={wordsList} />
            </View>
          </>
        )}
      </View>
      {isExerciseFinished && (
        <EndOfExerciseModal
          points={currentPoints}
          startExercise={startExercise}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: colors.midnightGreen,
    color: colors.midnightGreen,
    fontSize: 40,
    maxHeight: 50,
    maxWidth: 0.5 * width,
    minWidth: 0.5 * width,
  },
  inputWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    maxHeight: 100,
  },
  letter: {
    color: colors.midnightGreen,
    fontSize: 40,
  },
  letterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listWrapper: {
    backgroundColor: colors.yellow,
    minHeight: 200,
    minWidth: 200,
    maxWidth: 300,
  },
});
export default CompleteWords;
