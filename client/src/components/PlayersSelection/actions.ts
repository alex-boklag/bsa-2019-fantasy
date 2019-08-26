import * as playersService from 'services/playersService';

import {
  SET_PLAYERS,
  SET_AUTOPICK_SQUAD,
  PlayersAction,
  AsyncPlayersAction,
} from './action.type';

import { PlayerType } from 'types/player.types';

const setPlayers = (players: PlayerType[]): PlayersAction => ({
  type: SET_PLAYERS,
  payload: players,
});

const setAutoPickSquad = (autoPick: PlayerType[]): PlayersAction => ({
  type: SET_AUTOPICK_SQUAD,
  payload: autoPick,
});

export const loadPlayersAction = (filter: any): AsyncPlayersAction => async (
  dispatch,
) => {
  const result = await playersService.getPlayers(filter);
  dispatch(setPlayers(result));
};

export const loadAutoPickAction = (): AsyncPlayersAction => async (dispatch) => {
  const result = await playersService.getRandomSquad();

  // Get all positions from promiseAll
  const goalkeepers = result[0];
  const defenders = result[1];
  const middlefielders = result[2];
  const forwards = result[3];
  dispatch(
    setAutoPickSquad([...goalkeepers, ...defenders, ...middlefielders, ...forwards]),
  );
};
