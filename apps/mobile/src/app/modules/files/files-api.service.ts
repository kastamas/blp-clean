import { BaseMobileApi } from '../../common/services/base-mobile-api';
import { ImagePickerResponse } from 'react-native-image-picker';
import { FileResponseDto } from '@flexypw/files-core';
import ImageResizer from 'react-native-image-resizer';

export class FilesApiService extends BaseMobileApi {
  public upload(pickerResponse: ImagePickerResponse): Promise<FileResponseDto> {
    return ImageResizer.createResizedImage(
      pickerResponse.uri,
      pickerResponse.width,
      pickerResponse.height,
      'JPEG',
      80,
      360,
      null,
      false,
      { onlyScaleDown: true }
    ).then((response) => {
      const body = new FormData();

      body.append('file', {
        type: pickerResponse.type,
        size: response.size,
        uri: `${response.uri}`,
        name: response.name,
      });

      const headers = {
        'content-type': 'multipart/form-data',
        accept: 'application/json',
      };

      return this.client.post(`/files`, body, {
        headers,
      });
    });
  }
}
