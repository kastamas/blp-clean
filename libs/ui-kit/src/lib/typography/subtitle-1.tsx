import styled, { css } from 'styled-components';

export const subtitle1Mixin = css`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
`;

export const Subtitle1 = styled.p`
  ${subtitle1Mixin};
`;
