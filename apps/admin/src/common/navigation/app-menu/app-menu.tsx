import styled from 'styled-components';
import { palette } from '@business-loyalty-program/ui-kit';
import React from 'react';
import { MenuItem } from './menu-item';
import { routes } from '../../../routes';
import { MenuItemInDevelopment } from './menu-item-in-development';

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 16px;
  padding-right: 12px;
  padding-left: 12px;

  background: ${palette.text};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ControlsWrapper = styled.div``;

const LogoWrapper = styled.div`
  margin-bottom: 32px;
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.img.attrs((props) => ({
  src: '/images/logo-icon.svg',
}))`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;

const LogoText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: ${palette.white};
`;

const MenuWrapper = styled.div``;

export const AppMenu: React.FC = () => {
  return (
    <Wrapper>
      <ControlsWrapper>
        <LogoWrapper>
          <LogoIcon />
          <LogoText>
            Loyalty
            <br />
            Program
          </LogoText>
        </LogoWrapper>
        <MenuWrapper>
          <MenuItemInDevelopment iconName="chart-bar">
            Статистика
          </MenuItemInDevelopment>
          <MenuItem href={routes.transactions} iconName="credit-card">
            Операции
          </MenuItem>
          <MenuItem href={routes.clients} iconName="user-add">
            Клиенты
          </MenuItem>
          <MenuItemInDevelopment iconName="comment">
            Обратная связь
          </MenuItemInDevelopment>
          <MenuItemInDevelopment iconName="email">
            Сообщения
          </MenuItemInDevelopment>
          <MenuItemInDevelopment iconName="dollar">Прайс</MenuItemInDevelopment>
          <MenuItemInDevelopment iconName="file">Новости</MenuItemInDevelopment>
          <MenuItem href={routes.pos} iconName="shopping-cart">
            Торговые точки
          </MenuItem>
        </MenuWrapper>
      </ControlsWrapper>
      <ControlsWrapper>
        <MenuItem href={routes.settings} iconName="settings">
          Настройки
        </MenuItem>
      </ControlsWrapper>
    </Wrapper>
  );
};
