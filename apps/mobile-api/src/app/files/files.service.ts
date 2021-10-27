import { Injectable } from '@nestjs/common';
import { MinioService } from '@flexypw/files-core';
import { CustomImageRepository } from '@business-loyalty-program/database';

@Injectable()
export class FilesService {
  constructor(
    private readonly customImageRepository: CustomImageRepository,
    private readonly minioService: MinioService
  ) {}

  public async uploadFile(name: string, mimetype: string, buffer: Buffer) {
    const data = await this.minioService.uploadImage(name, mimetype, buffer);

    return this.customImageRepository.create(data);
  }
}
