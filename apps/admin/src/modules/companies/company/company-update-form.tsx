import {
  PrimaryButtonBig,
  StyledForm,
  StyledInput,
  StyledTextArea,
  useDisableForm,
} from '@business-loyalty-program/ui-kit';
import { Form } from 'antd';
import React, { useContext, useEffect } from 'react';
import { CurrentCompanyContext } from '../current-company.context';
import { useUpdateCompany } from '../companies.api';

export const CompanyUpdateForm: React.FC = (props) => {
  const { company, setCompany } = useContext(CurrentCompanyContext);
  const { isLoading, apiAction, response } = useUpdateCompany();
  const { form, checkIsDisabled } = useDisableForm(['name'], true);

  useEffect(() => {
    if (response) {
      setCompany(response);
    }
  }, [response]);

  return (
    <StyledForm
      form={form}
      layout="vertical"
      initialValues={company}
      onFinish={(values: any) => {
        apiAction(company.id, values);
      }}
    >
      <Form.Item label="Название" name="name" rules={[{ required: true }]}>
        <StyledInput />
      </Form.Item>
      <Form.Item label="Телефон" name="phone">
        <StyledInput />
      </Form.Item>
      <Form.Item label="Описание" name="description">
        <StyledTextArea rows={4} />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <PrimaryButtonBig disabled={checkIsDisabled() || isLoading}>
            Сохранить
          </PrimaryButtonBig>
        )}
      </Form.Item>
    </StyledForm>
  );
};
