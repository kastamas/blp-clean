import React, { useEffect } from 'react';
import { Select, SelectProps } from 'antd';
import { debounce } from 'lodash';
import { useGetAddressSuggestions } from '../address.api';
import { StyledSelect } from '@business-loyalty-program/ui-kit';

interface IAddressValue {
  address: string;
  coords: [number, number];
}

interface IComponentProps extends SelectProps<any> {
  value?: IAddressValue;
  onChange?(value: IAddressValue): void;
}

function callUpdate(setter: (value: string) => void, value: string) {
  setter(value);
}

const callUpdateDebounced = debounce(callUpdate, 500);

export const AddressSelector: React.FC<IComponentProps> = ({
  value,
  onChange,
  ...props
}) => {
  const { apiAction, response, isLoading } = useGetAddressSuggestions();

  useEffect(() => {
    apiAction('петрозаводск');
  }, []);

  return (
    <StyledSelect
      {...props}
      value={value?.address}
      onChange={(_, { key }: any) => {
        if (response && onChange) {
          const item = response.find((addressItem) => addressItem.hash === key);
          if (item) {
            onChange({
              address: item.address,
              coords: item.coords,
            });
          }
        }
      }}
      loading={isLoading}
      showSearch
      onSearch={(searchString) =>
        callUpdateDebounced(apiAction, searchString || 'петрозаводск')
      }
      filterOption={false}
    >
      {(response || []).map((item) => (
        <Select.Option key={item.hash} value={item.address}>
          {item.address}
        </Select.Option>
      ))}
    </StyledSelect>
  );
};
