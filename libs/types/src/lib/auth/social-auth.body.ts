import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SocialAuthBody {
  @ApiProperty()
  @IsNotEmpty()
  public token: string;
}
