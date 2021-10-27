import * as React from 'react';
import styled from 'styled-components';
import {
  BlpIcon,
  palette,
  PrimaryButtonBig,
  GhostButtonBig,
  StyledModal,
  buttonTextMixin,
  DefaultButton,
} from '@business-loyalty-program/ui-kit';
import { UserAvatar } from '../user-avatar';
import { UsersResponseDto } from '@business-loyalty-program/types';
import { useContext, useEffect, useState } from 'react';
import { usePostCompanyUserBonuses } from '../../../bonuses/bonuses.api';
import { CurrentCompanyContext } from '../../../companies/current-company.context';
import { UserBonusesModalContent } from './user-bonuses-modal-content';
import { UserDetailsInfo } from './user-details-info';
import { UserModalContentDetails } from './user-modal-content-details';
import Link from 'next/link';
import { routes } from '../../../../routes';
import { LastPurchase } from '../last-purchase';
import { DisplayUserName } from '../display-user-name';
import { InfoColumn } from '../../../../common/data-display/info/info-column';

const UserModalAvatar = styled(UserAvatar)`
  width: 88px;
  height: 88px;
  margin-bottom: 12px;
`;

const UserModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${BlpIcon} {
    color: ${palette.textSecondary};

    :hover {
      color: ${palette.text};
      cursor: pointer;
    }
  }
`;

const UserName = styled(DisplayUserName)`
  ${buttonTextMixin};
  text-align: left;
  margin-bottom: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${UserDetailsInfo} {
    margin-top: 20px;
    margin-bottom: 28px;
  }
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;

const PointsIcon = styled(BlpIcon)`
  font-size: 12px;
`;

const StyledInfoColumn = styled(InfoColumn)`
  margin-top: 16px;
  margin-bottom: 28px;
`;

const UserTransactionsButton = styled(DefaultButton)`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-top: 16px;
  background: ${palette.backgroundPrimary};

  ${BlpIcon} {
    margin-right: 4px;
  }
`;

interface IComponentProps {
  user: UsersResponseDto;
  refreshData(): void;
}

export enum EUserModalMode {
  Add = 'add',
  Remove = 'remove',
}

export const UserModalContent: React.FC<IComponentProps> = ({
  user,
  refreshData,
}) => {
  const {
    bonusAmount,
    lastTransactionDate,
    image,
    name,
    paidBonuses,
    paidRub,
  } = user;

  const [modalMode, setModalMode] = useState<EUserModalMode>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { company } = useContext(CurrentCompanyContext);
  const { isLoading, response, apiAction } = usePostCompanyUserBonuses();
  const [isDetailedView, setIsDetailedView] = useState(false);

  useEffect(() => {
    if (response) {
      handleCancel();
      refreshData();
    }
  }, [response]);

  const showModal = (modalMode) => {
    setIsModalVisible(true);
    setModalMode(modalMode);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBonusesChange = (values: { amount: number }) => {
    const bonuses =
      modalMode === EUserModalMode.Add ? values.amount : values.amount * -1;

    apiAction(company.id, user.id, { amount: bonuses });
  };

  const statisticsValues = [
    { title: 'Оплачено рублями', value: paidRub },
    { title: 'Оплачено баллами', value: paidBonuses },
    { title: 'Остаток баллов', value: bonusAmount },
  ];

  return (
    <>
      {!isDetailedView ? (
        <>
          <Wrapper>
            <UserModalAvatar image={image} />
            <UserModalHeader>
              <div>
                <UserName user={user} />
                <LastPurchase purchaseDate={lastTransactionDate} />
              </div>
              <div>
                <div onClick={() => setIsDetailedView(true)}>
                  <BlpIcon iconName="chevron-right" />
                </div>
              </div>
            </UserModalHeader>

            <Link href={routes.client(user.id)}>
              <UserTransactionsButton>
                <BlpIcon iconName="credit-card" />
                Операции клиента
              </UserTransactionsButton>
            </Link>

            <StyledInfoColumn infoValues={statisticsValues} />

            <ButtonsWrapper>
              <GhostButtonBig
                disabled={bonusAmount === 0}
                onClick={() => showModal(EUserModalMode.Remove)}
              >
                Списать <PointsIcon iconName="blp-coin" />
              </GhostButtonBig>
              <PrimaryButtonBig onClick={() => showModal(EUserModalMode.Add)}>
                Начислить <PointsIcon iconName="blp-coin" />
              </PrimaryButtonBig>
            </ButtonsWrapper>
          </Wrapper>
        </>
      ) : (
        <UserModalContentDetails
          onBackButtonClick={() => setIsDetailedView(false)}
          user={user}
        />
      )}

      <StyledModal
        visible={isModalVisible}
        onCancel={handleCancel}
        centered
        destroyOnClose={true}
        width={424}
        isAltColour={true}
      >
        <UserBonusesModalContent
          modalMode={modalMode}
          user={user}
          handleBonusesChange={handleBonusesChange}
          handleCancel={handleCancel}
          isLoading={isLoading}
        />
      </StyledModal>
    </>
  );
};
