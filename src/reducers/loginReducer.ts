export const SET_LOGIN = 'akademiadelfina/loginReducer/SET_LOGIN';
export const RESET_STATE = 'akademiadelfina/loginReducer/RESET_STATE';

export interface SetLogin {
  type: typeof SET_LOGIN;
  payload: boolean;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type LoginActions = SetLogin | ResetStateAction;

export interface LoginState {
  isLogged: boolean;
}

const INITIAL_STATE: LoginState = {
  isLogged: false,
};

const reducer = (
  state: LoginState = INITIAL_STATE,
  action: LoginActions
): LoginState => {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, isLogged: action.payload };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setLogin = (isLogged: boolean): SetLogin => {
  return { type: SET_LOGIN, payload: isLogged };
};

export const resetLoginState = (): ResetStateAction => {
  return { type: RESET_STATE };
};

export default reducer;
