import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  public phone: string;
}
