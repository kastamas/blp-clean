import { Modal, ModalProps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { BlpIcon } from '../icons/blp-icon';
import { palette } from '../styles/theme';

const CloseIcon = styled(BlpIcon)`
  color: ${palette.textSecondary};
  font-size: 24px;
  margin-top: 20px;
  margin-right: 12px;
  transition: color 200ms ease;

  :hover {
    color: ${palette.text};
  }
`;

interface IComponentProps extends ModalProps {
  visible?: boolean;
  isAltColour?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  width?: number | string;
}

const modalDefaultWidth = 420;

export const StyledModal: React.FC<IComponentProps> = (props) => {
  const {
    children,
    width,
    onOk,
    onCancel,
    visible,
    isAltColour,
    ...modalProps
  } = props;

  return (
    <Modal
      onOk={onOk}
      onCancel={onCancel}
      visible={visible}
      footer={null}
      bodyStyle={{
        backgroundColor: isAltColour ? '#F3F4F8' : 'white',
        borderRadius: '4px',
      }}
      width={width || modalDefaultWidth}
      {...modalProps}
      closeIcon={<CloseIcon iconName="close" />}
    >
      {children}
    </Modal>
  );
};
