/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AppContainer from './src/Navigation';
import { colors } from './src/assets/styles';
import OfflineNotice from './src/utils/OfflineNotice';
import Video from 'react-native-video';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
//https://github.com/react-native-community/async-storage/tarball/master
const { height, width } = Dimensions.get('window');

const App = () => {
  console.log('Hello');
  console.disableYellowBox = true;
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.image}
              source={require('./src/assets/images/background2.jpg')}
            >
              {/* <Video
        style={{
          height: height,
          position: 'absolute',
          top: 0,
          left: 0,
          alignItems: 'stretch',
          bottom: 0,
          right: 0,
        }}
        source={require('./assets/images/clouds.mp4')}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      /> */}
              <View style={styles.contentContainer} />
              <AppContainer />
              <OfflineNotice />
            </ImageBackground>
          </View>
        </PersistGate>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.midnightGreen,
    borderRadius: 20,
    flex: 2,
    opacity: 0.5,
    height: '90%',
    justifyContent: 'center',
    position: 'absolute',
    width: '90%',
  },
  image: {
    top: 0,
    left: 0,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width,
    height,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});

export default App;
