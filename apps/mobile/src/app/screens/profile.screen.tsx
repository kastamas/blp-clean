import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authActions } from '../modules/auth/auth.branch';
import { TScreenProps } from '../navigation/types';
import { EApplicationScreens } from '../screens';
import { SecondaryButton } from '../common/components/buttons/secondary-button';
import { SocialButton } from '../common/components/buttons/social-button';
import { PrimaryButton } from '../common/components/buttons/primary-button';
import { Alert, StatusBar } from 'react-native';
import { ProfileLink } from '../modules/users/components/profile-link';

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-bottom: 12px;
`;

const StyledSocialButton = styled(SocialButton)`
  margin-bottom: 12px;
`;

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-bottom: 12px;
`;

const Wrapper = styled.View`
  margin-top: 28px;
  height: 100%;
  padding: 20px;
`;

export const ProfileScreen: React.FC<
  TScreenProps<EApplicationScreens.Profile>
> = ({ navigation }) => {
  const user = useAppSelector((state) => state.auth.data.user);
  const error = useAppSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      const message = error?.error?.message;
      if (message === 'Request failed with status code 409') {
        Alert.alert('Данный аккаунт уже привязан');
      }
    }
  }, [error]);
  const dispatch = useAppDispatch();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f8" />
      <Wrapper>
        <ProfileLink user={user} />
        {!user.phone && (
          <StyledPrimaryButton
            onPress={() => navigation.navigate(EApplicationScreens.PhoneSignIn)}
          >
            Привязать номер телефона
          </StyledPrimaryButton>
        )}
        {!user.googleId && (
          <StyledSocialButton
            source={require('../assets/images/google-icon.png')}
            onPress={() => dispatch(authActions.singInSocial('google'))}
          >
            Привязать Google аккаунт
          </StyledSocialButton>
        )}
        {!user.vkId && (
          <StyledSocialButton
            source={require('../assets/images/vk-icon.png')}
            onPress={() => dispatch(authActions.singInSocial('vk'))}
          >
            Привязать ВК аккаунт
          </StyledSocialButton>
        )}
        <StyledSecondaryButton onPress={() => dispatch(authActions.singOut())}>
          Выйти
        </StyledSecondaryButton>
      </Wrapper>
    </>
  );
};
