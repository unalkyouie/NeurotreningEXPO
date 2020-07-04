import { level } from '../assets/consts';

export const SET_LEVEL = 'akademiadelfina/levelReducer/SET_LEVEL';
export const RESET_STATE = 'akademiadelfina/levelReducer/RESET_STATE';

export interface SetLevel {
  type: typeof SET_LEVEL;
  payload: level;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type LevelActions = SetLevel | ResetStateAction;

export interface LevelState {
  level: level;
}

const INITIAL_STATE: LevelState = {
  level: level.easy,
};

const reducer = (
  state: LevelState = INITIAL_STATE,
  action: LevelActions
): LevelState => {
  switch (action.type) {
    case SET_LEVEL:
      return { ...state, level: action.payload };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setLevel = (level: level): SetLevel => {
  return { type: SET_LEVEL, payload: level };
};

export const resetLevelState = (): ResetStateAction => {
  return { type: RESET_STATE };
};

export default reducer;
