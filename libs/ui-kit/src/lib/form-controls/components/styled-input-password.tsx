import styled from 'styled-components';
import { Input } from 'antd';
import { palette } from '../../styles/theme';

export const StyledInputPassword = styled(Input.Password)`
  input {
    font-weight: 500;
    font-feature-settings: 'pnum' on, 'lnum' on;
  }
`;
