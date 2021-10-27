import styled from 'styled-components';
import { palette } from '../styles/theme';

interface IComponentProps {
  block?: boolean;
}

export const PrimaryButtonBig = styled.button<IComponentProps>`
  background: ${palette.primary};
  color: ${palette.white};
  border-radius: 4px;
  border: none;
  outline: none;
  padding: ${(p) => (p.block ? '12px 16px' : '8px 16px')};
  cursor: pointer;
  transition: background-color 300ms ease-out;

  width: ${(p) => (p.block ? '100%' : 'auto')};

  font-size: ${(p) => (p.block ? '16px' : '14px')};
  font-style: normal;
  font-weight: 500;
  line-height: ${(p) => (p.block ? '24px' : '20px')};
  letter-spacing: 0px;
  text-align: center;

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
