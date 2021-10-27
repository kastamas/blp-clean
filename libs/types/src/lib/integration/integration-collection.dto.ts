import { BaseCollection } from '@flexypw/backend-core';
import { ApiProperty } from '@nestjs/swagger';
import { IntegrationResponseDto } from './integration-response.dto';

export class IntegrationCollectionDto extends BaseCollection<IntegrationResponseDto> {
  @ApiProperty({ type: [IntegrationResponseDto] })
  public data: IntegrationResponseDto[];
}
