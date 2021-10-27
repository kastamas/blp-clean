import styled from 'styled-components';
import { palette } from '../styles/theme';
import { subtitle2Mixin } from '../typography/subtitle-2';

export const GhostButtonSmall = styled.button`
  background: transparent;
  box-sizing: border-box;
  border: 1px solid ${palette.primary};
  outline: none;
  padding: 8px 16px;
  border-radius: 4px;
  height: 32px;

  cursor: pointer;
  transition: all 300ms ease-out;

  color: ${palette.primary};

  ${subtitle2Mixin};

  &:hover {
    color: #3cabfc;
    background: rgba(60, 171, 252, 0.05);
    border-color: #3cabfc;
  }

  &:active {
    background: rgba(57, 168, 249, 0.08);
    color: #39a8f9;
    border-color: #39a8f9;
  }

  &:disabled {
    color: ${palette.elements};
    border-color: ${palette.elements};
    background: transparent;
  }
`;
