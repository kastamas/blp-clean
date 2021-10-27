import React from 'react';
import styled from 'styled-components/native';
import { StyleProp, ViewStyle } from 'react-native';

const Wrapper = styled.TouchableHighlight`
  width: 100%;
  background-color: transparent;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex-direction: row;
`;

const ButtonText = styled.Text`
  color: #858ea3;
  font-size: 14px;
`;

interface IComponentProps {
  children: string;
  onPress(): void;
  style?: StyleProp<ViewStyle>;
}

export const SecondaryButton: React.FC<IComponentProps> = ({
  onPress,
  style,
  children,
}) => {
  return (
    <Wrapper
      style={style as any}
      activeOpacity={0.7}
      underlayColor="rgba(167, 163, 163, 0.32)"
      onPress={onPress}
    >
      <ButtonText>{children}</ButtonText>
    </Wrapper>
  );
};
