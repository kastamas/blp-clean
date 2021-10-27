import React from 'react';
import styled from 'styled-components/native';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { EBonusesType } from '@business-loyalty-program/enums';

const Wrapper = styled.View`
  margin-bottom: 12px;
  flex-direction: row;
`;

const ButtonWrapper = styled.View`
  background-color: white;
  padding: 6px 12px;
  border-radius: 8px;
  margin-right: 16px;
  border-width: 1px;
  border-color: white;
`;

const ButtonText = styled.Text`
  color: #2f8dfe;
  font-size: 12px;
  line-height: 16px;
`;

interface IComponentProps {
  selected: EBonusesType;
  onSelect(type: EBonusesType): void;
}

const { activeButton } = StyleSheet.create({
  activeButton: {
    borderColor: '#2f8dfe',
    borderWidth: 1,
    backgroundColor: '#EBFAFF',
  },
});

export const TransactionsNavigation: React.FC<IComponentProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={() => onSelect(EBonusesType.All)}>
        <ButtonWrapper
          style={selected === EBonusesType.All ? activeButton : {}}
        >
          <ButtonText>Все</ButtonText>
        </ButtonWrapper>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect(EBonusesType.Add)}>
        <ButtonWrapper
          style={selected === EBonusesType.Add ? activeButton : {}}
        >
          <ButtonText>Начисления</ButtonText>
        </ButtonWrapper>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect(EBonusesType.Subtract)}>
        <ButtonWrapper
          style={selected === EBonusesType.Subtract ? activeButton : {}}
        >
          <ButtonText>Списания</ButtonText>
        </ButtonWrapper>
      </TouchableOpacity>
    </Wrapper>
  );
};
