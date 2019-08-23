import * as gameweeksService from 'services/gameweekService';
import * as gameweeksHistoryService from 'services/gameweekHistoryService';
import {
  FETCH_GAMEWEEKS_REQUEST,
  FETCH_GAMEWEEKS_SUCCESS,
  FETCH_GAMEWEEKS_FAILURE,
  FETCH_GAMEWEEKS_HISTORY_REQUEST,
  FETCH_GAMEWEEKS_HISTORY_SUCCESS,
  FETCH_GAMEWEEKS_HISTORY_FAILURE,
  FetchGameweeksAction,
  AsyncFetchGameweeksAction,
} from './action.type';
import { GameweekHistoryType, TeamMemberType } from 'types/gameweekHistory.type';
import { GameweekType } from 'types/gameweek.type';

const fetchGameweeksRequest = (): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_REQUEST,
});

const fetchGameweeksSuccess = (payload: GameweekType[]): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_SUCCESS,
  payload: payload,
});

const fetchGameweeksFailure = (error: string): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_FAILURE,
  payload: error,
});

const fetchGameweeksHistoryRequest = (): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_HISTORY_REQUEST,
});

export const fetchGameweeksHistorySuccess = (
  payload: GameweekHistoryType[],
): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_HISTORY_SUCCESS,
  payload: payload,
});

const fetchGameweeksHistoryFailure = (error: string): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_HISTORY_FAILURE,
  payload: error,
});
export const fetchGameweeks = (): AsyncFetchGameweeksAction => async (dispatch) => {
  dispatch(fetchGameweeksRequest());

  try {
    const result = await gameweeksService.getGameweeks();
    dispatch(fetchGameweeksSuccess(result));
  } catch (err) {
    dispatch(fetchGameweeksFailure(err.message || err));
  }
};

export const fetchGameweekHistory = (
  userId: string,
  gameweekId: string,
): AsyncFetchGameweeksAction => async (dispatch) => {
  dispatch(fetchGameweeksHistoryRequest());

  try {
    const result = await gameweeksHistoryService.getGameweekHistoryForUserById(
      userId,
      gameweekId,
    );
    dispatch(fetchGameweeksHistorySuccess(result));
  } catch (err) {
    dispatch(fetchGameweeksHistoryFailure(err.message || err));
  }
};

export const postGameweekHistory = (
  gameweekId: string,
  data: TeamMemberType[],
): AsyncFetchGameweeksAction => async (_, getRootState) => {
  const { user } = getRootState().profile;

  user &&
    (await gameweeksHistoryService.postGameweekHistoryForUserById(
      user.id,
      gameweekId,
      data,
    ));
};
