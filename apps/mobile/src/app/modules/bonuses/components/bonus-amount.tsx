import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PosText = styled.Text`
  color: #07cda9;
  margin-right: 4px;
  font-size: 14px;
`;

const NegText = styled.Text`
  color: black;
  margin-right: 4px;
  font-size: 14px;
`;

const IconWrapper = styled.Image`
  width: 15px;
  height: 15px;
`;

interface IComponentProps {
  amount: number;
}

export const BonusAmount: React.FC<IComponentProps> = ({ amount }) => {
  if (amount > 0) {
    return (
      <Wrapper>
        <PosText>+ {amount}</PosText>
        <IconWrapper
          source={require('../../../../assets/images/coin-icon-pos.png')}
        />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <NegText>- {-1 * amount}</NegText>
        <IconWrapper
          source={require('../../../../assets/images/coin-icon-neg.png')}
        />
      </Wrapper>
    );
  }
};
