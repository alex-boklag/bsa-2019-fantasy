import * as leagueService from '../services/league.service';
import * as leagueParticipantService from '../services/league-participant.service';
/* eslint-disable */
export const createLeagueMiddleware = function(req, res, next) {
  leagueService
    .getLeagueByName(req.body.name)
    .then((leagues) => {
      if (!leagues) {
        return next();
      } else {
        res.status(400).json({ message: 'League with current name already exists' });
      }
    })
    .catch(next);
};

export const joinPrivateLeagueMiddleware = function(req, res, next) {
  leagueService
    .getLeagueById(req.body.code)
    .then((league) => {
      if (league && league.private === req.body.private) {
        return next();
      } else {
        res.status(400).json({ message: 'Invalid League Code provided' });
      }
    })
    .catch(next);
};

export const joinPublicLeagueMiddleware = function(req, res, next) {
  leagueService
    .getLeagueByName(req.body.code)
    .then((league) => {
      if (league && league.private === req.body.private) {
        return next();
      } else {
        res.status(400).json({ message: 'Invalid League Code provided' });
      }
    })
    .catch(next);
};

export const getInvitationMiddleware = function(req, res, next) {
  leagueParticipantService
    .checkIfAParticipantByName(req.user.id, req.body.name)
    .then((result) => {
      if (result.length && result[0]['is_creator']) {
        return next();
      } else {
        res.json({
          message: 'You are not permitted to get the invitation code',
          forbidden: true,
        });
      }
    })
    .catch(next);
};

export const leagueDetailsMiddleware = async function(req, res, next) {
  try {
    const league = await leagueService.getLeagueByName(req.params.name);
    if (league) {
      const isParticipant = await leagueParticipantService.checkIfAParticipantByName(
        req.user.id,
        req.params.name,
      );
      if (isParticipant.length) {
        return next();
      } else {
        res.json({
          message: 'You are not permitted to get details about this league',
          forbidden: true,
        });
      }
    } else {
      res.json({ message: 'There is no league with such name', forbidden: true });
    }
  } catch (err) {
    next(err);
  }
};