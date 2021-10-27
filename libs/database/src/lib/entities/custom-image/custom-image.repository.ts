import { CustomImageModel } from './custom-image.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@flexypw/database';
import { BaseImageRepository } from '@flexypw/files-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomImageRepository extends BaseImageRepository<CustomImageModel> {
  constructor(
    @InjectRepository(CustomImageModel) repository: Repository<CustomImageModel>
  ) {
    super(repository);
  }
}
