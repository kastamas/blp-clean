import { BaseCollection } from '@flexypw/backend-core';
import { UsersResponseDto } from './users-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UsersCollectionDto extends BaseCollection<UsersResponseDto> {
  @ApiProperty({ type: [UsersResponseDto] })
  public data: UsersResponseDto[];
}
