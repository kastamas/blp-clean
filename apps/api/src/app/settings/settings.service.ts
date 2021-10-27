import { Injectable } from '@nestjs/common';
import {
  SettingsModel,
  SettingsRepository,
} from '@business-loyalty-program/database';
import { SettingsUpdateDto } from '@business-loyalty-program/types';

@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  public update(entity: SettingsModel, body: SettingsUpdateDto) {
    return this.settingsRepository.update(entity, body);
  }
}
