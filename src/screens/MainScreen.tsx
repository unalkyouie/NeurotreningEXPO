import NetInfo, {
  NetInfoSubscription,
  NetInfoState,
} from '@react-native-community/netinfo';
import React, { Dispatch, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

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
      <Text style={[appStyles.titleText, { marginBottom: 0, fontSize: 20 }]}>
        Witaj!
      </Text>
      <Text style={[appStyles.titleText, { marginBottom: 0, fontSize: 20 }]}>
        {'Zobacz co przygotowaliśmy dla Ciebie na dzisiaj :)'}
      </Text>
      <View style={styles.buttonWrapper}>
        <Icon
          name="bell-alert"
          size={40}
          color={isRelaxationButtonActive ? colors.yellow : 'transparent'}
        />
        <Button
          onPress={() => navigation.navigate('relaxation')}
          iconColor={colors.mintCream}
          icon="bullseye"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Icon
          name="bell-alert"
          size={40}
          color={isVideoButtonActive ? colors.yellow : 'transparent'}
        />
        <Button
          disabled={!isConnected}
          onPress={() => {
            navigation.navigate('video');
          }}
          icon="video-outline"
          iconColor={colors.mintCream}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Icon
          name="bell-alert"
          size={40}
          color={isExerciseButtonActive ? colors.yellow : 'transparent'}
        />
        <Button
          onPress={() => {
            navigation.navigate('exercise');
          }}
          icon="brain"
          iconColor={colors.mintCream}
        />
      </View>
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
    marginRight: 40,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width,
    height,
  },
});

export default MainScreen;
