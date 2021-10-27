import * as React from 'react';
import styled from 'styled-components';
import { UserBonusTransactionResponseDto } from '@business-loyalty-program/types';
import { EBonusTransactionType } from '@business-loyalty-program/enums';

const Wrapper = styled.span``;

interface IComponentProps {
  transaction: UserBonusTransactionResponseDto;
  className?: string;
}

function getTransactionToDisplay(transaction: UserBonusTransactionResponseDto) {
  const { type, amount } = transaction;

  if (type === EBonusTransactionType.Welcome) {
    return 'Приветсвенный бонус';
  }

  if (type === EBonusTransactionType.POS) {
    return 'Покупка';
  }

  if (type === EBonusTransactionType.Manual) {
    if (amount > 0) {
      return 'Ручное начисление';
    }

    if (amount < 0) {
      return 'Ручное списание';
    }
  }

  return '';
}

const DisplayUserTransactionTypeComponent: React.FC<IComponentProps> = ({
  transaction,
  className,
}) => {
  return (
    <Wrapper className={className}>
      {getTransactionToDisplay(transaction)}
    </Wrapper>
  );
};

export const DisplayUserTransactionType = styled(
  DisplayUserTransactionTypeComponent
)``;
