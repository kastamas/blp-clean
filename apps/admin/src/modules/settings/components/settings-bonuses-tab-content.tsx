import * as React from 'react';
import styled from 'styled-components';
import {
  PrimaryButtonSmall,
  StyledModal,
  StyledTable,
} from '@business-loyalty-program/ui-kit';
import { useGetCompanySettings, usePutCompanySettings } from '../settings.api';
import { useContext, useEffect, useState } from 'react';
import { CurrentCompanyContext } from '../../companies/current-company.context';
import { ColumnsType } from 'antd/es/table';
import { TablePrimaryText } from '../../../common/data-display/table/table-primary-text';
import { v4 } from 'uuid';
import { BonusesModalContent } from './bonuses-modal-content';
import { TableActionDelete } from '../../../common/data-display/table/table-action-delete';

const Wrapper = styled.div``;

const ButtonsWrapper = styled.div`
  margin-top: 0px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

const buildColumns = (onDelete: (id: string) => void) => {
  const columns: ColumnsType = [
    {
      title: 'Если сумма покупки от (руб.)',
      dataIndex: 'from',
      render: (value) => {
        return <TablePrimaryText>{value}</TablePrimaryText>;
      },
    },
    {
      title: 'То начислить % бонусов от покупки',
      dataIndex: 'percent',
      render: (value) => {
        return <TablePrimaryText>{(value * 100).toFixed(1)}%</TablePrimaryText>;
      },
    },
    {
      title: 'Действия',
      key: 'action',
      render: (value, record) => {
        return (
          <TableActionDelete
            title={<>Вы хотите удалить этот статус?</>}
            onConfirm={() => {
              onDelete(record.uid);
            }}
          />
        );
      },
    },
  ];

  return columns;
};

export interface IExtendedBonusPolicyDto {
  from: number;
  percent: number;
  uid: string;
}

interface IComponentProps {}

export const SettingsBonusesTabContent: React.FC<IComponentProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bonusPolicyData, setBonusPolicyData] = useState(undefined);
  const [dataSource, setDataSource] = useState([]);
  const { company } = useContext(CurrentCompanyContext);

  const { isLoading, response, apiAction } = useGetCompanySettings();

  const {
    isLoading: isSettingsUpdateLoading,
    response: updatedSettingsResponse,
    apiAction: putSettings,
  } = usePutCompanySettings();

  const showModal = (bonusPolicy?) => {
    setBonusPolicyData(bonusPolicy);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setBonusPolicyData(undefined);
    setIsModalVisible(false);
  };

  const onSubmit = (values) => {
    const mapBonusPolicy = () => {
      return [
        ...(bonusPolicyData
          ? dataSource.filter((item) => item.uid !== bonusPolicyData.uid)
          : dataSource),
        {
          ...values,
          percent: values.percent / 100,
        },
      ];
    };

    putSettings(company.id, {
      bonusPolicy: mapBonusPolicy(),
    });

    handleCancel();
  };

  const onDelete = (id) => {
    const bonusPolicy = dataSource.filter((item) => item.uid !== id);

    putSettings(company.id, {
      bonusPolicy,
    });
  };

  const columns = buildColumns(onDelete);

  useEffect(() => {
    apiAction(company.id);
  }, []);

  useEffect(() => {
    if (updatedSettingsResponse) {
      apiAction(company.id);
    }
  }, [updatedSettingsResponse]);

  useEffect(() => {
    if (response) {
      const newDataSource = response.bonusPolicy
        ? response.bonusPolicy
            .sort((a, b) => a.from - b.from)
            .map((item) => ({
              uid: v4(),
              ...item,
            }))
        : [];

      setDataSource(newDataSource);
    }
  }, [response]);

  return (
    <>
      <Wrapper>
        <ButtonsWrapper>
          <PrimaryButtonSmall onClick={() => showModal()}>
            Добавить статус
          </PrimaryButtonSmall>
        </ButtonsWrapper>

        <StyledTable
          dataSource={dataSource}
          rowKey={(record) => record.uid as string}
          columns={columns}
          rowClassName="row-clickable"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                showModal(record);
              },
            };
          }}
          loading={isLoading || isSettingsUpdateLoading}
        />
      </Wrapper>

      <StyledModal
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={320}
        isAltColour
      >
        <BonusesModalContent
          bonusPolicy={bonusPolicyData}
          bonusPolicies={dataSource}
          isLoading={isSettingsUpdateLoading}
          onCancel={handleCancel}
          onSuccess={onSubmit}
        />
      </StyledModal>
    </>
  );
};
