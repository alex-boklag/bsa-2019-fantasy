import * as authService from 'services/authService';
import * as forgotPasswordService from 'services/forgotPasswordService';
import { User } from 'types/user.type';
import { LoginCredentials, RegisterCredentials } from 'types/auth.types';
import {
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from 'types/forgot.password.types';

import { SET_USER, SET_IS_LOADING, AsyncUserAction, UserAction } from './action.type';

const setToken = (token: string) => localStorage.setItem('token', token);

const setUser = (user: User | null): UserAction => ({
  type: SET_USER,
  payload: user,
});

const setIsLoading = (isLoading: boolean): UserAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

const setAuthData = (user: User | null = null, token = ''): AsyncUserAction => (
  dispatch,
) => {
  setToken(token); // token should be set first before user
  dispatch(setUser(user));
};

const handleAuthResponse = (
  authResponsePromise: Promise<{
    user: User;
    token: string;
  }>,
): AsyncUserAction => async (dispatch, getRootState) => {
  const { user, token } = await authResponsePromise;
  setAuthData(user, token)(dispatch, getRootState);
};

export const login = (request: LoginCredentials) =>
  handleAuthResponse(authService.login(request));

export const registration = (request: RegisterCredentials) =>
  handleAuthResponse(authService.registration(request));

export const forgotPassword = (request: ForgotPasswordCredentials) => async () => {
  const result = await forgotPasswordService.forgotPassword(request);
  return result;
};

export const resetPassword = (request: ResetPasswordCredentials) => async () => {
  const result = await forgotPasswordService.resetPassword(request);
  return result;
};

export const logout = () => setAuthData();

export const loadCurrentUser = (): AsyncUserAction => async (dispatch) => {
  dispatch(setIsLoading(true));

  // bring it back later as authorization will be implemented
  // const user = await authService.getCurrentUser();
  const user: User = {
    id: 'dummy_thingy',
    username: 'Dummy',
    email: 'dummy@dummy',
    money: 130,
    favorite_club_id: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  setTimeout(() => {
    dispatch(setUser(user));
    dispatch(setIsLoading(false));
  }, 1000);
};
