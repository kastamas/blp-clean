import styled from 'styled-components';
import { palette } from '../styles/theme';

export const GhostButtonBig = styled.button`
  background: transparent;
  border: 1px solid ${palette.primary};
  outline: none;
  padding: 8px 16px;
  border-radius: 4px;

  cursor: pointer;
  transition: all 300ms ease-out;

  color: ${palette.primary};

  font-weight: 500;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;

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
