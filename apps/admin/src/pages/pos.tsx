import React, { useContext, useEffect, useState } from 'react';
import { BasePageWrapper } from '../common/wrappers/base-page-wrapper';
import {
  BlpIcon,
  PrimaryButtonBig,
  StyledModal,
  StyledTable,
} from '@business-loyalty-program/ui-kit';
import styled from 'styled-components';
import { useGetCompanyPOS } from '../modules/pos/pos.api';
import { PosModalContent } from '../modules/pos/components/pos-modal-content';
import { CurrentCompanyContext } from '../modules/companies/current-company.context';
import { ColumnsType } from 'antd/es/table';
import { TableSecondaryText } from '../common/data-display/table/table-secondary-text';
import { TablePrimaryText } from '../common/data-display/table/table-primary-text';
import { parsePhoneNumber } from 'libphonenumber-js';
import { PosResponseDto } from '@business-loyalty-program/types';
import { Tooltip } from 'antd';
import { DisplayPhoneNumber } from '../common/data-display/display/display-phone-number';

const ButtonsWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
`;

const TableWrapper = styled.div`
  margin-top: 20px;
`;

const StyledIcon = styled(BlpIcon)`
  margin-left: 4px;
`;

const columns: ColumnsType<PosResponseDto> = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (id) => {
      return <TableSecondaryText>{id}</TableSecondaryText>;
    },
  },
  {
    title: (
      <>
        Внешний ID{' '}
        <Tooltip title="ID торговой точки во внешней системе учета, например «1С». Может использоваться для интеграции с системой вместо програмного ID торговой точки ">
          <StyledIcon iconName={'help'} fontSize="16px" />
        </Tooltip>
      </>
    ),
    dataIndex: 'externalId',
    render: (externalId) => {
      return <TableSecondaryText>{externalId}</TableSecondaryText>;
    },
  },
  {
    title: 'Название',
    dataIndex: 'name',
    render: (name) => {
      return <TableSecondaryText>{name}</TableSecondaryText>;
    },
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    render: (address) => {
      return <TablePrimaryText>{address}</TablePrimaryText>;
    },
  },
  {
    title: 'Примечание',
    dataIndex: 'note',
    render: (note) => {
      return <TableSecondaryText>{note ? note : '-'}</TableSecondaryText>;
    },
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    render: (phone) => {
      return (
        <TablePrimaryText>
          <DisplayPhoneNumber phone={phone} />
        </TablePrimaryText>
      );
    },
  },
];

const POSPage: React.FC = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { company } = useContext(CurrentCompanyContext);
  const { isLoading, response, apiAction } = useGetCompanyPOS();
  const [posModalData, setPosModalData] = useState<PosResponseDto | undefined>(
    undefined
  );

  const showModal = (pos?: PosResponseDto) => {
    if (pos) {
      setPosModalData(pos);
    }

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPosModalData(undefined);
  };

  const handleSuccess = () => {
    apiAction(company.id, { limit: 100 });
    handleCancel();
  };

  useEffect(() => {
    apiAction(company.id, { limit: 100 });
  }, []);

  return (
    <>
      <BasePageWrapper title="Торговые точки">
        <ButtonsWrapper>
          <PrimaryButtonBig onClick={() => showModal()}>
            Добавить точку
          </PrimaryButtonBig>
        </ButtonsWrapper>

        <TableWrapper>
          <StyledTable
            rowKey={(record: PosResponseDto) => record.id}
            columns={columns}
            dataSource={response?.data}
            loading={isLoading}
            rowClassName="row-clickable"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  showModal(record as PosResponseDto);
                },
              };
            }}
          />
        </TableWrapper>
      </BasePageWrapper>

      <StyledModal
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={600}
        isAltColour
      >
        <PosModalContent
          onCancel={handleCancel}
          onSuccess={handleSuccess}
          pos={posModalData}
        />
      </StyledModal>
    </>
  );
};

export default POSPage;
