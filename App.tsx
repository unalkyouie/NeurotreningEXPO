/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, Dispatch, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Dimensions } from 'react-native';
import { DrawerNavigator, WelcomeNavigator } from './src/Navigation';
import { colors } from './src/assets/styles';
import OfflineNotice from './src/utils/OfflineNotice';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { LoginActions } from './src/reducers/loginReducer';
import { AppState } from './src/reducers';

//https://github.com/react-native-community/async-storage/tarball/master
const { height, width } = Dimensions.get('window');
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {
  console.disableYellowBox = true;
  const [isUserLogged, setIsUserLogged] = useState(false);
  const logInState = useSelector<AppState, boolean>(
    (state) => state.login.isLogged
  );
  useEffect(() => {
    setIsUserLogged(logInState);
  }, []);
  return (
    <View style={styles.container}>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <OfflineNotice />
            <LinearGradient
              colors={['#4ecdc4', '#88dac8', '#b3e6d1', '#f7fff7']}
              style={styles.linearGradient}
            >
              <NavigationContainer>
                {isUserLogged ? <DrawerNavigator /> : <WelcomeNavigator />}
              </NavigationContainer>
            </LinearGradient>
          </PersistGate>
        </Provider>
      </PaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width,
    height,
    flex: 1,
    backgroundColor: colors.mediumTurquise,
  },

  linearGradient: {
    alignSelf: 'center',
    bottom: 0,
    top: 0,
    left: 0,
    width,
    height,
    right: 0,
    flex: 1,
  },
});

export default App;
