export const SET_RELAXATION =
  'akademiadelfina/relaxationReducer/SET_RELAXATION';
export const RESET_STATE = 'akademiadelfina/relaxationReducer/RESET_STATE';

export interface SetRelaxation {
  type: typeof SET_RELAXATION;
  payload: boolean;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type RelaxationActions = SetRelaxation | ResetStateAction;

export interface RelaxationState {
  isActive: boolean;
}

const INITIAL_STATE: RelaxationState = {
  isActive: true,
};

const reducer = (
  state: RelaxationState = INITIAL_STATE,
  action: RelaxationActions,
): RelaxationState => {
  switch (action.type) {
    case SET_RELAXATION:
      return {...state, isActive: action.payload};
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setRelaxation = (isActive: boolean): SetRelaxation => {
  return {type: SET_RELAXATION, payload: isActive};
};

export const resetRelaxationState = (): ResetStateAction => {
  return {type: RESET_STATE};
};

export default reducer;
