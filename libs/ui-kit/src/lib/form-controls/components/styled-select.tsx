import styled from 'styled-components';
import { Select } from 'antd';
import { palette } from '../../styles/theme';

export const StyledSelect = styled(Select)`
  height: 52px;

  .ant-select-selector {
    height: 52px !important;
    border: 1px solid ${palette.background} !important;
  }

  .ant-select-selection-search {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }

  &.ant-select-focused {
    .ant-select-selector {
      box-shadow: none !important;
      border-color: ${palette.elements} !important;
    }
  }
`;
