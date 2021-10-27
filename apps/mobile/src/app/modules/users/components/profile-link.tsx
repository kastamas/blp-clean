import React from 'react';
import styled from 'styled-components/native';
import { UsersMobileResponseDto } from '@business-loyalty-program/types';
import { TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { EApplicationScreens } from '../../../screens';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const Title = styled.Text`
  color: #051c3f;
  font-size: 17px;
`;

const Hint = styled.Text`
  color: #858ea3;
  font-size: 14px;
`;

const InfoWrapper = styled.View`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 100px;
`;

const ChevronWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface IComponentProps {
  user: UsersMobileResponseDto;
}

export const ProfileLink: React.FC<IComponentProps> = ({ user }) => {
  const navigation = useNavigation();

  const name =
    user.name || user.surname
      ? `${user.name || ''} ${user.surname || ''}`
      : user.phone;

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="#F3F4F8"
      style={{ marginBottom: 28 }}
      onPress={() => navigation.navigate(EApplicationScreens.EditProfile)}
    >
      <Wrapper>
        <Avatar
          source={
            user.image
              ? { uri: user.image.medium }
              : require('../../../../assets/images/avatar-placeholder.png')
          }
        />
        <InfoWrapper>
          <Title>{name}</Title>
          <Hint>Редактировать профиль</Hint>
        </InfoWrapper>
        <ChevronWrapper>
          <Ionicons name="chevron-forward-outline" size={22} color="#858EA3" />
        </ChevronWrapper>
      </Wrapper>
    </TouchableHighlight>
  );
};
