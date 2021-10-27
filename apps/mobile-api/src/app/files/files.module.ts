import { Module } from '@nestjs/common';
import { MinioService } from '@flexypw/files-core';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { DatabaseModule } from '@business-loyalty-program/database';

@Module({
  imports: [DatabaseModule],
  providers: [MinioService, FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
