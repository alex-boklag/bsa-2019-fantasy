import React, { useEffect } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import LoginForm from 'components/AuthForms/LoginForm';
import LanguageForm from '../LanguageForm';

import styles from '../styles.module.scss';

const LoginPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Sign In | Fantasy Football League';
  }, []);

  return (
    <div
      className={cn(
        styles['login-container'],
        'flex',
        'w-full',
        'h-full',
        'md:flex-row-reverse',
        'flex-wrap',
      )}
    >
      <div className={styles.layer} />
      <div className='w-full h-full flex-col items-center justify-center md:w-3/4 min-h-screen'>
        <div
          className={cn(
            styles['lable-wrapper'],
            'min-h-screen',
            'flex',
            'flex-col',
            'justify-center',
          )}
        >
          <h1 className={cn(styles['main-lable'], 'w-full')}>{t('LoginPage.login')}</h1>
          <h1 className={cn(styles['main-lable'], 'w-full')}>{t('LoginPage.fantasy')}</h1>
        </div>
      </div>
      <div
        className={cn(
          styles['login-form'],
          'w-full',
          'h-full',
          'md:w-1/4',
          'p-6',
          'lg:p-10',
          'min-h-screen',
          'flex',
          'flex-col',
          'justify-center',
          'relative',
        )}
      >
        <div className={cn(styles.lables, 'mb-6')}>
          <h2 className={cn(styles['side-lable'], 'leading-tight', 'mb-2')}>
            {t('LoginPage.hey')}
          </h2>
          <h3 className={cn(styles['side-lable'], styles['side-lable-small'])}>
            {t('LoginPage.welcome')}
          </h3>
        </div>
        <LoginForm />
        <LanguageForm />
      </div>
    </div>
  );
};

export default LoginPage;
