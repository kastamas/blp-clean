import React, { useContext, useEffect, useState } from 'react';
import { BasePageWrapper } from '../../common/wrappers/base-page-wrapper';
import styled from 'styled-components';
import {
  StyledModal,
  StyledTable,
  DefaultButton,
  BlpIcon,
  PrimaryButtonSmall,
} from '@business-loyalty-program/ui-kit';
import {
  useGetCompanyUsers,
  useGetUsersReport,
} from '../../modules/users/users.api';
import { CurrentCompanyContext } from '../../modules/companies/current-company.context';
import { UserAvatar } from '../../modules/users/components/user-avatar';
import { UsersResponseDto } from '@business-loyalty-program/types';
import { TableSecondaryText } from '../../common/data-display/table/table-secondary-text';
import { TablePrimaryText } from '../../common/data-display/table/table-primary-text';
import { UserModalContent } from '../../modules/users/components/user-modal-content/user-modal-content';
import { AddUserModalContent } from '../../modules/users/components/add-user-modal-content';
import { DateTime } from 'luxon';
import { DisplayUserName } from '../../modules/users/components/display-user-name';
import { ColumnsType } from 'antd/es/table';

const TableWrapper = styled.div`
  margin-top: 20px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledUserAvatar = styled(UserAvatar)`
  width: 36px;
  height: 36px;
  margin-right: 12px;
`;

const columns: ColumnsType<UsersResponseDto> = [
  {
    title: 'Клиент',
    dataIndex: 'name',
    render: (name: string, record) => {
      return (
        <UserItem>
          <StyledUserAvatar image={record.image} />
          <TablePrimaryText>
            <DisplayUserName user={record} />
          </TablePrimaryText>
        </UserItem>
      );
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
    render: (id) => {
      return <TableSecondaryText>{id}</TableSecondaryText>;
    },
  },
  {
    title: 'Регистрация',
    dataIndex: 'createdAt',
    render: (createdAt) => {
      return (
        <TableSecondaryText>
          {DateTime.fromISO(createdAt).toLocaleString({ locale: 'ru' })}
        </TableSecondaryText>
      );
    },
  },
  {
    title: 'Остаток баллов',
    dataIndex: 'bonusAmount',
    align: 'right',
    render: (bonusAmount) => (
      <TablePrimaryText align="right">{bonusAmount}</TablePrimaryText>
    ),
  },
  {
    title: 'Оплачено, баллы',
    dataIndex: 'paidBonuses',
    align: 'right',
    render: (paidBonuses) => (
      <TablePrimaryText align="right">{paidBonuses}</TablePrimaryText>
    ),
  },
  {
    title: 'Оплачено, рубли',
    dataIndex: 'paidRub',
    align: 'right',
    render: (paidRub) => {
      return <TablePrimaryText align="right">{paidRub} ₽</TablePrimaryText>;
    },
  },
];
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 32px;
`;

const ClientsPage: React.FC = (props) => {
  const { company } = useContext(CurrentCompanyContext);

  const [userModalData, setUserModalData] = useState(undefined);

  const { isLoading, response, apiAction } = useGetCompanyUsers();

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const { apiAction: downloadReport } = useGetUsersReport();

  const showModal = (user) => {
    setUserModalData(user);
    setIsUserModalVisible(true);
  };

  const handleCancel = () => {
    setUserModalData(undefined);
    setIsUserModalVisible(false);
  };

  useEffect(() => {
    apiAction(company.id, { limit: 100 });
  }, []);

  const refreshData = () => {
    apiAction(company.id, { limit: 100 });
    handleCancel();
  };

  return (
    <>
      <BasePageWrapper title="Клиенты">
        <ButtonsWrapper>
          <div>
            <DefaultButton onClick={() => downloadReport(company.id)}>
              <BlpIcon
                iconName="horizontal-align-right"
                style={{ fontSize: '16px' }}
              />
              &nbsp; Экспорт в Excel
            </DefaultButton>
          </div>

          <div>
            <PrimaryButtonSmall onClick={() => setAddUserModalVisible(true)}>
              Добавить клиента
            </PrimaryButtonSmall>
          </div>
        </ButtonsWrapper>

        <TableWrapper>
          {response && (
            <StyledTable
              rowKey={(record: UsersResponseDto) => record.id}
              columns={columns}
              dataSource={response.data}
              loading={isLoading}
              rowClassName="row-clickable"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    showModal(record);
                  },
                };
              }}
            />
          )}
        </TableWrapper>
      </BasePageWrapper>

      <StyledModal
        visible={isUserModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={320}
      >
        {userModalData && (
          <UserModalContent user={userModalData} refreshData={refreshData} />
        )}
      </StyledModal>

      <StyledModal
        visible={isAddUserModalVisible}
        onCancel={() => setAddUserModalVisible(false)}
        destroyOnClose
        width={424}
        isAltColour
      >
        <AddUserModalContent
          onCancel={() => setAddUserModalVisible(false)}
          onSuccess={() => {
            apiAction(company.id, { limit: 100 });
            setAddUserModalVisible(false);
          }}
        />
      </StyledModal>
    </>
  );
};

export default ClientsPage;
