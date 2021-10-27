import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import { RcFile } from 'antd/es/upload';
import { FileResponseDto } from '@flexypw/files-core';

export class FilesApi extends BaseApi {
  @ApiMethod()
  public uploadFile(body: RcFile): Promise<FileResponseDto> {
    const formData = new FormData();
    formData.append('file', body);

    return this.client.post('/files', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
}

const { useUploadFile } = buildApiHooks(FilesApi);

export { useUploadFile };
