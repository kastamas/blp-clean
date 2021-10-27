import styled, { css } from 'styled-components';

export const buttonTextMixin = css`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
`;

export const ButtonText = styled.span`
  ${buttonTextMixin};
`;
