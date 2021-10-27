import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { BlpIcon, MenuText, palette } from '@business-loyalty-program/ui-kit';

const Wrapper = styled.div`
  display: flex;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  color: ${palette.textSecondary};

  ${BlpIcon} {
    color: ${palette.textSecondary};
    margin-right: 10px;
  }

  :hover {
    color: ${palette.text};

    ${BlpIcon} {
      color: ${palette.text};
    }
  }
`;

const ActionTitle = styled(MenuText)`
  color: ${palette.text};
`;

interface IComponentProps {
  href: string;
  title: string;
  actionTitle?: string;
}

export const TitleWithLink: React.FC<IComponentProps> = (props) => {
  const { href, title, actionTitle } = props;

  return (
    <Wrapper>
      <Link href={href}>
        <a>
          <Title>
            <BlpIcon iconName="arrow-left" />
            <MenuText>{title}</MenuText>
          </Title>
        </a>
      </Link>

      {actionTitle ? (
        <>
          &nbsp;
          <ActionTitle>/ {actionTitle}</ActionTitle>
        </>
      ) : null}
    </Wrapper>
  );
};
