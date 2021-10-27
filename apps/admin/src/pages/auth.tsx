import { LoginForm } from '../modules/auth/components/login-form';
import React from 'react';
import styled from 'styled-components';
import { palette } from '@business-loyalty-program/ui-kit';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${palette.text};
`;

function AuthPage() {
  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
}

export default AuthPage;
