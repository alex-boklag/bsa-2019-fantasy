import * as gameweeksService from 'services/gameweekService';
import { Club } from 'types/club.type';
import {
  FETCH_GAMEWEEKS_REQUEST,
  FETCH_GAMEWEEKS_SUCCESS,
  FETCH_GAMEWEEKS_FAILURE,
  FetchGameweeksAction,
  AsyncFetchGameweeksAction,
} from './action.type';

const fetchGameweeksSuccess = (payload: [Club]): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_SUCCESS,
  payload: payload,
});

const fetchGameweeksFailure = (error: string): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_FAILURE,
  payload: error,
});

export const fetchGameweeks = (): AsyncFetchGameweeksAction => async (dispatch) => {
  const result = await gameweeksService.getGameweeks();
  dispatch(fetchGameweeksSuccess(result));
};