import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/Button';
import { UserData } from '../assets/consts';
import { AppState } from '../reducers';
import { UserInfoActions, setUserInfo } from '../reducers/userInfoReducer';

const UserScreen = () => {
  const dispatchUserInfo = useDispatch<Dispatch<UserInfoActions>>();
  const navigation = useNavigation();
  const [isEmail, setIsEmail] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isChangeUsername, setIsChangeUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const selectUserData = useSelector<AppState, UserData>(
    (state) => state.userInfo.userInfo
  );
  useEffect(() => {
    selectUserData.email && setEmail(selectUserData.email);
    selectUserData.email && setIsEmail(true);
    setUsername(selectUserData.name);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Informacje o użytkowniku</Text>
      <View>
        <Image source={require('')} />
      </View>
      <View>
        <Text>Nazwa użytkownika</Text>
        {isChangeUsername ? (
          <>
            <TextInput
              onChangeText={(text) => {
                setNewUsername(text);
              }}
            />
            <Button
              icon="check"
              onPress={() => {
                dispatchUserInfo(setUserInfo({ name: newUsername }));
                setIsChangeUsername(false);
              }}
            />
          </>
        ) : (
          <>
            <Text>{username}</Text>
            <Button
              text="zmień"
              onPress={() => {
                setIsChangeUsername(true);
              }}
            />
          </>
        )}
      </View>
      <View>
        <Text>E-mail</Text>
        {isEmail ? (
          <Text>{email}</Text>
        ) : (
          <Button
            text="dodaj"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        )}
      </View>
      {isEmail && (
        <View>
          <Button text="zmień hasło" />
          <Button text="usuń konto" />
        </View>
      )}
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
export default UserScreen;
