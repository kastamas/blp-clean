import React from 'react';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
`;

const StyledPickerWrapper = styled.View`
  background: #ffffff;
  height: 48px;
  display: flex;
  border-radius: 4px;
`;

const Label = styled.Text`
  font-size: 12px;
  margin-bottom: 4px;
  color: #858ea3;
`;

interface IComponentProps {
  label?: string;
  value: string;
  onChange(value: string): void;
}

export const SelectPicker: React.FC<IComponentProps> = ({
  children,
  label,
  value,
  onChange,
}) => {
  return (
    <Wrapper>
      {label ? <Label>{label}</Label> : null}
      <StyledPickerWrapper>
        <Picker
          style={{ height: '100%' }}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => {
            onChange(itemValue);
          }}
        >
          {children}
        </Picker>
      </StyledPickerWrapper>
    </Wrapper>
  );
};
