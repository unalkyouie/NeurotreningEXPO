import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ExerciseScreen from './screens/ExerciseScreen';
import MainScreen from './screens/MainScreen';
import RelaxationScreen from './screens/RelaxationScreen';
import VideoScreen from './screens/VideoScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import BuildWords from './components/languageExercises/BuildWords';
import CompleteWords from './components/languageExercises/CompleteWords';
import Equations from './components/thinkingExercises/Equations';
import OrderOfNumbers from './components/thinkingExercises/OrderOfNumbers';
import PhoneNumber from './components/memoryExercises/PhoneNumber';
import ShoppingList from './components/memoryExercises/ShoppingList';
import { colors } from './assets/styles';
const { height, width } = Dimensions.get('window');

const Stack = createStackNavigator();
const AppContainer = () => {
  const animations = {
    animations: {
      push: {
        content: {
          translationX: {
            from: require('react-native').Dimensions.get('window').width,
            to: 0,
            duration: 300,
          },
        },
      },
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: true,
          cardStyle: { backgroundColor: 'transparent', paddingTop: '20%' },
          headerShown: false,
        }}
        initialRouteName="main"
      >
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="exercise" component={ExerciseScreen} />
        <Stack.Screen name="relaxation" component={RelaxationScreen} />
        <Stack.Screen name="video" component={VideoScreen} />
        <Stack.Screen name="BuildWords" component={BuildWords} />
        <Stack.Screen name="CompleteWords" component={CompleteWords} />
        <Stack.Screen name="Equations" component={Equations} />
        <Stack.Screen name="OrderOfNumbers" component={OrderOfNumbers} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} />
        <Stack.Screen name="welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
    backgroundColor: colors.mintCream,
    borderRadius: 20,
    flex: 2,
    height: '90%',
    justifyContent: 'center',
    opacity: 0.5,
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

export default AppContainer;
