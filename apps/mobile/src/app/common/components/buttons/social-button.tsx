import React from 'react';
import styled from 'styled-components/native';
import {
  ImageSourcePropType,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';

const Wrapper = styled.View<{ pressed?: boolean; disabled?: boolean }>`
  height: 48px;
  border-radius: 4px;
  width: 100%;
  background-color: ${(p) => (p.pressed ? '#FFFFFF90' : 'white')};
  opacity: ${(p) => (p.disabled ? '0.5' : '1')};
`;

const ViewWrapper = styled.View`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const SocialLogo = styled.Image`
  height: 20px;
  width: 20px;
  margin-right: 12px;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  color: #051c3f;
`;

interface IComponentProps {
  source: ImageSourcePropType;
  children: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress(): void;
}

export const SocialButton: React.FC<IComponentProps> = ({
  children,
  onPress,
  source,
  style,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: '100%',
        },
      ]}
    >
      {({ pressed }) => (
        <Wrapper pressed={pressed} disabled={disabled} style={style as any}>
          <ViewWrapper>
            <SocialLogo source={source} />
            <ButtonText>{children}</ButtonText>
          </ViewWrapper>
        </Wrapper>
      )}
    </Pressable>
  );
};
