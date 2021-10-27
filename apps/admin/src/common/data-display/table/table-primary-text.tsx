import styled from 'styled-components';
import { palette, Subtitle1 } from '@business-loyalty-program/ui-kit';

interface IComponentProps {
  align?: 'left' | 'right' | 'center';
}
export const TablePrimaryText = styled(Subtitle1)<IComponentProps>`
  color: ${palette.text};
  text-align: ${(p) => (p.align ? p.align : 'left')};
`;
