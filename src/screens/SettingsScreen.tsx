import React from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { appStyles } from '../assets/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { BackgroundActions } from '../reducers/backgroundReducer';
import { LevelActions } from '../reducers/levelReducer';
import Button from '../components/Button';

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
        <TouchableOpacity>
          <Image />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image />
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
        <Button text="Łatwy" />
        <Button text="Średni" />
        <Button text="Trudny" />
      </View>
    </View>
  );
};

export default SettingsScreen;
