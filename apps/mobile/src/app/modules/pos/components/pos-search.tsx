import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { debounce } from 'lodash';
import { useAppSelector } from '../../../store/hooks';

const Wrapper = styled.View`
  height: 50px;
  margin: 16px;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  color: #858ea3;
`;

const StyledIcon = styled(Ionicons)`
  padding: 10px;
`;

function callUpdate(event: (value: string) => void, value: string) {
  event(value);
}

const callUpdateDebounced = debounce(callUpdate, 500);

interface IComponentProps {
  onChange(value: string): void;
}

export const PosSearch: React.FC<IComponentProps> = ({ onChange }) => {
  const [value, setValue] = useState('');
  const posList = useAppSelector((state) => state.pos.data.original);

  useEffect(() => {
    setValue('');
  }, [posList]);

  return (
    <Wrapper>
      <StyledIcon name="search-outline" size={22} color="#858EA3" />
      <StyledTextInput
        onChangeText={(value) => {
          setValue(value);
          callUpdateDebounced(onChange, value);
        }}
        placeholder="Поиск"
        value={value}
        allowFontScaling={false}
      />
    </Wrapper>
  );
};
