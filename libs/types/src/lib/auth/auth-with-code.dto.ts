import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthWithCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  public phone: string;

  @ApiProperty()
  @IsNotEmpty()
  public code: string;
}
