import React from 'react';
import styled from 'styled-components/native';
import { TransactionsNavigation } from './transactions-navigation';
import { BonusTransactionResponseMobileDto } from '@business-loyalty-program/types';
import { TransactionsList } from './transactions-list';
import { EBonusesType } from '@business-loyalty-program/enums';

const Wrapper = styled.View`
  padding: 0 12px;
  margin-top: 20px;
`;

interface IComponentProps {
  selected: EBonusesType;
  onSelect(type: EBonusesType): void;
  history: BonusTransactionResponseMobileDto[];
}

export const TransactionHistory: React.FC<IComponentProps> = ({
  selected,
  history,
  onSelect,
}) => {
  return (
    <Wrapper>
      <TransactionsNavigation selected={selected} onSelect={onSelect} />
      <TransactionsList items={history} />
    </Wrapper>
  );
};
