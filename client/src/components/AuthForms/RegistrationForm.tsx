import React from 'react';
import { withRouter } from 'react-router';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { registration } from 'containers/Profile/actions';

import styles from './styles.module.scss';
import useValidation from './useValidation';

const RegistrationForm = withRouter(({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    name,
    email,
    password,
    isNameValid,
    isEmailValid,
    isPasswordValid,
    nameChanged,
    emailChanged,
    passwordChanged,
    validateEmail,
    validatePassword,
    validateName,
  } = useValidation();

  const handleClickRegister = (ev: React.FormEvent) => {
    ev.preventDefault();
    const valid = [validateEmail(), validatePassword(), validateName()].every(Boolean);

    if (!valid) {
      return;
    }
    dispatch(registration({ name, email, password }));
  };

  let [firstNameClass, emailClass, passwordClass] = [[], [], []].map(
    () =>
      'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
  );

  return (
    <div className={cn(styles['form-registration'], 'w-full', 'max-w-xs')}>
      <form className='pt-3' onSubmit={handleClickRegister} autoComplete='off' noValidate>
        <div className='mb-4'>
          <label>
            {t('AuthForms.name')}
            <input
              className={
                isNameValid ? firstNameClass : (firstNameClass += ` ${styles.error}`)
              }
              id='first-name'
              type='text'
              placeholder={t('AuthForms.name')}
              value={name}
              onChange={(ev) => nameChanged(ev.target.value)}
              onBlur={validateName}
              autoComplete='off'
            />
            {!isNameValid && (
              <p className='mt-1 text-red-500 text-xs italic text-justify'>
                {t('AuthForms.atLeastName')}
              </p>
            )}
          </label>
        </div>
        <div className='mb-2'>
          <label>
            {t('AuthForms.email')}
            <input
              className={isEmailValid ? emailClass : (emailClass += ` ${styles.error}`)}
              id='email'
              type='email'
              placeholder={t('AuthForms.email')}
              onChange={(ev) => emailChanged(ev.target.value)}
              onBlur={validateEmail}
              autoComplete='off'
            />
            <p className='mt-1 text-xs italic text-justify'>
              {t('AuthForms.sendConfirm')}
            </p>
          </label>
        </div>
        <div className='mb-6'>
          <label>
            {t('AuthForms.password')}
            <input
              className={
                isPasswordValid ? passwordClass : (passwordClass += ` ${styles.error}`)
              }
              id='password'
              type='password'
              placeholder='*************'
              onChange={(ev) => passwordChanged(ev.target.value)}
              onBlur={validatePassword}
              autoComplete='new-password'
            />
            {!isPasswordValid && (
              <p className='mt-1 text-red-500 text-xs italic text-justify'>
                {t('AuthForms.atLeastPassword')}
              </p>
            )}
          </label>
        </div>
        <div className='flex items-center justify-between flex-wrap'>
          <button
            type='submit'
            className='truncate lg:w-7/12 md:w-full font-bold rounded py-1 text-center mr-2 mb-2 border border-transparent text-secondary bg-primary shadow uppercase'
          >
            {t('AuthForms.signup')}
          </button>
          <button
            type='button'
            className='break-all lg:w-4/12 md:w-full opacity-50 hover:opacity-100 font-bold rounded py-1 text-center mb-2 border border-primary bg-transparent shadow uppercase'
            onClick={() => history.push('/login')}
          >
            {t('AuthForms.login')}
          </button>
        </div>
      </form>
    </div>
  );
});

export default RegistrationForm;
