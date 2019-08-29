import playerMatchRepository from '../../data/repositories/player-match.repository';
import gameweekRepository from '../../data/repositories/gameweek.repository';
import gameRepository from '../../data/repositories/game.repository';
import eventRepository from '../../data/repositories/event.repository';

import calculatePlayerScore from '../../helpers/calculate-player-score.helper';

export const getAllPlayerMatch = () => playerMatchRepository.getAll();

export const getPlayerMatchById = (id) => playerMatchRepository.getById(id);

export const getPlayerStatsByGameweeks = async (playerId, playerClubId) => {
  const result = [];

  await Promise.all(
    await gameweekRepository
      .getAll()
      .map((el) => el.get({ plain: true }))
      .map(async ({ number }) => {
        const games = await gameRepository
          .getByGameweekId(number)
          .map((el) => el.get({ plain: true }));
        await Promise.all(
          games.map(
            async ({
              id: gameId,
              hometeam,
              awayteam,
              hometeam_score,
              awayteam_score,
              finished,
            }) => {
              if (!gameId || !finished) return;

              const opponent = hometeam.id !== playerClubId ? hometeam : awayteam;
              const eventsForGame = await eventRepository
                .getByGameId(gameId)
                .map((el) => el.get({ plain: true }));
              const realEvents = eventsForGame.filter((ev) => ev !== undefined);

              const eventsForCurrentPlayer = realEvents.filter(
                (event) => event.player && event.player.player_id.toString() === playerId,
              );
              if (eventsForCurrentPlayer.length < 1) return;
              const {
                goals,
                assists,
                missed_passes,
                goals_conceded,
                saves,
                yellow_cards,
                red_cards,
              } = eventsForCurrentPlayer[0].player; // last event for game and get this stats

              result.push({
                gameweek: { number },
                game: {
                  opp: opponent.short_name,
                  res: `${hometeam_score} - ${awayteam_score}`,
                },
                stats: {
                  goals,
                  assists,
                  missed_passes,
                  goals_conceded,
                  saves,
                  yellow_cards,
                  red_cards,
                },
              });
            },
          ),
        );
      }),
  );

  return result;
};

export const getPlayerScoreByGameweeks = async (playerId, gameweekId) => {
  const gameweeksByPlayer = await getPlayerStatsByGameweeks(playerId);
  const playerEvents = gameweeksByPlayer.filter(
    (item) => item.gameweek.number === +gameweekId,
  );
  const scoreList = playerEvents.map((item) => {
    return calculatePlayerScore(item.stats);
  });

  const score = scoreList.reduce((sum, current) => sum + current, 0);

  return score;
};
