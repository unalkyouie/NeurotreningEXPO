import {combineReducers} from 'redux';

import relaxationReducer, {RelaxationState} from './relaxationReducer';
import resetReducer, {ResetState} from './resetReducer';
import videoReducer, {VideoState} from './videoReducer';
import exerciseReducer, {ExerciseState} from './exerciseReducer';

export interface AppState {
  relaxation: RelaxationState;
  exercise: ExerciseState;
  video: VideoState;
  reset: ResetState;
}

export default combineReducers<AppState>({
  relaxation: relaxationReducer,
  video: videoReducer,
  exercise: exerciseReducer,
  reset: resetReducer,
});
