import { UserData } from '../assets/consts';

export const SET_USERINFO = 'akademiadelfina/userInfoReducer/SET_USERINFO';
export const RESET_STATE = 'akademiadelfina/userInfoReducer/RESET_STATE';

export interface SetUserInfo {
  type: typeof SET_USERINFO;
  payload: UserData;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type UserInfoActions = SetUserInfo | ResetStateAction;

export interface UserInfoState {
  userInfo: UserData;
}

const INITIAL_STATE: UserInfoState = {
  userInfo: { name: '', email: '' },
};

const reducer = (
  state: UserInfoState = INITIAL_STATE,
  action: UserInfoActions
): UserInfoState => {
  switch (action.type) {
    case SET_USERINFO:
      return { ...state, userInfo: action.payload };
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setUserInfo = (userInfo: UserData): SetUserInfo => {
  return { type: SET_USERINFO, payload: userInfo };
};

export const resetUserInfoState = (): ResetStateAction => {
  return { type: RESET_STATE };
};

export default reducer;
