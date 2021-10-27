import React from 'react';
import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

const Logo = styled.Image`
  width: 72px;
  height: 72px;
`;

const StyledView = styled.View`
  background-color: #051c3f;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  margin-top: 16px;
  color: white;
  text-align: center;
  font-size: 30px;
`;

export const SplashScreen: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#051c3f" />
      <StyledView>
        <Logo source={require('../assets/images/logo.png')} />
        <StyledText>Loyalty{'\n'}Program</StyledText>
      </StyledView>
    </>
  );
};
