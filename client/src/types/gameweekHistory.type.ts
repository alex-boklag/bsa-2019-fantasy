import { PlayerType } from './player.types';

export type GameweekHistoryType = TeamMemberType & PlayerStatsType;

export type TeamMemberType = {
  is_on_bench: boolean;
  is_captain: boolean;
  player_id: string;
};

export type PlayerStatsType = {
  player_stats: PlayerType;
};
