import React, { useEffect } from 'react';
import { SplashScreen } from '../screens/splash.screen';
import { PublicNavigation } from './public.navigation';
import { PrivateNavigation } from './private.navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authActions, EAuthState } from '../modules/auth/auth.branch';

export const Navigation: React.FC = () => {
  const authState = useAppSelector((state) => state.auth.data.authState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authActions.checkAuth());
  }, []);

  if (authState === EAuthState.Initial) {
    return <SplashScreen />;
  }

  if (authState === EAuthState.LoggedOut) {
    return <PublicNavigation />;
  }

  return <PrivateNavigation />;
};
