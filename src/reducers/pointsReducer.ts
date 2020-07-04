export const SET_POINTS = 'akademiadelfina/pointsReducer/SET_POINTS';
export const RESET_STATE = 'akademiadelfina/pointsReducer/RESET_STATE';

export interface SetPoints {
  type: typeof SET_POINTS;
  payload: number;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type PointsActions = SetPoints | ResetStateAction;

export interface PointsState {
  points: number;
}

const INITIAL_STATE: PointsState = {
  points: 0,
};

const reducer = (
  state: PointsState = INITIAL_STATE,
  action: PointsActions
): PointsState => {
  switch (action.type) {
    case SET_POINTS:
      return { ...state, points: action.payload };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setPoints = (points: number): SetPoints => {
  return { type: SET_POINTS, payload: points };
};

export const resetPointsState = (): ResetStateAction => {
  return { type: RESET_STATE };
};

export default reducer;
