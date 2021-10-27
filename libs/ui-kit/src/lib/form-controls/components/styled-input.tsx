import styled from 'styled-components';
import { Input } from 'antd';
import { palette } from '../../styles/theme';

export const StyledInput = styled(Input)`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  border-color: ${palette.backgroundPrimary};

  &:focus {
    border-color: ${palette.textSecondary};
    box-shadow: none !important;
  }
`;
