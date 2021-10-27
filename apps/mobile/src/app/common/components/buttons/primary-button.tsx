import React from 'react';
import styled from 'styled-components/native';
import { StyleProp, ViewStyle } from 'react-native';

const Wrapper = styled.TouchableHighlight<{ disabled: boolean }>`
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? '#DAE0ED' : '#2f8dfe')};
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex-direction: row;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
`;

interface IComponentProps {
  children: string;
  onPress(): void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton: React.FC<IComponentProps> = ({
  children,
  onPress,
  disabled,
  style,
}) => {
  return (
    <Wrapper
      disabled={disabled}
      style={style as any}
      activeOpacity={0.4}
      underlayColor="#2f8dfe"
      onPress={onPress}
    >
      <ButtonText>{children}</ButtonText>
    </Wrapper>
  );
};
