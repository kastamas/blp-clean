import styled from 'styled-components';
import { palette, subtitle2Mixin } from '@business-loyalty-program/ui-kit';
import { rgba } from 'polished';

export const DefaultButton = styled.button`
  display: flex;
  background: ${palette.background};
  padding: 8px 12px;
  border-radius: 8px;
  outline: none;
  border: none;

  cursor: pointer;
  transition: all 300ms ease-out;

  color: ${palette.textSecondary};

  ${subtitle2Mixin};

  &:hover {
    color: ${(p) => rgba(palette.text(p), 0.8)};
  }

  &:active {
    color: ${palette.text};
  }

  &:disabled {
    color: ${palette.elements};
  }
`;
