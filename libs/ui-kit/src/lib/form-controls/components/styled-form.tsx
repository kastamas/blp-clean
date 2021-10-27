import styled from 'styled-components';
import { Form } from 'antd';
import { palette } from '../../styles/theme';
import { StyledInput } from './styled-input';
import { StyledInputPassword } from './styled-input-password';
import { StyledTextArea } from './styled-text-area';
import { StyledInputNumber } from './styled-input-number';

export const StyledForm = styled(Form)`
  .ant-form {
    width: 100%;
  }

  .ant-input-affix-wrapper-focused {
    box-shadow: none;
    border-color: ${palette.elements};
  }

  .ant-form-item-has-error {
    .ant-input-affix-wrapper,
    .ant-input-affix-wrapper-focused {
      box-shadow: none;
      border-color: ${palette.error};
    }
  }

  .ant-form-item-has-success {
    ${StyledInput}, ${StyledInputPassword}, ${StyledTextArea}, ${StyledInputNumber} {
      border-color: ${palette.primary} !important;
    }
  }
`;
