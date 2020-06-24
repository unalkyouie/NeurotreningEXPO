export const SET_EXERCISE = 'akademiadelfina/exerciseReducer/SET_EXERCISE';
export const RESET_STATE = 'akademiadelfina/exerciseReducer/RESET_STATE';

export interface SetExercise {
  type: typeof SET_EXERCISE;
  payload: boolean;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type ExerciseActions = SetExercise | ResetStateAction;

export interface ExerciseState {
  isActive: boolean;
}

const INITIAL_STATE: ExerciseState = {
  isActive: true,
};

const reducer = (
  state: ExerciseState = INITIAL_STATE,
  action: ExerciseActions,
): ExerciseState => {
  switch (action.type) {
    case SET_EXERCISE:
      return {...state, isActive: action.payload};
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setExercise = (isActive: boolean): SetExercise => {
  return {type: SET_EXERCISE, payload: isActive};
};

export const resetExerciseState = (): ResetStateAction => {
  return {type: RESET_STATE};
};

export default reducer;
