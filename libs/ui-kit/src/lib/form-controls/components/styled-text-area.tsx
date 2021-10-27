import styled from 'styled-components';
import { Input } from 'antd';
import { palette } from '../../styles/theme';

export const StyledTextArea = styled(Input.TextArea)`
  &:focus {
    border-color: ${palette.elements};
    box-shadow: none;
  }
`;
