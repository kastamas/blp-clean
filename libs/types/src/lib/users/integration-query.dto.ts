import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IntegrationQueryDto {
  @ApiProperty({ description: 'User id, phone or card number' })
  @IsNotEmpty()
  public query: string;
}
