import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { bigNumber, number } from '../../assets/consts';
import { colors, appStyles } from '../../assets/styles';
import Button from '../Button';
import EndOfExerciseModal from '../EndOfExerciseModal';
import PointsContainer from '../PointsContainer';
import Timer from '../Timer';
const time = 60;

const OrderOfNumbers = () => {
  const [howManyNumbersToRender, setHowManyNumbersToRender] = useState(3);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [numbersToRender, setNumbersToRender] = useState<number[]>([]);
  const [points, setPoints] = useState(-1);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  useEffect(() => {
    if (numbersToRender.length === 0) {
      setNumbers();
      setPoints(points + 1);
    }
  }, [numbersToRender]);
  useEffect(() => {
    if (points > 0) {
      if (points % 10 === 0) {
        setHowManyNumbersToRender(howManyNumbersToRender + 1);
      }
    }
  }, [points]);

  const startExercise = () => {
    setNumbers();
    setIsExerciseStarted(true);
    const timeout = setTimeout(() => {
      setIsExerciseFinished(true);
      clearTimeout(timeout);
    }, time * 1000);
  };
  const setNumbers = () => {
    setNumbersToRender([]);
    let index = 0;
    while (index < howManyNumbersToRender) {
      const newNumber = points < 20 ? number() : bigNumber();
      if (numbersToRender.indexOf(newNumber) === -1) {
        setNumbersToRender((prev) => {
          const arr: number[] = [...prev, newNumber];
          return arr;
        });
        index++;
      }
    }
  };

  const renderNumbers = numbersToRender.map((item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          const arr = [...numbersToRender];
          const index = arr.indexOf(item);
          const min = Math.min(...arr);
          if (min === item) {
            setNumbersToRender([]);
            arr.splice(index, 1);
            setNumbersToRender(arr);
          } else {
            setNumbers();
          }
          if (numbersToRender.length === 0) {
            setPoints(points + 1);
          }
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
        }}
      >
        <ImageBackground
          source={require('../../assets/images/cloud.png')}
          style={styles.image}
        >
          <Text style={styles.buttonText}>{item.toString()}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  });
  return (
    <>
      {isExerciseStarted && !isExerciseFinished && <Timer time={time} />}
      <View style={appStyles.container}>
        {!isExerciseStarted ? (
          <>
            <Text style={appStyles.titleText}>Kolejność liczb</Text>
            <Text
              style={[
                appStyles.titleText,
                {
                  fontSize: 18,
                  marginVertical: 0,
                  textAlign: 'center',
                },
              ]}
            >
              Zadanie polega na uporządkowaniu liczb w kolejności rosnącej. Z
              wyświetlonych liczb wybierz tą, która jest najmniejsza. W
              przypadku dwóch takich samych wartości nie ma znaczenia, którą
              wypierzesz.
            </Text>
            <Text
              style={[appStyles.titleText, { fontSize: 16, marginVertical: 0 }]}
            >
              Aby rozpocząć naciśnij przycisk poniżej
            </Text>
            <Button buttonType="start" onPress={startExercise} />
          </>
        ) : (
          <>
            <View style={styles.numbersContainer}>{renderNumbers}</View>
          </>
        )}
      </View>
      {isExerciseStarted && <PointsContainer points={points} />}
      {isExerciseFinished && (
        <EndOfExerciseModal
          startExercise={() => {
            setIsExerciseFinished(false);
            startExercise();
          }}
          points={points}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  answersContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  },
  buttonText: {
    color: colors.midnightGreen,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numbersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    height: '80%',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: colors.richBlack,
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 100,
    height: 100,
    alignItems: 'center',
  },
});

export default OrderOfNumbers;
