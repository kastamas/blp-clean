import styled from 'styled-components';
import { palette, textMixin } from '@business-loyalty-program/ui-kit';

export const ModalCancelButton = styled.button.attrs((props) => ({
  type: 'button',
}))`
  ${textMixin};

  color: ${palette.textSecondary};
  padding: 8px 26px;
  margin-right: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color 300ms ease;
  outline: none;

  :hover {
    color: ${palette.text};
  }
`;
