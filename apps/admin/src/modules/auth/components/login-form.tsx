import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  FloatFormItem,
  Headline1,
  palette,
  PrimaryButtonBig,
  PrimaryForm,
  StyledForm,
  StyledInput,
  StyledInputPassword,
} from '@business-loyalty-program/ui-kit';
import { Form } from 'antd';
import { routes } from '../../../routes';
import { useAuth } from '../auth.api';

const Wrapper = styled.div`
  width: 456px;
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${palette.backgroundPrimary};

  ${Headline1} {
    margin-bottom: 28px;
  }

  ${StyledForm} {
    width: 100%;
  }
`;

const LogoIcon = styled.img.attrs((props) => ({
  src: '/images/logo-icon.svg',
}))`
  width: 74px;
  height: 74px;

  margin-bottom: 20px;
`;

export const LoginForm: React.FC = () => {
  const { apiAction, response, isLoading } = useAuth();

  useEffect(() => {
    if (response) {
      window.location.href = routes.home;
    }
  }, [response]);

  return (
    <Wrapper>
      <LogoIcon />
      <Headline1>Войдите в систему</Headline1>
      <StyledForm onFinish={(values) => apiAction(values)}>
        <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
          <StyledInput placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <StyledInputPassword type="password" placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <PrimaryButtonBig block disabled={isLoading}>
            Войти
          </PrimaryButtonBig>
        </Form.Item>
      </StyledForm>
    </Wrapper>
  );
};
