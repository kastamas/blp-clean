import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PosResponseDto extends BaseEntityDto {
  @ApiProperty()
  @Expose()
  public name: string;

  @ApiProperty()
  @Expose()
  public address: string;

  @ApiProperty({ type: [Number] })
  @Expose()
  public coords: number[];

  @ApiPropertyOptional()
  @Expose()
  public note?: string;

  @ApiPropertyOptional()
  @Expose()
  public phone?: string;

  @ApiPropertyOptional()
  @Expose()
  public externalId?: string;
}
