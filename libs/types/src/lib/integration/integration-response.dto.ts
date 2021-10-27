import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty } from '@nestjs/swagger';

export class IntegrationResponseDto extends BaseEntityDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public token: string;
}
