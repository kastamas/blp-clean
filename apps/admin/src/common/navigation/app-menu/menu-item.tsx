import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { BlpIcon, Subtitle1 } from '@business-loyalty-program/ui-kit';
import { useRouter } from 'next/router';

interface IComponentProps {
  href: string;
  iconName: string;
}

const Wrapper = styled.a<{ active: boolean }>`
  display: flex;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 8px;
  border-radius: 8px;

  ${BlpIcon} {
    margin-right: 8px;
  }

  ${BlpIcon}, ${Subtitle1} {
    transition: color 300ms ease;
    color: ${({ active, theme }) =>
      active ? theme.palette.white : theme.palette.textSecondary};
  }

  :hover {
    background: #192e4e;
  }
`;

export const MenuItem: React.FC<IComponentProps> = ({
  children,
  iconName,
  href,
}) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <Wrapper active={router.pathname === href}>
        <BlpIcon iconName={iconName} />
        <Subtitle1>{children}</Subtitle1>
      </Wrapper>
    </Link>
  );
};
