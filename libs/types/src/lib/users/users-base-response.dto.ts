import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EUserSex } from '@business-loyalty-program/enums';

export class UsersBaseResponseDto extends BaseEntityDto {
  constructor(partial: Partial<UsersBaseResponseDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Expose()
  public name: string;

  @ApiPropertyOptional({ format: 'date' })
  @Expose()
  public dateOfBirth?: string;

  @ApiPropertyOptional()
  @Expose()
  public email?: string;

  @ApiPropertyOptional()
  @Expose()
  public surname?: string;

  @ApiPropertyOptional()
  @Expose()
  public phone?: string;

  @ApiPropertyOptional()
  @Expose()
  public cardNumber?: string;

  @ApiPropertyOptional({ enum: EUserSex })
  @Expose()
  public sex?: EUserSex;
}
