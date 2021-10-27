import { useEffect, useState } from 'react';
import { Form } from 'antd';

export function useDisableForm(requiredNames?: string[], editMode?: boolean) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  function checkIsDisabled() {
    const isTouched = requiredNames
      ? form.isFieldsTouched(requiredNames, true)
      : form.isFieldsTouched(true);

    const hasErrors = !!form
      .getFieldsError()
      .filter(({ errors }) => errors.length).length;

    return (!editMode && !isTouched) || hasErrors;
  }

  return { form, checkIsDisabled };
}
