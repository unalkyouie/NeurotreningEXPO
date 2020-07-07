import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Dispatch, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { appStyles } from '../../assets/styles';
import Button from '../../components/Button';
import { LoginActions, setLogin } from '../../reducers/loginReducer';
import { UserInfoActions, setUserInfo } from '../../reducers/userInfoReducer';

const { height, width } = Dimensions.get('window');

const WelcomeSignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const dispatchLogin = useDispatch<Dispatch<LoginActions>>();
  const dipatchUserData = useDispatch<Dispatch<UserInfoActions>>();

  const onPress = () => {
    dipatchUserData(setUserInfo({ name: username }));
    dispatchLogin(setLogin(true));
  };
  return (
    <View style={appStyles.container}>
      <LinearGradient
        colors={['#4ecdc4', '#88dac8', '#b3e6d1', '#f7fff7']}
        style={styles.linearGradient}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text>Podaj swoje imię</Text>
          <TextInput
            autoFocus={true}
            clearTextOnFocus={true}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <Button onPress={onPress} text="ok" />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Masz już konto? </Text>
          <Button
            onPress={() => {
              navigation.navigate('SignIn');
            }}
            text="Zaloguj się"
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Nie rejestrowałeś się jeszcze?</Text>
          <Button
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            text="Zarejestruj się"
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>lub</Text>
          <Button
            onPress={() => {
              navigation.navigate('Main');
            }}
            text="Zarejestruj się"
          />
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    alignSelf: 'center',
    bottom: 0,
    top: 0,
    left: 0,
    width,
    height,
    right: 0,
    justifyContent: 'center',
  },
});
export default WelcomeSignUpScreen;
