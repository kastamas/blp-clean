import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const StyledScrollView = styled.ScrollView`
  background-color: #f3f4f8;
`;

const StyledView = styled.View`
  background-color: #f3f4f8;
  padding: 0 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.Text`
  margin-top: 28px;
  color: black;
  font-size: 24px;
`;

const Logo = styled.Image`
  margin-top: 200px;
  width: 72px;
  height: 72px;
`;

interface IComponentProps {
  title: string;
}

export const PublicNavigationWrapper: React.FC<IComponentProps> = ({
  children,
  title,
}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f8" />
      <StyledScrollView keyboardShouldPersistTaps="handled">
        <StyledView>
          <Logo source={require('../assets/images/logo.png')} />
          <Heading>{title}</Heading>
          {children}
        </StyledView>
      </StyledScrollView>
    </>
  );
};
