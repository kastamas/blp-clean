import { Tabs } from 'antd';
import styled from 'styled-components';
import { palette } from '../styles/theme';

export const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    padding: 8px 28px;
    color: ${palette.textSecondary};
  }

  .ant-tabs-nav::before {
    border-color: ${palette.elements};
  }
`;
