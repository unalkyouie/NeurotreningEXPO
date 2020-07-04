import { background } from '../assets/consts';

export const SET_BACKGROUND =
  'akademiadelfina/backgroundReducer/SET_RELAXATION';
export const RESET_STATE = 'akademiadelfina/backgroundReducer/RESET_STATE';

export interface SetBackground {
  type: typeof SET_BACKGROUND;
  payload: background;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type BackgroundActions = SetBackground | ResetStateAction;

export interface BackgroundState {
  background: background;
}

const INITIAL_STATE: BackgroundState = {
  background: background.pierwsze,
};

const reducer = (
  state: BackgroundState = INITIAL_STATE,
  action: BackgroundActions
): BackgroundState => {
  switch (action.type) {
    case SET_BACKGROUND:
      return { ...state, background: action.payload };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setBackground = (background: background): SetBackground => {
  return { type: SET_BACKGROUND, payload: background };
};

export const resetBackgroundState = (): ResetStateAction => {
  return { type: RESET_STATE };
};

export default reducer;
