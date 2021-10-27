import React, { useEffect, useState } from 'react';
import { RefreshControl, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { BonusCard } from '../modules/bonuses/components/bonus-card';
import { TransactionHistory } from '../modules/bonuses/components/transaction-history';
import { bonusesBalanceActions } from '../modules/bonuses/branches/bonuses-balance.branch';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { bonusesHistoryActions } from '../modules/bonuses/branches/bonuses-history.branch';
import { EBonusesType } from '@business-loyalty-program/enums';
import { TScreenProps } from '../navigation/types';
import { EApplicationScreens } from '../screens';

const Wrapper = styled.ScrollView`
  height: 100%;
`;

export const HomeScreen: React.FC<
  TScreenProps<EApplicationScreens.Home>
> = () => {
  const [selectedType, setSelectedType] = useState(EBonusesType.All);
  const dispatch = useAppDispatch();
  const { balance, history, loading } = useAppSelector((state) => ({
    balance: state.bonusesBalance.data,
    history: state.bonusesHistory.data,
    loading: state.bonusesBalance.loading || state.bonusesHistory.loading,
  }));

  function updateData() {
    dispatch(bonusesBalanceActions.getBalance());
    dispatch(bonusesHistoryActions.getHistory(selectedType));
  }

  useEffect(() => {
    updateData();
  }, [selectedType]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f8" />
      <Wrapper
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => updateData()} />
        }
      >
        <BonusCard balance={balance} />
        <TransactionHistory
          selected={selectedType}
          history={history}
          onSelect={setSelectedType}
        />
      </Wrapper>
    </>
  );
};
