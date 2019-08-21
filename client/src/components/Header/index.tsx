import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import Notifications from 'components/Notifications';

import styles from './styles.module.scss';

interface HeaderProps {
  team_name?: string;
}

const Header = ({ team_name }: HeaderProps) => {
  const { t } = useTranslation();

  const menuItems = team_name
    ? [
        { name: t('Header.leagues'), link: '/leagues' },
        { name: t('Header.live'), link: '/live', dot: true },
        { name: t('Header.players'), link: '/players' },
        { name: t('Header.transfers'), link: '/transfers' },
        { name: t('Header.fixtures'), link: '/fixtures' },
      ]
    : [];

  return (
    <header className={`${styles.header} bg-primary pb-32 text-sm text-secondary2`}>
      <div className='mx-16'>
        <nav className='flex items-center py-4 '>
          <div className='flex flex-initial items-center mr-4'>
            <NavLink
              exact
              to='/'
              className='font-semibold uppercase p-1 border-solid border-b-2 border-transparent hover:text-secondary mr-12'
              activeClassName='text-secondary border-secondary'
            >
              {t('Header.home')}
            </NavLink>
            {!team_name && (
              <NavLink
                exact
                to='/initial-squad-selection'
                className='font-semibold uppercase p-1 border-solid
                border-b-2 border-transparent hover:text-secondary mr-12'
                activeClassName='text-secondary border-secondary'
              >
                {t('Header.squad')}
              </NavLink>
            )}
            <Notifications />
          </div>
          <div
            className='flex flex-grow items-center justify-end ml-auto'
            style={{ maxWidth: '60em' }}
          >
            {menuItems.map(({ name, link, dot }) => (
              <div key={name} className='flex flex-grow items-center mx-2'>
                {dot && (
                  <FontAwesomeIcon icon={faCircle} color={'#fff'} transform='shrink-11' />
                )}
                <NavLink
                  to={link}
                  className='font-semibold uppercase p-1 border-solid border-b-2 border-transparent hover:text-secondary'
                  activeClassName='text-secondary border-secondary'
                >
                  {name}
                </NavLink>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
