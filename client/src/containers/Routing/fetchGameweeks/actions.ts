import * as gameweeksService from 'services/gameweekService';
import * as playerService from 'services/playersService';
import * as gameweeksHistoryService from 'services/gameweekHistoryService';
import {
  FETCH_GAMEWEEKS_REQUEST,
  FETCH_GAMEWEEKS_SUCCESS,
  FETCH_GAMEWEEKS_FAILURE,
  FETCH_GAMEWEEKS_HISTORY_REQUEST,
  FETCH_GAMEWEEKS_HISTORY_SUCCESS,
  FETCH_GAMEWEEKS_HISTORY_FAILURE,
  FETCH_GAMEWEEKS_HISTORY_RESULTS_REQUEST,
  FETCH_GAMEWEEKS_HISTORY_RESULTS_SUCCESS,
  FETCH_GAMEWEEKS_HISTORY_RESULTS_FAILURE,
  FETCH_GAMEWEEK_USER_RANKING_REQUEST,
  FETCH_GAMEWEEK_USER_RANKING_SUCCESS,
  FETCH_GAMEWEEK_USER_RANKING_FAILURE,
  FetchGameweeksAction,
  AsyncFetchGameweeksAction,
} from './action.type';
import {
  GameweekHistoryType,
  TeamMemberType,
  GameweekHistoryResultsType,
  GameweekUserRankingType,
} from 'types/gameweekHistory.type';
import { GameweekType } from 'types/gameweek.type';
import { feedback } from 'react-feedbacker';

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

const fetchGameweeksHistoryResultsRequest = (): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_HISTORY_RESULTS_REQUEST,
});

const fetchGameweeksHistoryResultsSuccess = (
  payload: GameweekHistoryResultsType[],
): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_HISTORY_RESULTS_SUCCESS,
  payload: payload,
});

const fetchGameweeksHistoryResultsFailure = (error: string): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEKS_HISTORY_RESULTS_FAILURE,
  payload: error,
});

const fetchUserRankingForGameweekRequest = (): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEK_USER_RANKING_REQUEST,
});

const fetchUserRankingForGameweekSuccess = (
  payload: GameweekUserRankingType,
): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEK_USER_RANKING_SUCCESS,
  payload: payload,
});

const fetchUserRankingForGameweekFailure = (error: string): FetchGameweeksAction => ({
  type: FETCH_GAMEWEEK_USER_RANKING_FAILURE,
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

    // fetching upcomming fixtures for each player
    if (result) {
      for await (let r of result) {
        const upcomingFixture = await playerService.getUpcomingFixtureForPlayer(
          r.player_stats.id,
        );
        r.upcomingFixture = upcomingFixture;
      }
      dispatch(fetchGameweeksHistorySuccess(result));
    }
  } catch (err) {
    dispatch(fetchGameweeksHistoryFailure(err.message || err));
  }
};

export const fetchGameweekHistoryResults = (): AsyncFetchGameweeksAction => async (
  dispatch,
) => {
  dispatch(fetchGameweeksHistoryResultsRequest());

  try {
    const result = await gameweeksHistoryService.getGameweekHistoryResults();
    dispatch(fetchGameweeksHistoryResultsSuccess(result));
  } catch (err) {
    dispatch(fetchGameweeksHistoryResultsFailure(err.message || err));
  }
};

export const fetchUserRankingForGameweek = (
  userId: string,
  gameweekId: string,
): AsyncFetchGameweeksAction => async (dispatch) => {
  dispatch(fetchUserRankingForGameweekRequest());

  try {
    const result = await gameweeksHistoryService.getUserRankingForGameweek(
      userId,
      gameweekId,
    );
    dispatch(fetchUserRankingForGameweekSuccess(result));
  } catch (err) {
    dispatch(fetchUserRankingForGameweekFailure(err.message || err));
  }
};

export const postGameweekHistory = (
  gameweekId: string,
  data: TeamMemberType[],
): AsyncFetchGameweeksAction => async (dispatch, getRootState) => {
  const { user } = getRootState().profile;
  try {
    await gameweeksHistoryService.postGameweekHistoryForUserById(
      user!.id,
      gameweekId,
      data,
    );
    await fetchGameweekHistory(user!.id, gameweekId)(dispatch, getRootState);
    feedback.success('Your team has been saved successfully');
  } catch (err) {
    feedback.error('Failed to save your team');
  }
};
