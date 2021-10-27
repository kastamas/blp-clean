import React from 'react';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authActions } from '../modules/auth/auth.branch';
import { PrimaryButton } from '../common/components/buttons/primary-button';
import { SocialButton } from '../common/components/buttons/social-button';
import { EApplicationScreens } from '../screens';
import { TScreenProps } from '../navigation/types';
import { PublicNavigationWrapper } from '../common/components/wrappers/public-navigation.wrapper';

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 48px;
  margin-bottom: 12px;
`;

const StyledSocialButton = styled(SocialButton)`
  margin-bottom: 12px;
`;

export const AuthScreen: React.FC<TScreenProps<EApplicationScreens.Auth>> = ({
  navigation,
}) => {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  return (
    <PublicNavigationWrapper title="Войдите в ситему">
      <StyledPrimaryButton
        disabled={loading}
        onPress={() => navigation.navigate(EApplicationScreens.PhoneSignIn)}
      >
        Войти по номеру телефона
      </StyledPrimaryButton>
      <StyledSocialButton
        disabled={loading}
        source={require('../assets/images/google-icon.png')}
        onPress={() => dispatch(authActions.singInSocial('google'))}
      >
        Войти через Google
      </StyledSocialButton>
      <SocialButton
        disabled={loading}
        source={require('../assets/images/vk-icon.png')}
        onPress={() => dispatch(authActions.singInSocial('vk'))}
      >
        Войти через ВК
      </SocialButton>
    </PublicNavigationWrapper>
  );
};
