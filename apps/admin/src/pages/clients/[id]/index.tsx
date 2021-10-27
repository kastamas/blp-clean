import * as React from 'react';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { CurrentCompanyContext } from '../../../modules/companies/current-company.context';
import { useGetCompanyUser, UsersApi } from '../../../modules/users/users.api';
import { BasePageWrapper } from '../../../common/wrappers/base-page-wrapper';
import { TitleWithLink } from '../../../common/navigation/title-with-link';
import { routes } from '../../../routes';
import { UserAvatar } from '../../../modules/users/components/user-avatar';
import { DisplayUserName } from '../../../modules/users/components/display-user-name';
import {
  BlpIcon,
  buttonTextMixin,
  GhostButtonSmall,
  palette,
  PrimaryButtonSmall,
  StyledModal,
  StyledTable,
} from '@business-loyalty-program/ui-kit';
import { LastPurchase } from '../../../modules/users/components/last-purchase';
import { Drawer } from 'antd';
import { UserDetailsInfo } from '../../../modules/users/components/user-modal-content/user-details-info';
import { GetServerSideProps } from 'next';
import { CompaniesApi } from '../../../modules/companies/companies.api';
import {
  UserBonusTransactionResponseDto,
  UsersResponseDto,
} from '@business-loyalty-program/types';
import { DateTime } from 'luxon';
import { useGetCompanyUserTransactions } from '../../../modules/transactions/transactions.api';
import { TablePrimaryText } from '../../../common/data-display/table/table-primary-text';
import { TableSecondaryText } from '../../../common/data-display/table/table-secondary-text';
import { DisplayUserTransactionType } from '../../../modules/users/components/display-user-transaction-type';
import { ColumnsType } from 'antd/es/table';
import { UserSummaryInfo } from '../../../modules/users/components/user-summary-info';
import { UserBonusesModalContent } from '../../../modules/users/components/user-modal-content/user-bonuses-modal-content';
import { EUserModalMode } from '../../../modules/users/components/user-modal-content/user-modal-content';
import { usePostCompanyUserBonuses } from '../../../modules/bonuses/bonuses.api';

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;

  ${UserAvatar} {
    height: 80px;
    width: 80px;
    margin-right: 16px;
  }
`;

const UserControlsWrapper = styled.div`
  display: flex;
  margin-top: 54px;
  align-items: flex-start;

  button:not(:last-child) {
    margin-right: 8px;
  }
`;

const IconWrapper = styled.div`
  margin-left: 32px;

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
  margin-bottom: 8px;
`;

const DateWrapper = styled.div`
  display: flex;
`;

const columns: ColumnsType<UserBonusTransactionResponseDto> = [
  {
    title: 'Дата',
    dataIndex: 'createdAt',
    render: (createdAt) => {
      return (
        <DateWrapper>
          <TablePrimaryText>
            {DateTime.fromISO(createdAt).toLocaleString({ locale: 'ru' })}
          </TablePrimaryText>
          &nbsp;
          <TableSecondaryText>
            {DateTime.fromISO(createdAt).toFormat('HH:mm')}
          </TableSecondaryText>
        </DateWrapper>
      );
    },
  },
  {
    title: 'Тип операции',
    dataIndex: 'type',
    render: (type, transaction) => {
      return (
        <TablePrimaryText>
          <DisplayUserTransactionType transaction={transaction} />
        </TablePrimaryText>
      );
    },
  },
  {
    title: 'Торговая точка',
    dataIndex: 'pos',
    render: (pos) => (
      <TableSecondaryText>{pos ? pos.name : ''}</TableSecondaryText>
    ),
  },

  {
    title: 'Начислено/списано баллов',
    dataIndex: 'amount',
    align: 'right',
    render: (amount) => (
      <TablePrimaryText align="right">{amount}</TablePrimaryText>
    ),
  },
  {
    title: 'Оплачено, рубли',
    dataIndex: 'paidRub',
    align: 'right',
    render: (value) => (
      <TablePrimaryText align="right">
        {value !== undefined ? `${value} ₽` : ''}{' '}
      </TablePrimaryText>
    ),
  },
];

const StyledUserSummaryInfo = styled(UserSummaryInfo)`
  margin-bottom: 48px;
`;

interface IComponentProps {
  userData: UsersResponseDto;
}

const ClientPage: React.FC<IComponentProps> = ({ userData }) => {
  const [user, setUser] = useState(userData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    isLoading: isUserLoading,
    response: userResponse,
    apiAction: getCompanyUser,
  } = useGetCompanyUser();
  const [modalMode, setModalMode] = useState<EUserModalMode>(undefined);
  const {
    isLoading: isUserTransactionsLoading,
    response: userTransactions,
    apiAction: getUserTransactions,
  } = useGetCompanyUserTransactions();
  const {
    isLoading: isBonusesLoading,
    response: bonusesResponse,
    apiAction: postBonuses,
  } = usePostCompanyUserBonuses();
  const { company } = useContext(CurrentCompanyContext);

  const { image, lastTransactionDate } = user;

  const handleBonusesChange = (values: { amount: number }) => {
    const bonuses =
      modalMode === EUserModalMode.Add ? values.amount : values.amount * -1;

    postBonuses(company.id, user.id, { amount: bonuses });
  };

  useEffect(() => {
    getUserTransactions(company.id, user.id as string, { limit: 100 });
  }, [user.id]);

  useEffect(() => {
    if (bonusesResponse) {
      setModalVisible(false);
      getCompanyUser(company.id, user.id as string);
      getUserTransactions(company.id, user.id as string, { limit: 100 });
    }
  }, [bonusesResponse]);

  useEffect(() => {
    if (userResponse) {
      setUser(userResponse);
    }
  }, [userResponse]);

  return (
    <>
      <BasePageWrapper
        title={<TitleWithLink title="Клиенты" href={routes.clients} />}
      >
        <FlexWrapper>
          <UserInfoWrapper>
            <div>
              <UserAvatar image={image} />
            </div>
            <div>
              <UserName user={user} />
              <LastPurchase purchaseDate={lastTransactionDate} />
            </div>
            <IconWrapper onClick={() => setDrawerVisible(true)}>
              <BlpIcon iconName="chevron-right" />
            </IconWrapper>
          </UserInfoWrapper>
          <UserControlsWrapper>
            <GhostButtonSmall
              onClick={() => {
                setModalVisible(true);
                setModalMode(EUserModalMode.Remove);
              }}
            >
              Списать <BlpIcon iconName="blp-coin" fontSize="12px" />
            </GhostButtonSmall>
            <PrimaryButtonSmall
              onClick={() => {
                setModalVisible(true);
                setModalMode(EUserModalMode.Add);
              }}
            >
              Начислить <BlpIcon iconName="blp-coin" fontSize="12px" />
            </PrimaryButtonSmall>
          </UserControlsWrapper>
        </FlexWrapper>

        <StyledUserSummaryInfo user={user} />

        <StyledTable
          rowKey={(record: UserBonusTransactionResponseDto) => record.id}
          columns={columns}
          dataSource={userTransactions?.data}
          loading={isUserTransactionsLoading}
        />
      </BasePageWrapper>

      <Drawer
        title="Информация"
        placement="right"
        mask={false}
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <UserDetailsInfo user={user} />
      </Drawer>

      <StyledModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        centered={true}
        destroyOnClose={true}
        width={424}
        isAltColour={true}
      >
        <UserBonusesModalContent
          modalMode={modalMode}
          user={user}
          handleBonusesChange={handleBonusesChange}
          handleCancel={() => setModalVisible(false)}
          isLoading={isBonusesLoading}
        />
      </StyledModal>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const currentCompany = await new CompaniesApi()
    .setTokenFromResponse(context.res)
    .getCurrentCompany();

  const user = await new UsersApi()
    .setTokenFromResponse(context.res)
    .getCompanyUser(currentCompany.id, id as string);

  return {
    props: { userData: user },
  };
};

export default ClientPage;
