import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { routes } from '../../../routes';
import { BlpIcon, palette, Subtitle1 } from '@business-loyalty-program/ui-kit';
import { CurrentCompanyContext } from '../../../modules/companies/current-company.context';
import { useContext, useState } from 'react';
import { Dropdown, Menu, Popover } from 'antd';

const Wrapper = styled.a`
  display: flex;
  align-items: center;
`;

interface IComponentProps {}

const AvatarWrapper = styled.div`
  margin-right: 8px;
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ChevronIcon = styled(BlpIcon)`
  font-size: 12px;
  margin-left: 8px;
  color: ${palette.textSecondary};
`;

export const AppMenuCompany: React.FC<IComponentProps> = () => {
  const { company } = useContext(CurrentCompanyContext);
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const handleLogout = () => {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href={routes.currentCompany}>
          <a>Профиль</a>
        </Link>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item onClick={handleLogout} key="logout">
        Выйти
      </Menu.Item>
    </Menu>
  );

  const handleVisibleChange = (flag: boolean) => {
    setMenuVisibility(flag);
  };

  return (
    <Dropdown
      overlay={menu}
      trigger={['hover']}
      visible={isMenuVisible}
      onVisibleChange={handleVisibleChange}
    >
      <div>
        <Link href={routes.currentCompany}>
          <Wrapper>
            <AvatarWrapper>
              <img
                src={company.image?.small || '/images/jpg-placeholder.svg'}
              />
            </AvatarWrapper>

            <Subtitle1>
              {company.name}
              <ChevronIcon iconName="chevron-down" />
            </Subtitle1>
          </Wrapper>
        </Link>
      </div>
    </Dropdown>
  );
};
