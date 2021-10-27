import { Controller, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtSecurity } from '@flexypw/auth';
import { FilesService } from './files.service';
import { PostFiles } from '@flexypw/files-core';

@Controller()
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @PostFiles()
  @JwtSecurity()
  public uploadFile(@UploadedFile('file') file) {
    return this.filesService.uploadFile(
      file.originalname,
      file.mimetype,
      file.buffer
    );
  }
}
