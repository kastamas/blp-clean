import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableHighlight, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { QrCodeModal } from './qr-code-modal';
import { useAppSelector } from '../../../store/hooks';

const CardBackgroundWrapper = styled.ImageBackground`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  height: 200px;
  resize-mode: stretch;
  padding: 20px 30px;
`;

const InfoHeading = styled.Text`
  color: white;
  font-size: 12px;
`;

const CoinImage = styled.Image`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  margin-bottom: 8px;
`;

const BalanceText = styled.Text`
  color: white;
  font-size: 40px;
`;

const BalanceWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const InfoWrapper = styled.View`
  height: 100%;
  flex: 1;
`;

const QrCodeWrapper = styled.View`
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

interface IComponentProps {
  balance: number;
}

export const BonusCard: React.FC<IComponentProps> = ({ balance }) => {
  const [modalVisible, setModalVisibility] = useState(false);
  const user = useAppSelector((state) => state.auth.data.user);

  return (
    <>
      <TouchableHighlight
        onPress={() => setModalVisibility(true)}
        activeOpacity={0.9}
        underlayColor="#F3F4F8"
      >
        <View>
          <CardBackgroundWrapper
            source={require('../../../../assets/images/card-bg.png')}
          >
            <InfoWrapper>
              <InfoHeading>Ваши баллы</InfoHeading>
              <BalanceWrapper>
                <BalanceText>{balance}</BalanceText>
                <CoinImage
                  source={require('../../../../assets/images/coin.png')}
                />
              </BalanceWrapper>
            </InfoWrapper>
            <QrCodeWrapper>
              <QRCode
                color="white"
                backgroundColor="transparent"
                size={70}
                value={user.id}
              />
            </QrCodeWrapper>
          </CardBackgroundWrapper>
        </View>
      </TouchableHighlight>
      <QrCodeModal
        value={user.id}
        visible={modalVisible}
        onClose={() => setModalVisibility(false)}
      />
    </>
  );
};
