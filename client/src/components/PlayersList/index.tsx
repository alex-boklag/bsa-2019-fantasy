import React from 'react';
import { useSelector } from 'react-redux';
import { PlayerItem } from '../PlayerItem/index';
import info from '../../assets/images/info.svg';
import { Player } from 'types/player.types';
import { RootState } from 'store/types';
import { getFieldPlayersUniformUrl, getGoalkeepersUniformUrl } from 'helpers/images';

export const PlayerList = ({ players }: any) => {
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const goalkeepers = players.filter((player: any) => {
    return player.position === '1' ? true : false;
  });
  const defenders = players.filter((player: any) => {
    return player.position === '2' ? true : false;
  });
  const midfielders = players.filter((player: any) => {
    return player.position === '3' ? true : false;
  });
  const forwards = players.filter((player: any) => {
    return player.position === '4' ? true : false;
  });

  return (
    <table className='w-full'>
      <tr className='bg-yellow-400'>
        <th className='w-1/6' align='left'>
          &nbsp;
        </th>
        <th className='w-3/6' align='left'>
          Goalkeepers
        </th>
        <th className='w-1/6' align='left'>
          £
        </th>
        <th className='w-1/6' align='left'>
          **
        </th>
      </tr>
      {goalkeepers.map((player: any) => (
        <PlayerItem
          name={player.second_name}
          club={clubs[player.club_id-1].short_name}
          position='GKP'
          price={player.player_price}
          score={player.player_score}
          info={info}
          imageURL={getGoalkeepersUniformUrl(clubs[player.club_id-1].code)}
        />
      ))}
      <tr className='bg-green-400'>
        <th className='w-1/6' align='left'>
          &nbsp;
        </th>
        <th className='w-3/6' align='left'>
          Defenders
        </th>
        <th className='w-1/6' align='left'>
          £
        </th>
        <th className='w-1/6' align='left'>
          **
        </th>
      </tr>
      {defenders.map((player: any) => (
        <PlayerItem
          name={player.second_name}
          club={clubs[player.club_id-1].short_name}
          position='DEF'
          price={player.player_price}
          score={player.player_score}
          info={info}
          imageURL={getFieldPlayersUniformUrl(clubs[player.club_id-1].code)}
        />
      ))}
      <tr className='bg-blue-400'>
        <th className='w-1/6' align='left'>
          &nbsp;
        </th>
        <th className='w-3/6' align='left'>
          Midfielders
        </th>
        <th className='w-1/6' align='left'>
          £
        </th>
        <th className='w-1/6' align='left'>
          **
        </th>
      </tr>
      {midfielders.map((player: any) => (
        <PlayerItem
          name={player.second_name}
          club={clubs[player.club_id-1].short_name}
          position='MID'
          price={player.player_price}
          score={player.player_score}
          info={info}
          imageURL={getFieldPlayersUniformUrl(clubs[player.club_id-1].code)}
        />
      ))}
      <tr className='bg-red-400'>
        <th className='w-1/6' align='left'>
          &nbsp;
        </th>
        <th className='w-3/6' align='left'>
          Forwards
        </th>
        <th className='w-1/6' align='left'>
          £
        </th>
        <th className='w-1/6' align='left'>
          **
        </th>
      </tr>
      {forwards.map((player: any) => (
        <PlayerItem
          name={player.second_name}
          club={clubs[player.club_id-1].short_name}
          position='FWD'
          price={player.player_price}
          score={player.player_score}
          info={info}
          imageURL={getFieldPlayersUniformUrl(clubs[player.club_id-1].code)}
        />
      ))}
    </table>
  );
};