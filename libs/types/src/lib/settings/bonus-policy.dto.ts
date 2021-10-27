import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class BonusPolicyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public from: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @Max(0.99)
  public percent: number;
}
