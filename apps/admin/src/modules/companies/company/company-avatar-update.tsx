import styled from 'styled-components';
import { ImageUploaderPlaceholder } from '@business-loyalty-program/ui-kit';
import React, { useContext } from 'react';
import { CurrentCompanyContext } from '../current-company.context';
import ImgCrop from 'antd-img-crop';
import { message, Upload } from 'antd';
import { CompaniesApi } from '../companies.api';
import { RcFile } from 'antd/es/upload';

const CompanyAvatarWrapper = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  overflow: hidden;
  border-radius: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    ${ImageUploaderPlaceholder} {
      height: 100%;
    }
  }
`;

export const CompanyAvatarUpdate: React.FC = () => {
  const { setCompany, company } = useContext(CurrentCompanyContext);

  return (
    <ImgCrop
      shape="round"
      modalTitle="Выбор миниатюры"
      modalCancel="Отменить"
      modalOk="Сохранить"
    >
      <Upload
        showUploadList={false}
        accept="image/jpeg, image/png"
        customRequest={async ({ file }) => {
          const hide = message.loading('Изображение загружaется...', 0);
          const updatedUser = await new CompaniesApi().updateCompanyAvatar(
            company.id,
            file as RcFile
          );
          setCompany(updatedUser);
          hide();
          message.success('Изображение успешно загружено!');
        }}
      >
        <CompanyAvatarWrapper>
          <img src={company.image?.medium || '/images/jpg-placeholder.svg'} />
          <ImageUploaderPlaceholder />
        </CompanyAvatarWrapper>
      </Upload>
    </ImgCrop>
  );
};
