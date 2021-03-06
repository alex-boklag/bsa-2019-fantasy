import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import ResetPasswordForm from 'components/ChangePasswordForms/ResetPasswordForm';

import styles from '../Auth/styles.module.scss';

const ResetPassword = () => {
  const { t } = useTranslation();

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
          <h1 className={cn(styles['main-lable'], 'w-full')}>
            {t('ChangePasswordPage.changePassword')}
          </h1>
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
        )}
      >
        <div className={cn(styles.lables, 'mb-6')}>
          <h2 className={cn(styles['side-lable'], 'leading-tight', 'mb-3')}>
            {t('ChangePasswordPage.title')}
          </h2>
          <h3 className={cn(styles['side-lable'], styles['side-lable-small'])}>
            {t('ChangePasswordPage.subtitle.changePassword')}
          </h3>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
