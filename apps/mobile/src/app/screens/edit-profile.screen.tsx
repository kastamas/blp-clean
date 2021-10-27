import React from 'react';
import { TScreenProps } from '../navigation/types';
import { EApplicationScreens } from '../screens';
import { ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { EditProfileForm } from '../modules/users/components/edit-profile-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { UserAvatarEdit } from '../modules/users/components/user-avatar-edit';
import { UsersApiService } from '../modules/users/users-api.service';
import { authActions } from '../modules/auth/auth.branch';

const Wrapper = styled.View`
  padding: 20px 16px;
`;

const Spacing = styled.View`
  height: 10px;
`;

export const EditProfileScreen: React.FC<
  TScreenProps<EApplicationScreens.EditProfile>
> = ({ navigation }) => {
  const user = useAppSelector((state) => state.auth.data.user);
  const dispatch = useAppDispatch();

  function onSubmit(data: any) {
    new UsersApiService().updateCurrentUser(data).then((updatedUser) => {
      dispatch(authActions.setUser(updatedUser));
      navigation.goBack();
    });
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f8" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Wrapper>
          <UserAvatarEdit onSubmit={onSubmit} user={user} />
          <Spacing />
          <EditProfileForm onSubmit={onSubmit} user={user} />
        </Wrapper>
      </ScrollView>
    </>
  );
};
