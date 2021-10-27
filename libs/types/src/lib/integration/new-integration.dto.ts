import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewIntegrationDto {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
}
