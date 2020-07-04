import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BuildWords from './components/languageExercises/BuildWords';
import CompleteWords from './components/languageExercises/CompleteWords';
import PhoneNumber from './components/memoryExercises/PhoneNumber';
import ShoppingList from './components/memoryExercises/ShoppingList';
import Equations from './components/thinkingExercises/Equations';
import OrderOfNumbers from './components/thinkingExercises/OrderOfNumbers';
import WelcomeIntroductionScreen from './screens/startScreens/WelcomeIntroductionScreen';
import WelcomeSignUpScreen from './screens/startScreens/WelcomeSignUpScreen';
import WelcomeScreen from './screens/startScreens/WelcomeScreen';
import ExercisesDisplay from './screens/ExercisesDisplay';
import ExerciseScreen from './screens/ExerciseScreen';
import InfoScreen from './screens/InfoScreen';
import MainScreen from './screens/MainScreen';
import RelaxationScreen from './screens/RelaxationScreen';
import SettingsScreen from './screens/SettingsScreen';
import UserScreen from './screens/UserScreen';
import VideoScreen from './screens/VideoScreen';
import { colors } from './assets/styles';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
const { height, width } = Dimensions.get('window');

const ExercisesStack = createStackNavigator();
export const ExercisesNavigator = () => {
  return (
    <ExercisesStack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
        headerShown: false,
      }}
      initialRouteName="main"
    >
      <ExercisesStack.Screen name="Display" component={ExercisesDisplay} />
      <ExercisesStack.Screen name="BuildWords" component={BuildWords} />
      <ExercisesStack.Screen name="CompleteWords" component={CompleteWords} />
      <ExercisesStack.Screen name="Equations" component={Equations} />
      <ExercisesStack.Screen name="OrderOfNumbers" component={OrderOfNumbers} />
      <ExercisesStack.Screen name="PhoneNumber" component={PhoneNumber} />
      <ExercisesStack.Screen name="ShoppingList" component={ShoppingList} />
    </ExercisesStack.Navigator>
  );
};
const WelcomeStack = createStackNavigator();
export const WelcomeNavigator = () => {
  return (
    <WelcomeStack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
        headerShown: false,
      }}
      initialRouteName="main"
    >
      <WelcomeStack.Screen
        name="WelcomeIntroduction"
        component={WelcomeIntroductionScreen}
      />
      <WelcomeStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <WelcomeStack.Screen
        name="WelcomeSignUp"
        component={WelcomeSignUpScreen}
      />
      <WelcomeStack.Screen name="SignUp" component={SignUpScreen} />
      <WelcomeStack.Screen name="SignIn" component={SignInScreen} />

      <WelcomeStack.Screen name="Main" component={DrawerNavigator} />
    </WelcomeStack.Navigator>
  );
};
const Tab = createMaterialBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior={'history'}
      initialRouteName="main"
      activeColor={colors.bittersweet}
      inactiveColor={colors.midnightGreen}
      barStyle={{ backgroundColor: colors.mintCream }}
    >
      <Tab.Screen
        name="main"
        component={MainScreen}
        options={{
          tabBarLabel: 'Główna',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="exercise"
        component={ExerciseScreen}
        options={{
          tabBarLabel: 'Ćwiczenia',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="brain" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="relaxation"
        component={RelaxationScreen}
        options={{
          tabBarLabel: 'Relaksacja',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bullseye" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="video"
        component={VideoScreen}
        options={{
          tabBarLabel: 'Film',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="video-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{}}
      drawerStyle={{ backgroundColor: colors.mintCream }}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="UserScreen" component={UserScreen} />
      <Drawer.Screen name="InfoScreen" component={InfoScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
