import React from 'react';
import styled from 'styled-components/native';
import { BonusTransactionResponseMobileDto } from '@business-loyalty-program/types';
import { EBonusTransactionType } from '@business-loyalty-program/enums';
import moment from 'moment';
import { PosImage } from '../../../common/components/pos-image';

const Wrapper = styled.View`
  flex-direction: row;
`;

const InfoWrapper = styled.View`
  margin-left: 10px;
`;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: black;
`;

const DateWrapper = styled.Text`
  font-size: 12px;
  font-weight: 400;
`;

function getTitle({
  type,
  posName,
  amount,
}: BonusTransactionResponseMobileDto) {
  switch (type) {
    case EBonusTransactionType.Manual:
      return 'Ручное ' + (amount > 0 ? 'начисление' : 'списание');
    case EBonusTransactionType.POS:
      return posName;
    case EBonusTransactionType.Welcome:
      return 'Приветственный бонус';
  }
}

interface IComponentProps {
  item: BonusTransactionResponseMobileDto;
}

export const BonusInfo: React.FC<IComponentProps> = ({ item }) => {
  return (
    <Wrapper>
      <PosImage
        source={require('../../../../assets/images/poi-placeholder.png')}
      />
      <InfoWrapper>
        <Title>{getTitle(item)}</Title>
        <DateWrapper>
          {moment(item.createdAt).format('DD.MM.YYYY HH:mm')}
        </DateWrapper>
      </InfoWrapper>
    </Wrapper>
  );
};
