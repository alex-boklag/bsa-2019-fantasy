export type User = {
  id: string;
  name: string;
  email: string;
  money: number;
  score: number;

  chip_used: string;
  team_name: string;
  favorite_club_id: number;

  createdAt: string;
  updatedAt: string;
};

export type UpdateUserTeamDetails = {
  team_name: string;
  money: number;
  squad: string[];
  gameweek_id: string | undefined;
};
