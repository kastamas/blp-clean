import styled, { css } from 'styled-components';

export const textMixin = css`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
`;

export const Text = styled.p`
  ${textMixin};
`;
