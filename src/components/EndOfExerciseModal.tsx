import React from 'react';
import {Text, View, StyleSheet, Dimensions, Modal} from 'react-native';
import {colors} from '../assets/styles';
import Button from './Button';

const {height, width} = Dimensions.get('window');

interface Props {
  startExercise: () => void;
  points: number;
}
const EndOfExerciseModal = (props: Props) => {
  return (
    <Modal animationType="slide" animated={true}>
      <Text style={styles.text}>BRAWO! Ukończyłeś zadanie</Text>
      <Text style={styles.text}>Zdobyte punkty:</Text>
      <Text style={styles.text}>{props.points}</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={props.startExercise} text="Jeszcze raz" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.midnightGreen,
    fontSize: 30,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.mintCream,
    borderRadius: 20,
    height: 0.9 * height,
    justifyContent: 'center',
    position: 'absolute',
    width: 0.9 * width,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 100,
  },
});
export default EndOfExerciseModal;
