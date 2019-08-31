import {
  SET_USER,
  SET_IS_LOADING,
  CHANGE_LANGUAGE,
  SET_EMAIL_PREF,
  UserAction,
  SET_INVITE_CODE,
} from './action.type';
import { User } from 'types/user.type';

type State = {
  user: User | null;
  isAuthorized: boolean;
  isLoading: boolean;
  language: string;
  inviteCode: string;
};

const initialState: State = {
  user: null,
  isAuthorized: false,
  isLoading: true,
  language: 'en',
  inviteCode: '',
};

export default (state = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      const user = action.payload;
      return {
        ...state,
        user,
        isAuthorized: Boolean(user && user.id),
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload.language,
      };
    }
    case SET_INVITE_CODE: {
      return {
        ...state,
        inviteCode: action.payload,
      };
    }

    default:
      return state;
  }
};
