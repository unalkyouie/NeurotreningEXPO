import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { appStyles } from '../assets/styles';
import Button from '../components/Button';
import {
  BackgroundActions,
  setBackground,
} from '../reducers/backgroundReducer';
import { LevelActions, setLevel } from '../reducers/levelReducer';

const SettingsScreen = () => {
  const dispatchBackground = useDispatch<Dispatch<BackgroundActions>>();
  const dispatchLevel = useDispatch<Dispatch<LevelActions>>();
  // const dispatchTheme = useDispatch<Dispatch<RelaxationActions>>();
  // const dispatchTime = useDispatch<Dispatch<RelaxationActions>>();
  return (
    <View style={appStyles.container}>
      <Text>Relakasacja</Text>
      <Text> Tło</Text>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            dispatchBackground(setBackground('background.jpg'));
          }}
        >
          <Image source={require('../assets/images/background.jpg')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatchBackground(setBackground('background1.jpg'));
          }}
        >
          <Image source={require('../assets/images/background1.jpg')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatchBackground(setBackground('background2.jpg'));
          }}
        >
          <Image source={require('../assets/images/background2.jpg')} />
        </TouchableOpacity>
      </ScrollView>
      <Text> Czas wdechu i wydechu</Text>
      <View>
        <Button text="4" />
        <Button text="4" />
        <Button text="4" />
      </View>
      <Text> Edycja ustawień 'reducers'</Text>
      <Text>Ćwiczenia</Text>
      <Text>Poziom trudności</Text>
      <View>
        <Button
          text="Łatwy"
          onPress={() => {
            dispatchLevel(setLevel(1));
          }}
        />
        <Button
          text="Średni"
          onPress={() => {
            dispatchLevel(setLevel(2));
          }}
        />
        <Button
          text="Trudny"
          onPress={() => {
            dispatchLevel(setLevel(3));
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {},
});
export default SettingsScreen;
