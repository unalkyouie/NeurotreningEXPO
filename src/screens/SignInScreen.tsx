import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

import { appStyles } from '../assets/styles';
import Button from '../components/Button';

const SignInScreen = () => {
  return (
    <View style={appStyles.container}>
      <Text>Ekran logowania</Text>
      <View>
        <Text>Login</Text>
        <TextInput />
      </View>
      <View>
        <Text>Hasło</Text>
        <TextInput />
      </View>
      <Button text="Z" />
      <Button text="Zaloguj się z użyciem konta Google" />
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
export default SignInScreen;
