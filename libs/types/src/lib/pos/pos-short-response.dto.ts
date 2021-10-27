import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty } from '@nestjs/swagger';

export class PosShortResponseDto extends BaseEntityDto {
  @ApiProperty()
  public name: string;
}
