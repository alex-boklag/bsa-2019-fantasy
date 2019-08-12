import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'store/types';

import Test from 'containers/Test';
import NotFound from 'scenes/NotFound';
import PrivateRoute from 'containers/PrivateRoute';

import LoginPage from 'containers/Auth/Login/LoginPage';
import RegistrationPage from 'containers/Auth/Registration/RegistrationPage';

import MyTeam from 'containers/MyTeam';
import Transfers from 'containers/Transfers';
import Live from 'containers/Live';

import Leagues from 'containers/Leagues';
import CreateLeague from 'components/Leagues/CreateLeague';
import JoinLeague from 'components/Leagues/JoinLeague';

import Fixtures from 'components/Fixtures/Fixtures';
import Players from 'containers/Players';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Spinner from 'components/Spinner';

import Profile from 'containers/Profile';
import SetPassword from 'containers/Profile/components/SetPassword';
import { loadCurrentUser } from 'containers/Profile/actions';

import ForgotPassword from 'containers/ChangePassword/ForgotPassword';
import ResetPassword from 'containers/ChangePassword/ResetPassword';

const Routing = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthorized } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex h-screen font-sans font-medium'>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/registration' component={RegistrationPage} />

        <Route path='/forgot' component={ForgotPassword} />
        <Route path='/reset/:id' component={ResetPassword} />

        {isAuthorized ? (
          <>
            <div className='flex-none h-full'>
              <Sidebar />
            </div>
            <div className='flex-1 bg-background h-full overflow-y-auto pb-16'>
              <Header />
              <main className='mx-16 -mt-32'>
                <Switch>
                  <Route path='/' exact component={Test} />

                  <Route exact path='/profile' component={Profile} />
                  <Route path='/profile/set/password' component={SetPassword} />

                  <Route path='/my-team' component={MyTeam} />
                  <Route path='/live' component={Live} />

                  <Route path='/players' exact component={Players} />

                  <Route path='/transfers' exact component={Transfers} />
                  <Route path='/fixtures' exact component={Fixtures} />

                  <Route path='/leagues' exact component={Leagues} />
                  <Route path='/leagues/create' component={CreateLeague} />
                  <Route path='/leagues/join' component={JoinLeague} />
                  <Route path='*' component={NotFound} />

                  <PrivateRoute exact path='/private' component={Test} />
                </Switch>
              </main>
            </div>
          </>
        ) : (
          <Redirect to='/login' />
        )}
      </Switch>
    </div>
  );
};

export default Routing;
