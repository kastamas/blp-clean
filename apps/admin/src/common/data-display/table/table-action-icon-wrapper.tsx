import styled from 'styled-components';
import { BlpIcon, palette } from '@business-loyalty-program/ui-kit';

export const TableActionIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;

  ${BlpIcon} {
    color: ${palette.textSecondary};
  }

  :hover {
    ${BlpIcon} {
      color: ${palette.text};
    }
  }
`;
