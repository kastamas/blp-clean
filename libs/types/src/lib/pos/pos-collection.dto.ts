import { BaseCollection } from '@flexypw/backend-core';
import { ApiProperty } from '@nestjs/swagger';
import { PosResponseDto } from './pos-response.dto';

export class PosCollectionDto extends BaseCollection<PosResponseDto> {
  @ApiProperty({ type: [PosResponseDto] })
  public data: PosResponseDto[];
}
