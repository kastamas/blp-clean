import styled, { css } from 'styled-components';

export const menuTextMixin = css`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
`;

export const MenuText = styled.div`
  ${menuTextMixin};
`;
