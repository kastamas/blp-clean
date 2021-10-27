import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps, ViewProps } from 'react-native';

const Wrapper = styled.View`
  width: 100%;
`;

const InputWrapper = styled.View`
  background: #ffffff;
  border-radius: 4px;
  padding: 0 12px;
`;

const Label = styled.Text`
  font-size: 12px;
  margin-bottom: 4px;
  color: #858ea3;
`;

const StyledTextInput = styled.TextInput`
  color: black;
`;

interface IComponentProps extends TextInputProps {
  label?: string;
  style?: ViewProps['style'];
}

export const PrimaryInput: React.FC<IComponentProps> = ({
  label,
  style,
  ...props
}) => {
  return (
    <Wrapper style={style as any}>
      {label ? <Label>{label}</Label> : null}
      <InputWrapper>
        <StyledTextInput {...(props as any)} />
      </InputWrapper>
    </Wrapper>
  );
};
