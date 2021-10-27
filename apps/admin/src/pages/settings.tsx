import React from 'react';
import { BasePageWrapper } from '../common/wrappers/base-page-wrapper';
import styled from 'styled-components';
import { StyledTabs } from '@business-loyalty-program/ui-kit';
import { Tabs } from 'antd';
import { SettingsRewardsForm } from '../modules/settings/components/settings-rewards-form';
import { SettingsTokensTabContent } from '../modules/settings/components/settings-tokens-tab-content';
import { SettingsBonusesTabContent } from '../modules/settings/components/settings-bonuses-tab-content';

const Wrapper = styled.div`
  margin-top: 32px;
`;

const TabContentWrapper = styled.div`
  margin-top: 24px;
`;

const SettingsPage: React.FC = (props) => {
  return (
    <BasePageWrapper title="Настройки">
      <Wrapper>
        <StyledTabs destroyInactiveTabPane defaultActiveKey="2">
          <Tabs.TabPane tab="Бонусная программа" key="1">
            <TabContentWrapper>
              <SettingsBonusesTabContent />
            </TabContentWrapper>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Вознаграждения" key="2">
            <TabContentWrapper>
              <SettingsRewardsForm />
            </TabContentWrapper>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Безопасность" key="3">
            <TabContentWrapper>В разработке</TabContentWrapper>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Интеграции" key="4">
            <TabContentWrapper>
              <SettingsTokensTabContent />
            </TabContentWrapper>
          </Tabs.TabPane>
        </StyledTabs>
      </Wrapper>
    </BasePageWrapper>
  );
};

export default SettingsPage;
