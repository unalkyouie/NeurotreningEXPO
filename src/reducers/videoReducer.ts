export const SET_VIDEO = 'akademiadelfina/videoReducer/SET_VIDEO';
export const RESET_STATE = 'akademiadelfina/videoReducer/RESET_STATE';

export interface SetVideo {
  type: typeof SET_VIDEO;
  payload: string;
}

export interface ResetStateAction {
  type: typeof RESET_STATE;
}
export type VideoActions = SetVideo | ResetStateAction;

export interface VideoState {
  lastWatchedVideoURL: string;
}

const INITIAL_STATE: VideoState = {
  lastWatchedVideoURL: '',
};

const reducer = (
  state: VideoState = INITIAL_STATE,
  action: VideoActions,
): VideoState => {
  switch (action.type) {
    case SET_VIDEO:
      return {...state, lastWatchedVideoURL: action.payload};
    case RESET_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const setVideo = (lastWatchedVideoURL: string): SetVideo => {
  return {type: SET_VIDEO, payload: lastWatchedVideoURL};
};
export default reducer;
