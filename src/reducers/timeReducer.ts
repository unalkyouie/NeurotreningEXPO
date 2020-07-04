export const SET_TIME = 'akademiadelfina/timeReducer/SET_TIME';
export const RESET_STATE = 'akademiadelfina/timeReducer/RESET_STATE';

export interface SetTime {
  type: typeof SET_TIME;
  payload: number;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type TimeActions = SetTime | ResetStateAction;

export interface TimeState {
  points: number;
}

const INITIAL_STATE: TimeState = {
  points: 0,
};

const reducer = (
  state: TimeState = INITIAL_STATE,
  action: TimeActions
): TimeState => {
  switch (action.type) {
    case SET_TIME:
      return { ...state, points: action.payload };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setTime = (points: number): SetTime => {
  return { type: SET_TIME, payload: points };
};

export const resetTimeState = (): ResetStateAction => {
  return { type: RESET_STATE };
};

export default reducer;
