import React from 'react';
import {TextInput, View, TouchableOpacity, Text} from 'react-native';

const SignInScreen = () => {
  return (
    <View style={appStyles.container}>
      <Text>Zaloguj się</Text>
      <TextInput />
      <TouchableOpacity>Zaloguj</TouchableOpacity>
      <TouchableOpacity>Zarejestruj</TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
