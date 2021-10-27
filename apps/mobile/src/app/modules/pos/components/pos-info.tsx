import React from 'react';
import { Linking, View } from 'react-native';
import { PosResponseDto } from '@business-loyalty-program/types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CallButton = styled.TouchableHighlight`
  flex: 1;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const InfoWrapper = styled.View`
  margin-top: 12px;
`;

const InfoItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const CallText = styled.Text`
  color: #2f8dfe;
`;

const InfoItemText = styled.Text`
  color: black;
  font-size: 14px;
  margin-left: 8px;
`;

interface IComponentProps {
  pos: PosResponseDto;
}

export const PosInfo: React.FC<IComponentProps> = ({ pos }) => {
  return (
    <>
      <Title>{pos.name}</Title>
      <InfoWrapper>
        <InfoItem>
          <Ionicons name="map" color="#858EA3" size={16} />
          <InfoItemText>{pos.address}</InfoItemText>
        </InfoItem>
        <InfoItem>
          <Ionicons name="time" color="#858EA3" size={16} />
          <InfoItemText>09:00-20:00</InfoItemText>
        </InfoItem>
        <InfoItem>
          <Ionicons name="call" color="#858EA3" size={16} />
          <InfoItemText>{pos.phone}</InfoItemText>
          <CallButton
            underlayColor="white"
            onPress={() => Linking.openURL(`tel:${pos.phone}`)}
          >
            <View>
              <CallText>Позвонить</CallText>
            </View>
          </CallButton>
        </InfoItem>
      </InfoWrapper>
    </>
  );
};
