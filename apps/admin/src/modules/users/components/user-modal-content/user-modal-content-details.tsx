import * as React from 'react';
import styled from 'styled-components';
import { UserDetailsInfo } from './user-details-info';
import {
  BlpIcon,
  buttonTextMixin,
  palette,
  textMixin,
} from '@business-loyalty-program/ui-kit';
import { UserAvatar } from '../user-avatar';
import { UsersResponseDto } from '@business-loyalty-program/types';
import { DisplayUserName } from '../display-user-name';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${UserDetailsInfo} {
    margin-top: 20px;
    margin-bottom: 28px;
  }
`;

const BackButton = styled.div`
  ${textMixin};

  display: flex;
  align-items: center;
  color: ${palette.textSecondary};
  cursor: pointer;
  margin-bottom: 28px;

  :hover {
    color: ${palette.text};
  }

  ${BlpIcon} {
    margin-right: 8px;
  }
`;

const StyledUserAvatar = styled(UserAvatar)`
  width: 52px;
  height: 52px;
  margin-right: 12px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${palette.elements};
  padding-bottom: 16px;
`;

const UserName = styled(DisplayUserName)`
  ${buttonTextMixin};
`;

interface IComponentProps {
  user: UsersResponseDto;
  onBackButtonClick(): void;
}

export const UserModalContentDetails: React.FC<IComponentProps> = ({
  onBackButtonClick,
  user,
}) => {
  return (
    <Wrapper>
      <BackButton onClick={() => onBackButtonClick()}>
        <BlpIcon iconName="arrow-left" />
        Назад
      </BackButton>

      <UserInfoWrapper>
        <StyledUserAvatar />
        <UserName user={user} />
      </UserInfoWrapper>

      <UserDetailsInfo user={user} />
    </Wrapper>
  );
};
