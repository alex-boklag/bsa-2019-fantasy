import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/types';

import NotFound from 'scenes/NotFound';
import PrivateRoute from 'containers/PrivateRoute';
import GuestRoute from 'containers/GuestRoute';

import LoginPage from 'containers/Auth/Login/LoginPage';
import RegistrationPage from 'containers/Auth/Registration/RegistrationPage';

import MyTeam from 'containers/MyTeam';
import Transfers from 'containers/Transfers';
import Live from 'containers/Live';

import Leagues from 'containers/Leagues';
import CreateLeague from 'components/Leagues/CreateLeague';
import JoinLeague from 'components/Leagues/JoinLeague';

import GameweekHistory from 'containers/GameweekHistory';

import FixturesContainer from 'containers/FixturesContainer';
import Players from 'containers/Players';
import PlayersComparison from 'containers/PlayersComparison';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Spinner from 'components/Spinner';

import Profile from 'containers/Profile';
import SetPassword from 'containers/Profile/components/SetPassword';
import { loadCurrentUser } from 'containers/Profile/actions';

import ForgotPassword from 'containers/ChangePassword/ForgotPassword';
import ResetPassword from 'containers/ChangePassword/ResetPassword';

// Initial data loading
import { fetchClubs } from './fetchClubs/actions';
import { fetchGameweeks, fetchGameweekHistory } from './fetchGameweeks/actions';
import { preloadClubLogos } from 'helpers/images';

const Routing = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  useEffect(() => {
    dispatch(loadCurrentUser());
    dispatch(fetchClubs());
    dispatch(fetchGameweeks());
    // dispatch(
    //   fetchGameweekHistory(
    //     'dfe3c86d-c303-41d2-992a-9e9d62bc87b5',
    //     '94a2e21a-c317-40d6-836d-9bc3f76810e7',
    //   ),
    // );
  }, [dispatch]);

  useEffect(() => {
    clubs.length > 0 && preloadClubLogos(clubs, 80);
  }, [clubs]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex h-screen font-sans font-medium'>
      <Switch>
        <GuestRoute exact path='/login' component={LoginPage} />
        <GuestRoute exact path='/registration' component={RegistrationPage} />
        <GuestRoute exact path='/forgot' component={ForgotPassword} />

        <Route exact path='/404' component={NotFound} />

        <PrivateRoute path='/'>
          <div className='flex-none h-full'>
            <Sidebar />
          </div>
          <div className='flex-1 bg-background h-full overflow-y-auto pb-16'>
            <Header />
            <main className='mx-16 -mt-32'>
              <Switch>
                <Route path='/' exact component={GameweekHistory} />

                <Route exact path='/profile' component={Profile} />
                <Route path='/profile/set/password' component={SetPassword} />

                <Route path='/reset/:id' component={ResetPassword} />

                <Route path='/my-team' component={MyTeam} />
                <Route path='/live' component={Live} />

                <Route path='/players' exact component={Players} />
                <Route path='/players/comparison' exact component={PlayersComparison} />

                <Route path='/transfers' exact component={Transfers} />

                <Route path='/fixtures' exact component={FixturesContainer} />

                <Route path='/leagues' exact component={Leagues} />
                <Route path='/leagues/create' component={CreateLeague} />
                <Route path='/leagues/join' component={JoinLeague} />

                <Route render={() => <Redirect to='/404' />} />
              </Switch>
            </main>
          </div>
        </PrivateRoute>

        <Route render={() => <Redirect to='/404' />} />
      </Switch>
    </div>
  );
};

export default Routing;
