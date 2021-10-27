import React from 'react';
import styled from 'styled-components/native';
import type { PosResponseDto } from '@business-loyalty-program/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PosInfo } from './pos-info';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';

const Wrapper = styled.View`
  position: absolute;
  bottom: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const ContentWrapper = styled.View`
  background-color: white;
  height: 180px;
  width: 90%;
  border-radius: 10px;
  padding: 20px 12px;
`;

const CloseButton = styled.TouchableHighlight`
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px;
  z-index: 1;
`;

interface IComponentProps {
  pos: PosResponseDto;
  onClose(): void;
  onSlideUp(): void;
}

export const PosMapOverlay: React.FC<IComponentProps> = ({
  pos,
  onClose,
  onSlideUp,
}) => {
  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          onSlideUp();
        }
      }}
    >
      <Wrapper>
        <ContentWrapper>
          <CloseButton underlayColor="white" onPress={() => onClose()}>
            <Ionicons name="close-outline" size={25} />
          </CloseButton>
          <PosInfo pos={pos} />
        </ContentWrapper>
      </Wrapper>
    </FlingGestureHandler>
  );
};
