import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  font-size: 12px;
  margin-bottom: 4px;
  color: #858ea3;
`;

const TextWrapper = styled.View`
  padding: 0 12px;
`;

const ChildrenText = styled.Text`
  color: black;
`;

interface IComponentProps {
  label: string;
  style?: ViewProps['style'];
}

export const FakeInput: React.FC<IComponentProps> = ({
  children,
  style,
  label,
}) => {
  return (
    <Wrapper style={style as any}>
      <Label>{label}</Label>
      <TextWrapper>
        <ChildrenText>{children}</ChildrenText>
      </TextWrapper>
    </Wrapper>
  );
};
