import styled, { css } from 'styled-components';

export const subtitle2Mixin = css`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
`;

export const Subtitle2 = styled.p`
  ${subtitle2Mixin};
`;
