import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { PosResponseDto } from '@business-loyalty-program/types';
import { PosInfo } from './pos-info';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IComponentProps {
  pos: PosResponseDto;
  visible: boolean;
  onClose(): void;
}

const Wrapper = styled.View`
  height: 100%;
  position: relative;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 250px;
`;

const InfoWrapper = styled.View`
  padding: 20px;
  padding-top: 24px;
  position: absolute;
  width: 100%;
  top: 230px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: white;
`;

const StyledTouchableHighlight = styled.TouchableHighlight`
  position: absolute;
  top: 6px;
  left: 6px;
  border-radius: 50px;
  padding: 10px;
`;

export const PosModal: React.FC<IComponentProps> = ({
  pos,
  onClose,
  visible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <Wrapper>
        <StyledImage
          source={require('../../../../assets/images/pos-item-placeholder.png')}
        />
        <StyledTouchableHighlight
          underlayColor="#a7a5a56e"
          onPress={() => onClose()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </StyledTouchableHighlight>
        <InfoWrapper>
          <PosInfo pos={pos} />
        </InfoWrapper>
      </Wrapper>
    </Modal>
  );
};
