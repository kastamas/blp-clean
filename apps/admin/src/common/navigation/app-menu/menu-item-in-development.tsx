import React from 'react';
import styled from 'styled-components';
import { BlpIcon, palette, Subtitle1 } from '@business-loyalty-program/ui-kit';
import { message } from 'antd';

interface IComponentProps {
  href?: string;
  iconName?: string;
}

const Wrapper = styled.a`
  display: flex;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 8px;

  ${BlpIcon} {
    margin-right: 8px;
    color: ${palette.textSecondary};
  }

  ${Subtitle1} {
    color: ${palette.textSecondary};
  }
`;

export const MenuItemInDevelopment: React.FC<IComponentProps> = ({
  children,
  iconName,
}) => {
  const showDevelopmentMessage = () => {
    message.info('В разработке');
  };

  return (
    <Wrapper onClick={showDevelopmentMessage}>
      {iconName ? <BlpIcon iconName={iconName} /> : null}
      <Subtitle1>{children}</Subtitle1>
    </Wrapper>
  );
};
