import styled from 'styled-components';
import React from 'react';
import { BlpIcon } from '../../icons/blp-icon';
import { palette } from '../../styles/theme';

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  transition: height 0.3s ease;
  background: rgba(17, 17, 17, 0.6);
  bottom: 0;

  ${BlpIcon} {
    color: ${palette.background};
    font-size: 16px;
  }
`;

interface IComponentProps {
  className?: string;
}

const ImageUploaderPlaceholderComponent: React.FC<IComponentProps> = ({
  className,
}) => {
  return (
    <Wrapper className={className}>
      <BlpIcon iconName="edit" />
    </Wrapper>
  );
};

export const ImageUploaderPlaceholder = styled(
  ImageUploaderPlaceholderComponent
)``;
