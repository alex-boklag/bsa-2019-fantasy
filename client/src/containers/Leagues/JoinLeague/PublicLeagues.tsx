import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Autosuggest from 'react-autosuggest';

import { searchPublicLeagues, joinLeague } from '../actions';
import { RootState } from 'store/types';

type Props = {
  searchPublicLeagues: typeof searchPublicLeagues;
  joinLeague: typeof joinLeague;
  suggestions: any;
};

const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;
const getSuggestionValue = (suggestion) => suggestion.name;

const PublicLeagues = ({ searchPublicLeagues, suggestions, joinLeague }: Props) => {
  const [value, setValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    searchPublicLeagues({ filter: inputValue });
  };

  const onSuggestionsClearRequested = () => {
    suggestions = [];
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }

    setLoading(true);

    /* eslint-disable */
    try {
      await joinLeague({ code: value, private: false });
    } catch {
      console.log('Something went wrong!');
    } finally {
      setLoading(false);
    }
    /* eslint-enable */
  };

  const inputProps = {
    value,
    onChange: handleInputChange,
  };

  return (
    <div className='join-league-item w-full md:w-1/2 px-6'>
      <h3 className='title text-secondary mb-4 font-bold'>Public leagues</h3>
      <p className='mb-2'>
        Public leagues allow you to compete against 20 game players in a classic league.
        You can join up to 3 public leagues.
      </p>
      <p className='font-bold mb-8'>
        Note, you can&apos;t remove your team from a public league after the league has
        started, once the challenge is on there&apos;s no quitting.
      </p>

      <form className='w-full max-w-lg' onSubmit={handleSubmit}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3'>
            <label
              htmlFor='public-league-name'
              className='block uppercase text-gray-700 text-xs font-bold mb-2'
            >
              League Name
            </label>
            <Autosuggest
              suggestions={suggestions.slice(0, 4)}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              id='public-league-name'
            />
          </div>
        </div>
        <button
          className={`w-48 shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${
            !value || isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type='submit'
          disabled={!value || isLoading}
        >
          {isLoading ? 'Wait' : 'Join public league'}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  suggestions: rootState.league.suggestions,
});

const actions = { searchPublicLeagues, joinLeague };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicLeagues);
