import * as React from 'react';
import styled from 'styled-components';
import { Form } from 'antd';
import {
  ButtonText,
  BlpIcon,
  ModalCancelButton,
  palette,
  PrimaryButtonBig,
  StyledForm,
  StyledInputNumber,
  buttonTextMixin,
} from '@business-loyalty-program/ui-kit';
import { EUserModalMode } from './user-modal-content';
import { UserAvatar } from '../user-avatar';
import { UsersResponseDto } from '@business-loyalty-program/types';
import { DisplayUserName } from '../display-user-name';

const Wrapper = styled.div``;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 28px;
  align-items: center;
`;

const PointsIcon = styled(BlpIcon)`
  font-size: 12px;
`;

const StyledUserAvatar = styled(UserAvatar)`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled(DisplayUserName)`
  ${buttonTextMixin};
  text-align: left;
  margin-bottom: 4px;
`;

const UserBonusesAmount = styled.span`
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;

  color: ${palette.textSecondary};
`;

interface IComponentProps {
  modalMode: EUserModalMode;
  user: UsersResponseDto;
  isLoading: boolean;
  handleBonusesChange(values: { amount: number }): void;
  handleCancel(): void;
}

export const UserBonusesModalContent: React.FC<IComponentProps> = ({
  user,
  modalMode,
  handleBonusesChange,
  isLoading,
  handleCancel,
}) => {
  return (
    <Wrapper>
      <UserInfoWrapper>
        <StyledUserAvatar image={user.image} />
        <UserInfo>
          <UserName user={user} />
          <UserBonusesAmount>
            Остаток баллов: {user.bonusAmount}
          </UserBonusesAmount>
        </UserInfo>
      </UserInfoWrapper>

      <StyledForm
        layout="vertical"
        initialValues={{ amount: 100 }}
        onFinish={(values: any) => {
          handleBonusesChange(values);
        }}
      >
        <Form.Item label="Количество баллов" name="amount">
          <StyledInputNumber min={1} />
        </Form.Item>

        <Form.Item>
          <ButtonsWrapper>
            <ModalCancelButton disabled={isLoading} onClick={handleCancel}>
              Отмена
            </ModalCancelButton>

            <PrimaryButtonBig disabled={isLoading}>
              {modalMode === 'add' ? 'Начислить' : 'Списать'}{' '}
              <PointsIcon iconName="blp-coin" />
            </PrimaryButtonBig>
          </ButtonsWrapper>
        </Form.Item>
      </StyledForm>
    </Wrapper>
  );
};
