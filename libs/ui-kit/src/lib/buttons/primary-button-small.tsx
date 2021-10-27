import styled from 'styled-components';
import { palette, subtitle2Mixin } from '@business-loyalty-program/ui-kit';

export const PrimaryButtonSmall = styled.button`
  background: ${palette.primary};
  color: ${palette.white};
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 8px 16px;
  transition: background-color 300ms ease-out;

  ${subtitle2Mixin};

  &:hover {
    background: #3cabfc;
  }

  &:active {
    background: #39a8f9;
  }

  &:disabled {
    background: ${palette.elements};
    cursor: not-allowed;
  }
`;
