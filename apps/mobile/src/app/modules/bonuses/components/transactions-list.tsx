import React from 'react';
import styled from 'styled-components/native';
import { BonusTransactionResponseMobileDto } from '@business-loyalty-program/types';
import { StyleSheet } from 'react-native';
import { BonusAmount } from './bonus-amount';
import { BonusInfo } from './bonus-info';

const Wrapper = styled.View`
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ListItemWrapper = styled.View`
  padding: 18px;
  padding-left: 0;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #dae0ed;
  border-bottom-width: 1px;
`;

const { lastItem } = StyleSheet.create({
  lastItem: {
    borderBottomWidth: 0,
  },
});

interface IComponentProps {
  items: BonusTransactionResponseMobileDto[];
}

export const TransactionsList: React.FC<IComponentProps> = ({ items }) => {
  return (
    <Wrapper>
      {items.map((item, index) => (
        <ListItemWrapper
          style={index === items.length - 1 ? lastItem : {}}
          key={item.id}
        >
          <BonusInfo item={item} />
          <BonusAmount amount={item.amount} />
        </ListItemWrapper>
      ))}
    </Wrapper>
  );
};
