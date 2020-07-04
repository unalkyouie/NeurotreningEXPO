import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DictionaryProvider from '../../api/DictionaryProvider';
import { consonant, vowels } from '../../assets/consts';
import { colors, appStyles } from '../../assets/styles';
import Button from '../Button';
import EndOfExerciseModal from '../EndOfExerciseModal';
import List from '../List';
import Timer from '../Timer';

const exerciseDescripton = `W ciągu 5 minut ułóż jak najwięcej wyrazów składających się z poniższego
zestawu liter. Nie musisz za każdym razem wykorzystywać wszystkich
liter. Litery do wykorzystania: `;
const { height, width } = Dimensions.get('window');

const BuildWords = () => {
  const [lettersToUse, setLettersToUse] = useState<string[]>([]);
  const [wordsList, setWordsList] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  const [points, setPoints] = useState(0);
  const time = 300;

  useEffect(() => {
    setWordsList([]);
    getLetters();
    console.log(lettersToUse);
  }, []);
  const startExercise = () => {
    setIsExerciseStarted(true);
    setIsExerciseFinished(false);
    const timeout = setTimeout(() => {
      setIsExerciseStarted(false);
      setIsExerciseFinished(true);
      clearTimeout(timeout);
    }, time * 1000);
  };

  const isWordValid = () => {
    for (let index = 0; index < newWord.length; index++) {
      const element = newWord[index];
      if (!(lettersToUse.indexOf(element) > -1)) {
        return false;
      }
    }
    return true;
  };

  const wordExists = async () => {
    try {
      const res = await DictionaryProvider.numberOfWords(newWord);
      if (res.response > 0) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const addWord = async () => {
    const exsits = await wordExists();
    if (newWord.length > 1 && !(wordsList.indexOf(newWord) > -1)) {
      if (exsits && isWordValid()) {
        setWordsList((prev) => {
          const arr = [...prev, newWord];
          return arr;
        });
        setPoints(points + 1);
      }
    }
  };

  const getLetters = () => {
    const arrOfLetters: string[] = [];
    let index = 0;
    while (index < 3) {
      const l = Math.floor(Math.random() * consonant.length);
      const c = consonant[l];
      if (!(arrOfLetters.indexOf(c) > -1)) {
        arrOfLetters.push(c);
        index++;
      }
    }
    while (index < 5) {
      const l = Math.floor(Math.random() * vowels.length);
      const v = vowels[l];
      if (!(arrOfLetters.indexOf(v) > -1)) {
        arrOfLetters.push(v);
        index++;
      }
    }
    setLettersToUse(arrOfLetters);
  };

  return (
    <>
      {isExerciseStarted && !isExerciseFinished && <Timer time={time} />}
      <View style={appStyles.container}>
        {!isExerciseStarted ? (
          <>
            <Text style={appStyles.titleText}>Układanie słów</Text>
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
              Zadanie polega na ułożeniu jak największej ilości wyrazów z
              podanych liter. Każdej litery można użyć wiele razy, natomiast nie
              można użyć innych liter. W każdym momencie można wylosowany zestaw
              zmienić, jednak skutkuje to rozpoczęciem zadania od początku.
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
            <View style={styles.lettersWrapper}>
              <Text style={styles.text}>
                {`${exerciseDescripton} ${lettersToUse
                  .toString()
                  .toUpperCase()}`}
              </Text>
              <TouchableOpacity
                onPress={getLetters}
                style={{
                  alignSelf: 'flex-end',
                  width: 50,
                  height: 50,
                }}
              >
                <Icon color={colors.midnightGreen} name="refresh" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                autoFocus={true}
                clearTextOnFocus={true}
                style={styles.input}
                onChangeText={(text) => setNewWord(text)}
              />
              <Button
                icon="plus"
                onPress={addWord}
                iconColor={colors.mintCream}
                style={{
                  borderColor: 'transparent',
                  backgroundColor: 'transparent',
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
        <EndOfExerciseModal points={points} startExercise={startExercise} />
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
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: colors.midnightGreen,
    borderWidth: 0,
    color: colors.midnightGreen,
    fontSize: 30,
    maxHeight: 50,
    maxWidth: 300,
    minWidth: 300,
  },
  inputWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    maxHeight: 100,
  },
  letter: {},
  lettersWrapper: {
    flexDirection: 'row',
  },
  listWrapper: {
    backgroundColor: colors.yellow,
    minHeight: 200,
    minWidth: 300,
    maxWidth: 300,
  },
  text: {
    color: colors.midnightGreen,
    fontSize: 24,
    textAlign: 'center',
  },
});
export default BuildWords;
