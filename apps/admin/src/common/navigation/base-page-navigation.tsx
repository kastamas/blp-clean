import * as React from 'react';
import styled from 'styled-components';
import { MenuText, palette } from '@business-loyalty-program/ui-kit';
import { AppMenuCompany } from './app-menu/app-menu-company';

const Wrapper = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${palette.white};
`;

const TitleWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;

interface IComponentProps {
  title: string | React.ReactNode;
}

export const BasePageNavigation: React.FC<IComponentProps> = ({ title }) => {
  return (
    <Wrapper>
      <TitleWrapper>
        {typeof title === 'string' ? (
          <MenuText>{title}</MenuText>
        ) : (
          <>{title}</>
        )}
      </TitleWrapper>

      <AppMenuCompany />
    </Wrapper>
  );
};
