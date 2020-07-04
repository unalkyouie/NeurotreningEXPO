import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';

import { number } from '../../assets/consts';
import { colors, appStyles } from '../../assets/styles';
import EndOfExerciseModal from '../EndOfExerciseModal';
import Button from '../Button';
import Timer from '../Timer';

const names = ['Fryzjer', 'Piotrek', 'Hania', 'Tadeusz'];
const { height, width } = Dimensions.get('window');

const PhoneNumber = () => {
  const numberLength = 9;
  const [chosenName, setChosenName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number[]>([]);
  const [isExerciseTimeStarted, setIsExerciseTimeStarted] = useState(false);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [points, setPoints] = useState(0);
  const time = 60;
  useEffect(() => {
    chooseNumber();
    chooseName();
  }, []);
  const startExercise = () => {
    setIsExerciseFinished(false);
    setIsExerciseStarted(true);
    setIsExerciseTimeStarted(true);
    const timeout = setTimeout(() => {
      setIsExerciseTimeStarted(false);
      clearTimeout(timeout);
    }, time * 1000);
  };
  const chooseNumber = () => {
    const arr: number[] = [];
    for (let index = 0; index < numberLength; index++) {
      arr.push(number());
    }
    setPhoneNumber(arr);
  };
  const chooseName = () => {
    setChosenName(names[Math.floor(Math.random() * names.length)]);
  };
  const checkAnswer = () => {
    if (answer.length === phoneNumber.length) {
      for (let index = 0; index < numberLength; index++) {
        if (!(phoneNumber[index] === answer[index])) {
          setIsCorrect(false);
          break;
        }
      }
      setIsCorrect(true);
      setIsExerciseFinished(true);
      setPoints(points + 1);
    } else {
      setIsCorrect(false);
    }
  };
  const renderKeyboard = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return (
      <View style={styles.keyboardWrapper}>
        <View style={styles.answerWrapper}>
          <View style={styles.answer}>
            <Text style={styles.answerText}>{answer}</Text>
          </View>
          <Button
            onPress={() => {
              setAnswer((prev) => {
                const arr = [...prev];
                arr.splice(-1, 1);
                return arr;
              });
            }}
            style={styles.answerButton}
            icon="window-close"
            iconColor={colors.mintCream}
          />
        </View>
        <FlatList
          contentContainerStyle={styles.keyboardContentContainerStyle}
          data={numbers}
          numColumns={3}
          renderItem={({ item }) => (
            <Button
              buttonType="answer"
              text={item.toString()}
              onPress={() => {
                {
                  answer.length < numberLength + 1 &&
                    setAnswer((prev) => {
                      const arr = [...prev, item];
                      return arr;
                    });
                }
              }}
              style={styles.keyboardNumberButton}
              textStyle={styles.keyboardNumberText}
            />
          )}
          style={styles.keyboardList}
        />
        <Button
          onPress={() => {
            checkAnswer();
            setIsExerciseTimeStarted(false);
          }}
          text="Sprawdź"
        />
      </View>
    );
  };
  return (
    <>
      {isExerciseStarted && !isExerciseFinished && isExerciseTimeStarted && (
        <Timer time={time} />
      )}
      <View style={appStyles.container}>
        <View style={styles.exerciseWrapper}>
          {!isExerciseStarted ? (
            <>
              <Text style={appStyles.titleText}>Numer telefonu</Text>
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
                Pokaże się numer telefonu, który należy zapamiętać w ustalonym
                czasie. Następnie należy wybać wcześniej zapamiętany numer na
                klawiaturze
              </Text>
              <Text
                style={[
                  appStyles.titleText,
                  { fontSize: 20, marginVertical: 0 },
                ]}
              >
                Aby rozpocząć naciśnij przycisk poniżej
              </Text>
              <Button buttonType="start" onPress={startExercise} />
            </>
          ) : (
            <>
              {isExerciseTimeStarted ? (
                <>
                  <Text style={styles.text}>Zapamiętaj numer telefonu</Text>
                  <Text style={styles.text}>{chosenName}</Text>
                  <Text style={styles.text}>{phoneNumber}</Text>
                  <Button
                    text="Zapamiętałem"
                    onPress={() => {
                      setIsExerciseTimeStarted(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    {renderKeyboard()}
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
      {isExerciseFinished && (
        <EndOfExerciseModal points={points} startExercise={startExercise} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  answer: {
    backgroundColor: colors.mintCream,
    padding: 15,
    width: '70%',
  },
  answerText: {
    color: colors.midnightGreen,
    fontSize: 26,
  },
  answerButton: {
    backgroundColor: colors.bittersweet,
    marginHorizontal: 5,
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingVertical: 10,
    width: '40%',
    maxHeight: 60,
    maxWidth: 60,
  },
  answerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    flex: 2,
    height,
    justifyContent: 'center',
    width,
  },
  exerciseWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  keyboardBackButton: {
    maxWidth: 50,
    maxHeight: 50,
    paddingVertical: 0,
  },
  keyboardNumberButton: {
    borderColor: colors.midnightGreen,
    borderBottomWidth: 3,
    borderRightWidth: 2,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: 'grey',
    margin: 15,
  },
  keyboardContentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardList: {},
  keyboardNumberText: {
    fontSize: 26,
    color: colors.mintCream,
  },
  keyboardWrapper: {
    backgroundColor: 'grey',
    borderColor: colors.mintCream,
    borderRadius: 20,
    borderWidth: 10,
    width: 0.9 * width,
  },
  text: {
    color: colors.mintCream,
    fontSize: 26,
  },
});
export default PhoneNumber;
