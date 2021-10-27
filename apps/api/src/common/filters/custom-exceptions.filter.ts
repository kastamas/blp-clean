import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@flexypw/backend-core';
import { EDatabaseErrorCode } from '@flexypw/database';

export class CustomExceptionsFilter extends BaseExceptionFilter {
  public catch(exception: any, host) {
    if (exception.code === 'ERR_HTTP_HEADERS_SENT') {
      return;
    }

    super.catch(exception, host);
  }

  public customHandler(exception: any): HttpException {
    if (exception.code === EDatabaseErrorCode.NotFound) {
      return new NotFoundException();
    }

    if (exception.code === EDatabaseErrorCode.UniqueViolation) {
      return new ConflictException();
    }
  }
}
