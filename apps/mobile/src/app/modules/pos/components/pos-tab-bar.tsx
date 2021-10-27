import React from 'react';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';
import styled from 'styled-components/native';

type TComponentProps = SceneRendererProps & {
  navigationState: NavigationState<any>;
};

const LabelWrapper = styled.View`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTabBar = styled(TabBar)`
  background-color: #f3f4f8;
`;

const LabelText = styled.Text<{ focused: boolean }>`
  font-size: 14px;
  color: ${({ focused }) => (focused ? 'black' : '#858EA3')};
`;

export const PosTabBar: React.FC<TComponentProps> = ({ ...props }) => {
  return (
    <StyledTabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <LabelWrapper>
          <LabelText focused={focused}>{route.title}</LabelText>
        </LabelWrapper>
      )}
      indicatorStyle={{ backgroundColor: '#2F8DFE' }}
    />
  );
};
