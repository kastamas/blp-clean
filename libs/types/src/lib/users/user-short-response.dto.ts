import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty } from '@nestjs/swagger';

export class UserShortResponseDto extends BaseEntityDto {
  @ApiProperty()
  public name: string;
}
