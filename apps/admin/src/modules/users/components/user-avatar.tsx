import * as React from 'react';
import styled from 'styled-components';
import { FileResponseDto } from '@flexypw/files-core';
import { palette } from '@business-loyalty-program/ui-kit';

const Wrapper = styled.div<{ hasImage: boolean }>`
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 100%;
  border: ${(p) => (p.hasImage ? 'none' : `1px solid ${palette.elements(p)}`)};

  img {
    width: 100%;
    height: 100%;
  }
`;

interface IComponentProps {
  image?: FileResponseDto;
  className?: string;
}

const UserAvatarComponent: React.FC<IComponentProps> = ({
  image,
  className,
}) => {
  return (
    <Wrapper className={className} hasImage={!!image}>
      <img src={image?.small || '/images/user-avatar-placeholder.svg'} />
    </Wrapper>
  );
};

export const UserAvatar = styled(UserAvatarComponent)``;
