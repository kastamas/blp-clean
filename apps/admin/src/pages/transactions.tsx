import React, { useContext, useEffect, useState } from 'react';
import { BasePageWrapper } from '../common/wrappers/base-page-wrapper';
import styled from 'styled-components';
import {
  BlpIcon,
  DefaultButton,
  ModalTitle,
  StyledModal,
  StyledTable,
} from '@business-loyalty-program/ui-kit';
import { CurrentCompanyContext } from '../modules/companies/current-company.context';
import {
  useGetCompanyTransactions,
  useGetCompanyTransactionsReport,
} from '../modules/transactions/transactions.api';
import { TableSecondaryText } from '../common/data-display/table/table-secondary-text';
import { TablePrimaryText } from '../common/data-display/table/table-primary-text';
import { DisplayUserName } from '../modules/users/components/display-user-name';
import { DateTime } from 'luxon';
import { TransactionResponseDto } from '@business-loyalty-program/types';
import { ColumnsType } from 'antd/es/table';
import { TransactionDetailsModalContent } from '../modules/transactions/components/transaction-details-modal-content';

const DateWrapper = styled.div`
  display: flex;
`;

const columns: ColumnsType<TransactionResponseDto> = [
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
    title: 'Клиент',
    dataIndex: 'user',
    render: (user) => (
      <TablePrimaryText>
        <DisplayUserName user={user} />
      </TablePrimaryText>
    ),
  },
  {
    title: 'Торговая точка',
    dataIndex: 'pos',
    render: (pos) => <TableSecondaryText>{pos.name}</TableSecondaryText>,
  },
  {
    title: 'Начислено/списано баллов',
    dataIndex: 'bonusTransaction',
    align: 'right',
    render: (bonusTransaction) => (
      <TablePrimaryText align="right">
        {bonusTransaction?.amount || 0}
      </TablePrimaryText>
    ),
  },
  {
    title: 'Оплачено, рубли',
    dataIndex: 'amount',
    align: 'right',
    render: (amount) => (
      <TablePrimaryText align="right">{amount} ₽</TablePrimaryText>
    ),
  },
];

const TableWrapper = styled.div`
  margin-top: 32px;
`;

const StyledDefaultButton = styled(DefaultButton)`
  margin-top: 32px;
`;

const TransactionsPage: React.FC = () => {
  const { company } = useContext(CurrentCompanyContext);

  const { apiAction: downloadReport } = useGetCompanyTransactionsReport();
  const { isLoading, response, apiAction } = useGetCompanyTransactions();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  const showModal = (record) => {
    setModalData(record);
    setModalVisible(true);
  };

  useEffect(() => {
    apiAction(company.id, { limit: 100 });
  }, []);

  return (
    <>
      <BasePageWrapper title="Операции">
        <StyledDefaultButton onClick={() => downloadReport(company.id)}>
          <BlpIcon
            iconName="horizontal-align-right"
            style={{ fontSize: '16px' }}
          />
          &nbsp; Экспорт в Excel
        </StyledDefaultButton>

        <TableWrapper>
          <StyledTable
            rowKey={(record: TransactionResponseDto) => record.id}
            columns={columns}
            dataSource={response?.data}
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
        </TableWrapper>
      </BasePageWrapper>

      <StyledModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={960}
        destroyOnClose={true}
      >
        {modalData ? (
          <TransactionDetailsModalContent transaction={modalData} />
        ) : null}
      </StyledModal>
    </>
  );
};

export default TransactionsPage;
