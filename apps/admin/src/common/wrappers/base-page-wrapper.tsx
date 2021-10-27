import styled from 'styled-components';
import React from 'react';
import { AppMenu } from '../navigation/app-menu/app-menu';
import { BasePageNavigation } from '../navigation/base-page-navigation';

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const PageWrapper = styled.div`
  height: 100vh;
  overflow: scroll;
`;

const ContentWrapper = styled.div`
  padding: 0 32px;
`;

interface IComponentProps {
  title: string | React.ReactNode;
}

export const BasePageWrapper: React.FC<IComponentProps> = ({
  title,
  children,
}) => {
  return (
    <Wrapper>
      <AppMenu />

      <PageWrapper>
        <BasePageNavigation title={title} />
        <ContentWrapper>{children}</ContentWrapper>
      </PageWrapper>
    </Wrapper>
  );
};
