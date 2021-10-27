import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Wrapper = styled.View`
  background: #ffffff;
  border-radius: 4px;
  padding: 0 12px;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 12px;
  margin-bottom: 4px;
  color: #858ea3;
`;

const ValueWrapper = styled.Text`
  flex: 1;
  color: black;
  font-size: 14px;
`;

interface IComponentProps {
  label?: string;
  value?: Date;
  disabled?: boolean;
  onChange?(value: Date): void;
}

export const DatePicker: React.FC<IComponentProps> = ({
  label,
  value,
  onChange,
  disabled,
}) => {
  const [visible, setVisibility] = useState(false);

  const onValueChange = (event, selectedDate) => {
    if (selectedDate) {
      onChange(selectedDate);
    }

    setVisibility(false);
  };

  const dataDisplayView = (
    <Wrapper>
      <ValueWrapper>
        {value ? moment(value).format('DD.MM.YYYY') : ''}
      </ValueWrapper>
      <Ionicons name="calendar-outline" size={16} color="#858EA3" />
    </Wrapper>
  );

  return (
    <View style={{ flex: 1 }}>
      {label ? <Label>{label}</Label> : null}
      {disabled ? (
        dataDisplayView
      ) : (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              setVisibility(true);
            }}
          >
            {dataDisplayView}
          </TouchableWithoutFeedback>
          {visible && (
            <DateTimePicker
              value={value || new Date()}
              display="default"
              onChange={onValueChange}
            />
          )}
        </>
      )}
    </View>
  );
};
