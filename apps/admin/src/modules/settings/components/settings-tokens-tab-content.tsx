import * as React from 'react';
import styled from 'styled-components';
import {
  ModalForm,
  ModalTitle,
  PrimaryButtonSmall,
  StyledInput,
  StyledModal,
  StyledTable,
} from '@business-loyalty-program/ui-kit';
import {
  useAddIntegration,
  useDeleteIntegration,
  useGetIntegrations,
} from '../../integrations/integrations.api';
import { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { TableSecondaryText } from '../../../common/data-display/table/table-secondary-text';
import { TablePrimaryText } from '../../../common/data-display/table/table-primary-text';
import { Form } from 'antd';
import moment from 'moment';
import { TableActionDelete } from '../../../common/data-display/table/table-action-delete';
import { DateTime } from 'luxon';

const Wrapper = styled.div``;

const buildColumns = (onDelete: (id: string) => void) => {
  const columns: ColumnsType = [
    {
      title: 'Название',
      dataIndex: 'name',
      render: (value) => {
        return <TableSecondaryText>{value}</TableSecondaryText>;
      },
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      render: (value) => {
        return (
          <TableSecondaryText>
            {DateTime.fromISO(value).toLocaleString({ locale: 'ru' })}
          </TableSecondaryText>
        );
      },
    },
    {
      title: 'Значение',
      dataIndex: 'token',
      render: (value) => {
        return <TablePrimaryText>{value}</TablePrimaryText>;
      },
    },
    {
      title: 'Действия',
      key: 'action',
      render: (value, record) => {
        return (
          <TableActionDelete
            title={
              <>
                Вы хотите удалить токен <br />«{record.name}»<br />
                от{' '}
                {DateTime.fromISO(record.createdAt).toLocaleString({
                  locale: 'ru',
                })}
              </>
            }
            onConfirm={() => onDelete(record.id)}
          />
        );
      },
    },
  ];

  return columns;
};

const ButtonsWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

interface IComponentProps {}

export const SettingsTokensTabContent: React.FC<IComponentProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoading, response, apiAction } = useGetIntegrations();

  const {
    response: addIntegrationResponse,
    isLoading: isAddIntegrationLoading,
    apiAction: addIntegrationApiAction,
  } = useAddIntegration();

  const {
    response: deleteIntegrationResponse,
    isLoading: isDeleteIntegrationLoading,
    apiAction: deleteIntegrationApiAction,
  } = useDeleteIntegration();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (values) => {
    addIntegrationApiAction(values);
    handleCancel();
  };

  const columns = useMemo(() => buildColumns(deleteIntegrationApiAction), [
    deleteIntegrationApiAction,
  ]);

  useEffect(() => {
    apiAction({ limit: 100 });
  }, []);

  useEffect(() => {
    if (addIntegrationResponse || deleteIntegrationResponse) {
      apiAction({ limit: 100 });
    }
  }, [addIntegrationResponse, deleteIntegrationResponse]);

  return (
    <>
      <Wrapper>
        <ButtonsWrapper>
          <PrimaryButtonSmall onClick={() => showModal()}>
            Добавить токен
          </PrimaryButtonSmall>
        </ButtonsWrapper>

        <StyledTable
          rowKey={(record) => record.id as string}
          columns={columns}
          dataSource={response?.data}
          loading={
            isLoading || isAddIntegrationLoading || isDeleteIntegrationLoading
          }
        />
      </Wrapper>

      <StyledModal
        visible={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={400}
        isAltColour
      >
        <ModalTitle>Добавление токена</ModalTitle>

        <ModalForm
          onCancel={handleCancel}
          actionButton={{ title: 'Добавить' }}
          onFinish={(values) => onSubmit(values)}
          isLoading={isAddIntegrationLoading}
        >
          <Form.Item label="Название" name="name" rules={[{ required: true }]}>
            <StyledInput />
          </Form.Item>
        </ModalForm>
      </StyledModal>
    </>
  );
};
