import * as React from 'react';
import styled from 'styled-components';
import { UsersBaseResponseDto } from '@business-loyalty-program/types';

const Wrapper = styled.span``;

interface IComponentProps {
  user?: UsersBaseResponseDto;
  className?: string;
}

function getNameToDisplay(user: UsersBaseResponseDto) {
  if (user) {
    const { name = '', surname = '', phone, id } = user;

    if (name && surname) {
      return `${name} ${surname}`;
    }

    if (name) {
      return `${name}`;
    }

    if (surname) {
      return `${surname}`;
    }

    if (phone) {
      return `${phone}`;
    }

    return id;
  }

  return '';
}

const UserNameComponent: React.FC<IComponentProps> = ({ user, className }) => {
  return <Wrapper className={className}>{getNameToDisplay(user)}</Wrapper>;
};

export const DisplayUserName = styled(UserNameComponent)``;
