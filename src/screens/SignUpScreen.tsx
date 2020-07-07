import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

import Button from '../components/Button';

const SignUpScreen = () => {
  return (
    <View>
      <Text>Ekran rejestracji</Text>
      <View>
        <Text>Login</Text>
        <TextInput />
      </View>
      <View>
        <Text>E-mail</Text>
        <TextInput />
      </View>
      <View>
        <Text>Hasło</Text>
        <TextInput />
      </View>
      <Button text="Zarejestruj się" />
      <Button text="Zarejestruj się z użyciem konta Google" />
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
export default SignUpScreen;
