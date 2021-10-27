import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FilesApiService } from '../../files/files-api.service';
import { UsersMobileResponseDto } from '@business-loyalty-program/types';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Avatar = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 100px;
`;

const UploadIconWrapper = styled.View`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #2f8dfe;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: white;
  border-radius: 100px;
  bottom: 5px;
  right: 34%;
`;

interface IComponentProps {
  user: UsersMobileResponseDto;
  onSubmit(data: any): void;
}

export const UserAvatarEdit: React.FC<IComponentProps> = ({
  user,
  onSubmit,
}) => {
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(
    require('../../../../assets/images/avatar-placeholder.png')
  );

  useEffect(() => {
    if (user.image) {
      setImageSource({ uri: user.image.medium });
    }
  }, [user]);

  function uploadImage() {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (response.uri) {
          setImageSource({
            uri: response.uri,
          });

          new FilesApiService().upload(response).then(({ id }) => {
            onSubmit({ imageId: id });
          });
        }
      }
    );
  }

  return (
    <TouchableOpacity onPress={() => uploadImage()}>
      <Wrapper>
        <Avatar source={imageSource} />
        <UploadIconWrapper>
          <Ionicons name="pencil-outline" color="white" size={16} />
        </UploadIconWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};
