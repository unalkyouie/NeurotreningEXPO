import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { number, bigNumber } from '../../assets/consts';
import { colors, appStyles } from '../../assets/styles';
import Button from '../Button';
import EndOfExerciseModal from '../EndOfExerciseModal';
import PointsContainer from '../PointsContainer';
import Timer from '../Timer';

interface EquationProps {
  n1: number;
  n2: number;
  sign: Sign;
}
enum answers {
  undefined,
  smaller,
  bigger,
  equal,
}
enum Sign {
  plus,
  minus,
}

const Equations = () => {
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [answer, setAnswer] = useState<answers>(answers.undefined);
  const [isCorrect, setIsCorrect] = useState(false);
  const [equation1, setEquation1] = useState<EquationProps>({
    n1: 1,
    n2: 1,
    sign: Sign.plus,
  });
  const [equation2, setEquation2] = useState<EquationProps>({
    n1: 1,
    n2: 1,
    sign: Sign.plus,
  });
  const [points, setPoints] = useState(0);
  const [lvl, setLvl] = useState(0);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  const time = 60;
  useEffect(() => {
    if (answer === compare()) {
      setIsCorrect(true);
      setPoints((points) => points + 1);
      points % 10 === 0 && setLvl(lvl + 1);
      setEquations();
      setAnswer(answers.undefined);
    }
  }, [answer, setAnswer]);

  const startExercise = () => {
    setIsExerciseFinished(false);
    setEquations();
    setIsExerciseStarted(true);
    const timeout = setTimeout(() => {
      setIsExerciseFinished(true);
      clearTimeout(timeout);
    }, time * 1000);
  };

  const count = (eq: EquationProps) => {
    if (eq.sign === Sign.plus) {
      return eq.n1 + eq.n2;
    } else {
      return eq.n1 - eq.n2;
    }
  };

  const compare = () => {
    const n1 = count(equation1);
    const n2 = count(equation2);

    if (n1 > n2) {
      return answers.bigger;
    } else if (n1 < n2) {
      return answers.smaller;
    } else return answers.equal;
  };

  const setEquations = () => {
    const usedSigns = ['plus', 'minus'];
    const sign1 = usedSigns[Math.floor(Math.random() * usedSigns.length)];
    const sign2 = usedSigns[Math.floor(Math.random() * usedSigns.length)];
    setEquation1({
      n1: lvl < 3 ? number() : bigNumber(),
      n2: lvl < 3 ? number() : bigNumber(),
      sign: sign1 === 'plus' ? Sign.plus : Sign.minus,
    });
    setEquation2({
      n1: lvl < 3 ? number() : bigNumber(),
      n2: lvl < 3 ? number() : bigNumber(),
      sign: sign2 === 'plus' ? Sign.plus : Sign.minus,
    });
  };
  const renderEquation = (eq: EquationProps) => {
    const equation: string = `${eq.n1.toString()}  ${
      eq.sign === Sign.plus ? '+' : '-'
    }  ${eq.n2.toString()} `;
    return equation;
  };
  return (
    <>
      {isExerciseStarted && !isExerciseFinished && <Timer time={time} />}
      <View style={appStyles.container}>
        {!isExerciseStarted ? (
          <>
            <Text style={appStyles.titleText}>Równiania</Text>
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
              Zadanie polega na zaznaczeniu równania, którego wartość jest
              większa. W przypadku równych wartości należy nacisnąć przycisk
              "Równe" znajdujący się na środku.
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
            <View style={styles.answersContainer}>
              <Button
                buttonType="answer"
                onPress={() => {
                  setAnswer(answers.bigger);
                }}
                style={styles.equationContainer}
                text={renderEquation(equation1)}
                textStyle={styles.equation}
              />
              <Button
                buttonType="answer"
                onPress={() => {
                  setAnswer(answers.equal);
                  console.log(isCorrect);
                }}
                style={styles.equationContainer}
                text="Równe"
                textStyle={styles.equation}
              />
              <Button
                buttonType="answer"
                onPress={() => {
                  setAnswer(answers.smaller);
                  console.log(isCorrect);
                }}
                style={styles.equationContainer}
                text={renderEquation(equation2)}
                textStyle={styles.equation}
              />
            </View>
            <PointsContainer points={points} />
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
  answersContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  },
  buttonText: {
    color: colors.mintCream,
    fontSize: 30,
    fontWeight: 'bold',
  },
  checkButton: {
    backgroundColor: colors.mediumTurquise,
    margin: 10,
    padding: 10,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  equation: {
    color: colors.mintCream,
    fontSize: 26,
    opacity: 1,
  },
  equationContainer: {
    alignItems: 'center',
    backgroundColor: colors.midnightGreen,
    borderColor: colors.mintCream,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    width: 300,
    opacity: 0.7,
  },
  message: {
    color: colors.midnightGreen,
    fontSize: 30,
  },
});

export default Equations;
