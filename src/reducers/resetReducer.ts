export const SET_RESET = 'akademiadelfina/resetReducer/SET_RESET';
export const RESET_STATE = 'akademiadelfina/resetReducer/RESET_STATE';

export interface SetReset {
  type: typeof SET_RESET;
  payload: number;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type ResetActions = SetReset | ResetStateAction;

export interface ResetState {
  lastDate: number;
}

const INITIAL_STATE: ResetState = {
  lastDate: new Date().getDate(),
};

const reducer = (
  state: ResetState = INITIAL_STATE,
  action: ResetActions,
): ResetState => {
  switch (action.type) {
    case SET_RESET:
      return {...state, lastDate: action.payload};
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setReset = (lastDate: number): SetReset => {
  return {type: SET_RESET, payload: lastDate};
};

export const resetResetState = (): ResetStateAction => {
  return {type: RESET_STATE};
};

export default reducer;
