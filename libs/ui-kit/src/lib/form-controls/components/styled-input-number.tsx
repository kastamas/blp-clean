import { InputNumber } from 'antd';
import styled from 'styled-components';
import { palette } from '../../styles/theme';

export const StyledInputNumber = styled(InputNumber)`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  border-color: ${palette.backgroundPrimary};
  width: 100%;
  padding-top: 7px;
  padding-bottom: 7px;

  &:focus {
    border-color: ${palette.textSecondary};
    box-shadow: none !important;
  }
`;
