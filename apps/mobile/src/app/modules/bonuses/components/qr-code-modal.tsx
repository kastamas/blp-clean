import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Button, Modal } from 'react-native';
import styled from 'styled-components/native';
import { PrimaryButton } from '../../../common/components/buttons/primary-button';

interface IComponentProps {
  visible: boolean;
  onClose(): void;
  value: string;
}

const Wrapper = styled.View`
  justify-content: center;
  height: 100%;
  align-items: center;
`;

const CloseButtonWrapper = styled.View`
  width: 50%;
  margin-top: 50px;
`;

export const QrCodeModal: React.FC<IComponentProps> = ({
  visible,
  onClose,
  value,
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
        <QRCode size={350} value={value} />
        <CloseButtonWrapper>
          <PrimaryButton onPress={() => onClose()}>Закрыть</PrimaryButton>
        </CloseButtonWrapper>
      </Wrapper>
    </Modal>
  );
};
