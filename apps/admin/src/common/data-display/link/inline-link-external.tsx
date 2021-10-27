import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { palette } from '@business-loyalty-program/ui-kit';

const Wrapper = styled.span`
  a {
    color: ${palette.primary};
  }
`;

interface IComponentProps {
  href?: string | undefined;
}

export const InlineLinkExternal: React.FC<IComponentProps> = ({
  href,
  children,
}) => {
  return (
    <Wrapper>
      <a href={href}>{children}</a>
    </Wrapper>
  );
};
