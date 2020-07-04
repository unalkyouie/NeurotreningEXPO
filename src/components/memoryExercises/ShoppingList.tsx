import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { listaZakupow } from '../../assets/listaZakupow';
import { colors, appStyles } from '../../assets/styles';
import List from '../List';
import Timer from '../Timer';
import Button from '../Button';
const { height, width } = Dimensions.get('window');

const ListToMemorize = (props: { list: string[] }) => {
  return (
    <>
      <Text style={styles.smallTitle}>Lista zakupów</Text>
      <List data={props.list} icon />
    </>
  );
};
const ResultLists = (props: {
  list: string[];
  answers: string[];
  onPress: () => void;
}) => {
  const [forgottenAnswers, setForgottenItems] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  useEffect(() => {
    checkForForgottenItems();
    checkForWrongItems();
  }, []);
  const checkForForgottenItems = () => {
    const items: string[] = [];
    const listOfItems = [...props.list];
    const listOfAnswers = [...props.answers];
    for (let index = 0; index < props.list.length; index++) {
      !(listOfAnswers.indexOf(listOfItems[index]) > -1) &&
        items.push(listOfItems[index]);
    }
    setForgottenItems(items);
  };
  const checkForWrongItems = () => {
    const items: string[] = [];
    const listOfItems = [...props.list];
    const listOfAnswers = [...props.answers];
    for (let index = 0; index < props.answers.length; index++) {
      !(listOfItems.indexOf(listOfAnswers[index]) > -1) &&
        items.push(listOfAnswers[index]);
    }
    setWrongAnswers(items);
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.checkedAnswersContainer}>
        {forgottenAnswers.length > 0 && (
          <View style={styles.answersListContainer}>
            <Text style={styles.smallTitle}>UPS! Zapomniałeś o czymś</Text>
            <FlatList
              style={{
                backgroundColor: colors.yellow,
                borderColor: colors.richBlack,
                borderWidth: 1,
                opacity: 0.8,
              }}
              data={props.list}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: colors.midnightGreen,
                      flexDirection: 'row',
                      padding: 10,
                    }}
                  >
                    <Icon
                      name={
                        forgottenAnswers.indexOf(item) > -1
                          ? 'checkbox-blank-outline'
                          : 'check-box-outline'
                      }
                      color={
                        forgottenAnswers.indexOf(item) > -1
                          ? '#b52424'
                          : colors.midnightGreen
                      }
                      size={24}
                    />
                    <Text
                      style={[
                        {
                          color: colors.midnightGreen,
                          fontSize: 20,
                          marginLeft: 5,
                        },
                        forgottenAnswers.indexOf(item) > -1 && {
                          color: '#b52424',
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        )}
        {wrongAnswers.length > 0 && (
          <View style={styles.answersListContainer}>
            <Text style={styles.smallTitle}>
              Produkty, których nie było na liście:
            </Text>
            <FlatList
              style={{}}
              data={wrongAnswers}
              renderItem={({ item }) => (
                <Text
                  style={{
                    color: colors.midnightGreen,
                    fontSize: 20,
                    marginLeft: 5,
                  }}
                >
                  {item}
                </Text>
              )}
            />
          </View>
        )}
      </View>
      <Button onPress={props.onPress} text="Jeszcze raz" />
    </View>
  );
};
const AnswersLists = (props: { list: string[]; onPress: () => void }) => {
  const answersListNumber = 15;
  const numberOfItems = 5;
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnswerUsed, setIsAnswerUsed] = useState<boolean[]>([]);
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);
  const [exerciseState, setExerciseState] = useState(false);

  useEffect(() => {
    setIsAnswerUsed(() =>
      Array(answersListNumber + numberOfItems).map(() => false)
    );
    setPossibleAnswersList();
    const timeout = setTimeout(() => {
      setExerciseState(true);
      clearTimeout(timeout);
    }, 60 * 1000);
  }, []);
  const setPossibleAnswersList = () => {
    console.log(props.list);
    setPossibleAnswers(props.list);
    let index = 0;
    while (index < answersListNumber) {
      const arr = [...possibleAnswers];
      const newItem =
        listaZakupow[Math.floor(Math.random() * listaZakupow.length)];
      if (arr.indexOf(newItem) > -1) {
        continue;
      } else {
        setPossibleAnswers((prev) => {
          const arr = [...prev, newItem];
          return arr;
        });
        index++;
      }
    }
    setPossibleAnswers((prev) => {
      const newArr: string[] = [...prev];
      for (let index = newArr.length - 1; index > 0; index--) {
        let rand = Math.floor(Math.random() * index);
        let temp = newArr[rand];
        newArr[rand] = newArr[index];
        newArr[index] = temp;
      }
      return newArr;
    });
    console.log(possibleAnswers);
  };
  const checkAnswers = () => {
    const ans: string[] = [];
    const usedArr = [...isAnswerUsed];
    const allAnswers = [...possibleAnswers];
    for (let index = 0; index < usedArr.length; index++) {
      usedArr[index] && ans.push(allAnswers[index]);
    }
    setAnswers(ans);
    setExerciseState(true);
  };

  return (
    <>
      <>{!exerciseState && <Timer time={60} />}</>
      {!exerciseState ? (
        <View style={styles.answersContainer}>
          <FlatList
            contentContainerStyle={styles.list}
            data={possibleAnswers}
            style={{ marginTop: 50 }}
            keyExtractor={(item, index) => '000' + item + index}
            renderItem={({ item }) => (
              <Button
                text={item}
                onPress={() => {
                  setIsAnswerUsed((prev) => {
                    const newArray = [...prev];
                    newArray[possibleAnswers.indexOf(item)] = !newArray[
                      possibleAnswers.indexOf(item)
                    ];
                    return newArray;
                  });
                }}
                style={[
                  styles.button,
                  isAnswerUsed[possibleAnswers.indexOf(item)] &&
                    styles.checkedAnswerButton,
                ]}
                textStyle={[
                  { color: colors.richBlack },
                  isAnswerUsed[possibleAnswers.indexOf(item)] && {
                    color: colors.mintCream,
                  },
                ]}
              />
            )}
          />
          <Button
            onPress={checkAnswers}
            text="Skończyłem"
            style={[styles.button, { marginBottom: 50 }]}
          />
        </View>
      ) : (
        <ResultLists
          list={props.list}
          answers={answers}
          onPress={props.onPress}
        />
      )}
    </>
  );
};

const Exercise = () => {
  const numberOfItems = 5;

  const [exerciseState, setExerciseState] = useState(false);
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    setListOfItems();
    const timeout = setTimeout(() => {
      setExerciseState(true);
      clearTimeout(timeout);
    }, 60 * 1000);
  }, []);
  const setListOfItems = () => {
    const arr: string[] = [];
    let index = 0;
    while (index < numberOfItems) {
      const newItem =
        listaZakupow[Math.floor(Math.random() * listaZakupow.length)];
      if (!(arr.indexOf(newItem) > -1)) {
        arr.push(newItem);
        index++;
      }
    }
    setList(arr);
  };
  return (
    <>
      {!exerciseState && <Timer time={60} />}
      <View>
        {!exerciseState ? (
          <>
            <ListToMemorize list={list} />
            <Button
              text="Zapamietałem"
              onPress={() => {
                setExerciseState(true);
                console.log(list);
              }}
              style={styles.button}
            />
          </>
        ) : (
          <AnswersLists
            list={list}
            onPress={() => {
              setExerciseState(false);
            }}
          />
        )}
      </View>
    </>
  );
};

const ShoppingList = () => {
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);

  const startExercise = () => {
    setIsExerciseStarted(true);
  };
  return (
    <>
      <View style={styles.exerciseContainer}>
        {!isExerciseStarted ? (
          <>
            <Text style={appStyles.titleText}>Lisa zakupów</Text>
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
              Po naciśnięciu przycisku wyświetli się lista zakupów do
              zapamietania. Po upłynięciu czasu lub gdy zdecydujesz, że już
              zapamietałeś. Następnie zobaczysz wiele produktów, z których
              należy wybrać te, które pojawiły się na liście. Na tą część
              ćwiczenia, również masz ograniczony czas.
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
            <Exercise />
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  answersContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  answersListContainer: {},
  button: {
    alignItems: 'center',

    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    paddingVertical: 0,
    margin: 0,
  },
  checkedAnswerButton: {
    backgroundColor: colors.yellow,
  },
  checkedAnswersContainer: {
    height: '80%',
    justifyContent: 'space-between',
    margin: 100,
    width: '100%',
  },
  exerciseContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    flex: 1,
    height,
    justifyContent: 'center',
    width,
    backgroundColor: colors.mediumTurquise,
  },
  list: {
    marginBottom: 20,
    width: '100%',
  },
  smallTitle: {
    fontSize: 20,
    color: colors.richBlack,
    textAlign: 'center',
  },
});

export default ShoppingList;
