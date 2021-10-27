import { Form, FormItemProps } from 'antd';
import styled from 'styled-components';
import React, { useState } from 'react';
import { palette } from '../../styles/theme';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 12px;

  .ant-form-item-label {
    opacity: 0;
  }
`;

const FloatLabel = styled.label<{ isRequired: boolean; isFloat: boolean }>`
  font-size: ${(p) => (p.isFloat ? '10px' : '14px')} !important;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: ${(p) => (p.isFloat ? '4px' : '14px')};
  transition: 200ms ease;

  ::after {
    display: ${(p) => (p.isRequired ? 'inline-block' : 'none')};
    content: '*';
    color: ${palette.error};
  }
`;

interface IComponentProps extends FormItemProps {
  label: React.ReactNode;
}

export const FloatFormItem: React.FC<IComponentProps> = ({
  label,
  rules = [],
  children,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [storedValue, setStoredValue] = useState('');

  const requiredRule = rules.find((rule) => {
    if ('required' in rule && rule.required) {
      return true;
    }
  });

  const isRequired = !!requiredRule;
  const isFloat = focus || (storedValue && storedValue.length !== 0);

  return (
    <Wrapper onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <Form.Item
        rules={rules}
        {...props}
        getValueProps={(value) => {
          setTimeout(() => setStoredValue(value), 0);

          return { value };
        }}
      >
        {children}
      </Form.Item>

      <FloatLabel isRequired={isRequired} isFloat={isFloat}>
        {label}
      </FloatLabel>
    </Wrapper>
  );
};
