import React from 'react';

import { Form, FormProps } from 'antd';
import { useDisableForm } from '../hooks/use-disable-form';
import { StyledForm } from './styled-form';
import { PrimaryButtonBig } from '../../buttons/primary-button-big';

interface IComponentProps extends FormProps {
  actionButton?: {
    title?: string;
    isBlock?: boolean;
  };
  requiredFields?: string[];
  editMode?: boolean;
}

export const PrimaryForm: React.FC<IComponentProps> = (props) => {
  const {
    children,
    actionButton,
    requiredFields,
    editMode,
    ...formProps
  } = props;

  const { form, checkIsDisabled } = useDisableForm(requiredFields, editMode);

  const buttonTitle = actionButton?.title || 'Отправить';

  return (
    <StyledForm form={form} layout="vertical" {...formProps}>
      {children}

      <Form.Item shouldUpdate>
        {() => (
          <PrimaryButtonBig
            disabled={checkIsDisabled()}
            block={actionButton && actionButton.isBlock}
          >
            {buttonTitle}
          </PrimaryButtonBig>
        )}
      </Form.Item>
    </StyledForm>
  );
};
