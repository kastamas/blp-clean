import * as React from 'react';
import styled from 'styled-components';
import {
  ModalForm,
  ModalTitle,
  StyledInputNumber,
} from '@business-loyalty-program/ui-kit';
import { Form } from 'antd';
import type { BonusPolicyDto } from '@business-loyalty-program/types';
import { IExtendedBonusPolicyDto } from './settings-bonuses-tab-content';

const Wrapper = styled.div``;

interface IComponentProps {
  bonusPolicies: IExtendedBonusPolicyDto[];
  bonusPolicy?: IExtendedBonusPolicyDto;
  isLoading?: boolean;
  onCancel(): void;
  onSuccess(values: BonusPolicyDto): void;
}

export const BonusesModalContent: React.FC<IComponentProps> = (props) => {
  const { bonusPolicy, onCancel, isLoading, onSuccess, bonusPolicies } = props;

  const editMode = !!bonusPolicy;

  const validateFromValue = ({ getFieldValue }) => ({
    validator(_, value) {
      if (value) {
        const policyWithSameValue = bonusPolicies.find(
          (item) => item.from === value
        );

        if (policyWithSameValue) {
          if (!bonusPolicy || bonusPolicy.uid !== policyWithSameValue.uid) {
            return Promise.reject(
              new Error('Такое значение уже задано. Выберете другое.')
            );
          }
        }
      }

      return Promise.resolve();
    },
  });

  return (
    <Wrapper>
      <ModalTitle>
        {editMode ? 'Редактирование статуса' : 'Добавление статуса'}
      </ModalTitle>

      <ModalForm
        onCancel={onCancel}
        actionButton={{ title: editMode ? 'Сохранить' : 'Добавить' }}
        onFinish={(values) => onSuccess(values)}
        isLoading={isLoading}
        requiredFields={['from', 'percent']}
        editMode={editMode}
        initialValues={
          bonusPolicy
            ? {
                ...bonusPolicy,
                percent: (bonusPolicy.percent * 100).toFixed(1),
              }
            : undefined
        }
      >
        <Form.Item
          label="Если сумма покупки от (руб.)"
          name="from"
          rules={[{ required: true }, validateFromValue]}
        >
          <StyledInputNumber min={1} />
        </Form.Item>

        <Form.Item
          label="То начислить % бонусов от покупки"
          name="percent"
          rules={[{ required: true }]}
        >
          <StyledInputNumber min={1} max={99} />
        </Form.Item>
      </ModalForm>
    </Wrapper>
  );
};
