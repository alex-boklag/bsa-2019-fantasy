import React, { useEffect, useState } from 'react';
import ReactSearchBox from 'react-search-box';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import cn from 'classnames';

import { loadPlayersAction } from '../../components/PlayersSelection/actions';
import {
  fetchDataForPlayer,
  resetPlayerDialogData,
} from '../../containers/Players/actions';
import { RootState } from 'store/types';
import { PlayerType } from 'types/player.types';
import { sortedBy, filteredBy, maxPrice } from './constants';

import { PlayerList } from '../PlayersList/index';
import Dropdown from 'react-dropdown';
import PlayerDialog from 'components/PlayerDialog';
import styles from './styles.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GameweekHistoryType } from 'types/gameweekHistory.type';

type Props = {
  loadPlayersAction: typeof loadPlayersAction;
  resetPlayerDialogData: any;
  fetchDataForPlayer: any;
  players: PlayerType[];
  playerData?: any;
  dialogLoading: boolean;
  undisplayedPlayers: GameweekHistoryType[];
};

const intialFilterState = {
  value: '',
  label: 'All players',
};

const PlayersSelection = ({
  loadPlayersAction,
  players,
  fetchDataForPlayer,
  resetPlayerDialogData,
  playerData,
  dialogLoading,
  undisplayedPlayers,
}: Props) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState({
    offset: 0,
    limit: 10,
    order_direction: 'DESC',
    order_field: 'player_score',
    position: undefined,
    club_id: undefined,
    search: undefined,
    max_price: undefined,
    undisplayedPlayersIds: [] as string[],
  });
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>();

  const [sortSelect, setSortSelect] = useState({
    value: 'player_score',
    label: 'Total points',
  });
  const [filterSelect, setFilterSelect] = useState(intialFilterState);
  const [search, setSearch] = useState({
    value: '',
  });
  const [maxPriceSelect, setMaxPriceSelect] = useState({
    value: '125',
    label: '125',
  });

  const [offset, setOffset] = useState(10);

  useEffect(() => {
    setQuery({ ...query, offset });
  }, [offset]);

  useEffect(() => {
    loadPlayersAction({ ...query });
  }, [query]);

  useEffect(() => {
    undisplayedPlayers.length > 0 &&
      setQuery({
        ...query,
        undisplayedPlayersIds: undisplayedPlayers.map((p) => p.player_stats.id),
      });
  }, [undisplayedPlayers]);

  const onSortChange = (item: any) => {
    setSortSelect(item);
    setQuery({ ...query, order_field: item.value });
    loadPlayersAction({ ...query });
  };
  const onFilterSelectChange = (item: any) => {
    setFilterSelect(item);
    setQuery({ ...query, position: undefined, club_id: undefined, ...item.value });
    setOffset(0);
    loadPlayersAction({ ...query });
  };
  const onSearchChange = (item: any) => {
    setSearch(item);
    setQuery({ ...query, search: item });
    setOffset(0);
    loadPlayersAction({ ...query });
  };
  const onMaxPriceChange = (item: any) => {
    setMaxPriceSelect(item);
    setQuery({ ...query, max_price: item.value });
    loadPlayersAction({ ...query });
  };

  const onClickOffset = (side: string) => {
    if (side === 'back') {
      if (offset >= 10) setOffset(offset - 10);
    } else if (side === 'forward') {
      if (players.length === 10) setOffset(offset + 10);
    }
  };

  const onOpenInfo = (id: string, club_id: number) => {
    if (players) {
      const player = players.find((p) => p && id === p.id);
      setCurrentPlayer(player);
      fetchDataForPlayer(id, club_id);
    }
  };

  const onModalDismiss = () => {
    resetPlayerDialogData();
    setCurrentPlayer(undefined);
  };

  return (
    <div className='bg-gray-200 px-4 py-4 rounded' style={{ width: '300px' }}>
      <h3 className='font-bold text-lg'>{t('Transfers.playerSelection.title')}</h3>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <div className='mt-2'>
          <div className='font-bold'>
            <span>{t('Transfers.playerSelection.view')}</span>
          </div>
          <Dropdown
            options={filteredBy as any}
            onChange={onFilterSelectChange}
            value={filterSelect}
          />
        </div>
        <div className='mt-2'>
          <div className='font-bold'>
            <span>{t('Transfers.playerSelection.sort')}</span>
          </div>
          <Dropdown options={sortedBy} onChange={onSortChange} value={sortSelect} />
        </div>
        <div className='mt-2'>
          <div className='font-bold'>
            <span>{t('Transfers.playerSelection.search')}</span>
          </div>
          <ReactSearchBox onChange={onSearchChange} value={search} />
        </div>
        <div className='mt-2'>
          <div className='font-bold'>
            <span>{t('Transfers.playerSelection.maxCost')}</span>
          </div>
          <br />
          <div>
            <span>{t('Transfers.playerSelection.maxCostBetween')}</span>
          </div>
          <Dropdown
            options={maxPrice}
            onChange={onMaxPriceChange}
            value={maxPriceSelect}
          />
        </div>
      </form>

      <p className='w-full mt-4 text-center'>
        <strong>{players.length}</strong> {t('Transfers.playerSelection.shown')}
      </p>

      {players && (
        <PlayerList
          players={players}
          onOpenInfo={onOpenInfo}
          onFilterSelectChange={onFilterSelectChange}
        />
      )}
      {currentPlayer && (
        <PlayerDialog
          playerDialogData={playerData}
          onDismiss={onModalDismiss}
          loading={dialogLoading}
          player={currentPlayer}
        />
      )}

      <div className='flex justify-center pt-10 w-full'>
        <button
          className={cn(styles.navButton, 'shadow', 'hover:shadow-md', 'mx-2')}
          onClick={() => {
            onClickOffset('back');
          }}
        >
          <IoIosArrowBack />
        </button>
        <button
          className={cn(styles.navButton, 'shadow', 'hover:shadow-md', 'mx-2')}
          onClick={() => {
            onClickOffset('forward');
          }}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  players: rootState.playerSelection.players,
  playerData: rootState.players.playerData,
  dialogLoading: rootState.players.dialogLoading,
});

const actions = { loadPlayersAction, fetchDataForPlayer, resetPlayerDialogData };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersSelection);
