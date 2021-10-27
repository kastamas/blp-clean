import React from 'react';
import { BasePageWrapper } from '../../common/wrappers/base-page-wrapper';
import { StyledTabs } from '@business-loyalty-program/ui-kit';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { CompanyAvatarUpdate } from '../../modules/companies/company/company-avatar-update';
import { CompanyUpdateForm } from '../../modules/companies/company/company-update-form';

const Wrapper = styled.div`
  margin-top: 32px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  gap: 40px;
  margin-top: 48px;
`;

const CurrentCompanyPage: React.FC = (props) => {
  return (
    <BasePageWrapper title="Профиль">
      <Wrapper>
        <StyledTabs destroyInactiveTabPane defaultActiveKey="1">
          <Tabs.TabPane tab="О компании" key="1">
            <ContentWrapper>
              <CompanyAvatarUpdate />
              <CompanyUpdateForm />
            </ContentWrapper>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Адреса" disabled key="2" />
          <Tabs.TabPane tab="Фотографии" disabled key="3" />
        </StyledTabs>
      </Wrapper>
    </BasePageWrapper>
  );
};

export default CurrentCompanyPage;
