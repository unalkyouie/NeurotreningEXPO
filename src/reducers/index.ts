import { combineReducers } from 'redux';

import relaxationReducer, { RelaxationState } from './relaxationReducer';
import resetReducer, { ResetState } from './resetReducer';
import videoReducer, { VideoState } from './videoReducer';
import exerciseReducer, { ExerciseState } from './exerciseReducer';
import backgroundReducer, { BackgroundState } from './backgroundReducer';
import levelReducer, { LevelState } from './levelReducer';
import pointsReducer, { PointsState } from './pointsReducer';
import loginReducer, { LoginState } from './loginReducer';
import timeReducer, { TimeState } from './timeReducer';
import userInfoReducer, { UserInfoState } from './userInfoReducer';

export interface AppState {
  relaxation: RelaxationState;
  exercise: ExerciseState;
  video: VideoState;
  reset: ResetState;
  background: BackgroundState;
  level: LevelState;
  login: LoginState;
  points: PointsState;
  time: TimeState;
  userInfo: UserInfoState;
}

export default combineReducers<AppState>({
  relaxation: relaxationReducer,
  video: videoReducer,
  exercise: exerciseReducer,
  reset: resetReducer,
  background: backgroundReducer,
  level: levelReducer,
  login: loginReducer,
  points: pointsReducer,
  time: timeReducer,
  userInfo: userInfoReducer,
});
