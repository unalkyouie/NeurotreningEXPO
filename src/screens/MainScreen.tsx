import { useNavigation } from '@react-navigation/native';
import NetInfo, {
  NetInfoSubscription,
  NetInfoState,
} from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Dispatch, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import YouTubeProvider, { NEUROTRENING_ID } from '../api/YouTubeProvider';
import { appStyles, colors } from '../assets/styles';
import Button from '../components/Button';
import { AppState } from '../reducers';
import {
  ExerciseActions,
  resetExerciseState,
} from '../reducers/exerciseReducer';
import {
  RelaxationActions,
  resetRelaxationState,
} from '../reducers/relaxationReducer';
import { ResetActions, resetResetState } from '../reducers/resetReducer';

const { height, width } = Dimensions.get('window');

const MainScreen = () => {
  console.log('main screen');
  const navigation = useNavigation();
  const dispatchRelaxation = useDispatch<Dispatch<RelaxationActions>>();
  const dispatchExercise = useDispatch<Dispatch<ExerciseActions>>();
  const dispatchReset = useDispatch<Dispatch<ResetActions>>();
  const [isVideoButtonActive, setIsVideoButtonActive] = useState(false);
  const [isRelaxationButtonActive, setIsRelaxationButtonActive] = useState(
    false
  );
  const [isExerciseButtonActive, setIsExerciseButtonActive] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [subscription, setSubscription] = useState<NetInfoSubscription | null>(
    null
  );
  useEffect(() => {
    setSubscription(NetInfo.addEventListener(handleConnectivityChange));
  }, []);
  const handleConnectivityChange = (state: NetInfoState) => {
    setIsConnected(state.isConnected);
  };
  const relaxationState = useSelector<AppState, boolean>(
    (state) => state.relaxation.isActive
  );
  const exerciseState = useSelector<AppState, boolean>(
    (state) => state.relaxation.isActive
  );
  const videoURL = useSelector<AppState, string>(
    (state) => state.video.lastWatchedVideoURL
  );
  const getLastDate = useSelector<AppState, number>(
    (state) => state.reset.lastDate
  );
  const resetStates = () => {
    const todayDate = new Date().getDate();
    if (getLastDate !== todayDate) {
      dispatchReset(resetResetState());
      dispatchRelaxation(resetRelaxationState());
      dispatchExercise(resetExerciseState());
    }
  };
  useEffect(() => {
    isConnected && checkVideoState();
    setIsRelaxationButtonActive(relaxationState);
    setIsExerciseButtonActive(exerciseState);
    resetStates();
  }, []);
  const checkVideoState = async () => {
    try {
      const newestURL = (await YouTubeProvider.getLastVideo(NEUROTRENING_ID))
        .response.id;
      setIsVideoButtonActive(!(newestURL === videoURL));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[appStyles.container]}>
      <LinearGradient
        colors={['#4ecdc4', '#88dac8', '#b3e6d1', '#f7fff7']}
        style={styles.linearGradient}
      >
        <View style={styles.titleWrapper}>
          <View style={styles.topWrapper} />
          <Button
            icon="menu"
            style={{
              width: 40,
              height: 40,
              textAlign: 'center',
              top: 50,
              padding: 5,
              backgroundColor: 'transparent',
            }}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          <Text
            style={[
              appStyles.titleText,
              { marginBottom: 0, fontSize: 40, color: colors.midnightGreen },
            ]}
          >
            Witaj!
          </Text>
          <Text
            style={[
              appStyles.titleText,
              { marginBottom: 0, fontSize: 30, color: colors.midnightGreen },
            ]}
          >
            {'Zobacz co przygotowaliśmy dla Ciebie na dzisiaj :)'}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            height: 0.5 * height,
            paddingTop: height * 0.1,
          }}
        >
          <View style={styles.buttonsWrapper}>
            <View style={styles.buttonWrapper}>
              <Button
                onPress={() => navigation.navigate('relaxation')}
                iconColor={colors.mediumTurquise}
                icon="bullseye"
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                disabled={!isConnected}
                onPress={() => {
                  navigation.navigate('video');
                }}
                icon="video-outline"
                iconColor={colors.mediumTurquise}
              />
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => {
                navigation.navigate('exercise');
              }}
              icon="brain"
              iconColor={colors.mediumTurquise}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  activeCircle: {
    backgroundColor: colors.mediumTurquise,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width,
    height,
  },
  buttonsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: width * 0.2,
    width: width,
    flex: 2,
  },
  titleWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: '#b3e6d1',
    justifyContent: 'center',
    height: height * 0.5,
    width: width,
    borderRadius: height,
    position: 'absolute',
    top: -height * 0.1,
    left: 0,
    right: 0,
  },
  topWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: '#b3e6d1',
    width: width,
    position: 'absolute',
    top: 0,
    height: 0.3 * height,
  },
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

export default MainScreen;
