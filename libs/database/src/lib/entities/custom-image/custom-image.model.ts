import { ImageModel } from '@flexypw/files-core';
import { Entity } from 'typeorm';

@Entity()
export class CustomImageModel extends ImageModel {}
