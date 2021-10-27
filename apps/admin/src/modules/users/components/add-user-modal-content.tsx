import * as React from 'react';
import styled from 'styled-components';
import {
  ModalForm,
  ModalTitle,
  StyledInput,
  validatePhoneNumber,
} from '@business-loyalty-program/ui-kit';
import { Form, Radio } from 'antd';
import { EUserSex } from '@business-loyalty-program/enums';
import { BirthDateSelector } from './birth-date-selector';
import { useAddCompanyUser } from '../users.api';
import { useContext, useEffect } from 'react';
import { CurrentCompanyContext } from '../../companies/current-company.context';

const Wrapper = styled.div``;

interface IComponentProps {
  onCancel(): void;
  onSuccess(): void;
}

export const AddUserModalContent: React.FC<IComponentProps> = (props) => {
  const { company } = useContext(CurrentCompanyContext);

  const { onCancel, onSuccess } = props;
  const { isLoading, response, apiAction } = useAddCompanyUser();

  useEffect(() => {
    if (response) {
      onSuccess();
    }
  }, [response]);

  return (
    <Wrapper>
      <ModalTitle>Добавление клиента</ModalTitle>

      <ModalForm
        onCancel={onCancel}
        onFinish={(values) => apiAction(company.id, values)}
        actionButton={{ title: 'Добавить клиента' }}
        requiredFields={['name']}
        isLoading={isLoading}
      >
        <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
          <StyledInput />
        </Form.Item>

        <Form.Item label="Фамилия" name="surname">
          <StyledInput />
        </Form.Item>

        <Form.Item label="Телефон" name="phone" rules={[validatePhoneNumber]}>
          <StyledInput />
        </Form.Item>

        <Form.Item label="Дата рождения" name="dateOfBirth">
          <BirthDateSelector />
        </Form.Item>

        <Form.Item label="Пол" name="sex">
          <Radio.Group>
            <Radio value={EUserSex.Male}>Мужской</Radio>
            <Radio value={EUserSex.Female}>Женский</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Номер клубной карты" name="cardNumber">
          <StyledInput />
        </Form.Item>
      </ModalForm>
    </Wrapper>
  );
};
