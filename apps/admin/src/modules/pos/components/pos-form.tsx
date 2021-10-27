import * as React from 'react';
import { Form, Tooltip } from 'antd';
import {
  BlpIcon,
  ModalForm,
  StyledInput,
  validatePhoneNumber,
} from '@business-loyalty-program/ui-kit';
import { AddressSelector } from '../../address/components/address-selector';
import {
  NewPosDto,
  PosResponseDto,
  PosUpdateDto,
} from '@business-loyalty-program/types';
import styled from 'styled-components';

interface IComponentProps {
  isLoading: boolean;
  initialValues?: PosResponseDto;
  onSubmit(values: NewPosDto | PosUpdateDto): void;
  onCancel(): void;
}

const StyledIcon = styled(BlpIcon)`
  margin-left: 4px;
`;

export const PosForm: React.FC<IComponentProps> = (props) => {
  const { initialValues, onCancel, onSubmit, isLoading } = props;
  const editMode = !!initialValues;

  return (
    <ModalForm
      onCancel={onCancel}
      onFinish={(values) => onSubmit(values)}
      initialValues={
        initialValues
          ? {
              ...initialValues,
              address: {
                address: initialValues.address,
                coords: initialValues.coords,
              },
            }
          : undefined
      }
      editMode={editMode}
      actionButton={{ title: editMode ? 'Сохранить' : 'Добавить точку' }}
      requiredFields={['name', 'address']}
      isLoading={isLoading}
    >
      <Form.Item label="Название" name="name" rules={[{ required: true }]}>
        <StyledInput />
      </Form.Item>

      <Form.Item label="Адрес" name="address" rules={[{ required: true }]}>
        <AddressSelector />
      </Form.Item>

      <Form.Item
        label={
          <>
            Внешний ID{' '}
            <Tooltip title="ID торговой точки во внешней системе учета, например «1С». Может использоваться для интеграции с системой вместо програмного ID торговой точки ">
              <StyledIcon iconName={'help'} fontSize="16px" />
            </Tooltip>
          </>
        }
        name="externalId"
      >
        <StyledInput />
      </Form.Item>

      <Form.Item label="Примечание" name="note">
        <StyledInput />
      </Form.Item>

      <Form.Item label="Телефон" name="phone" rules={[validatePhoneNumber]}>
        <StyledInput />
      </Form.Item>
    </ModalForm>
  );
};
