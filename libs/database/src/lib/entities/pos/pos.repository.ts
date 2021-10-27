import { Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { PosModel } from './pos.model';
import { BaseRepository, InjectRepository } from '@flexypw/database';

@Injectable()
export class PosRepository extends BaseRepository<PosModel> {
  constructor(@InjectRepository(PosModel) repository: Repository<PosModel>) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return ['company'];
  }

  public getByIdOrExternalId(query: string) {
    return this.repository.findOne({
      where: [
        { id: Raw(() => `"PosModel".id::text = '${query}'`) },
        { externalId: query },
      ],
      relations: ['company'],
    });
  }

  public getFirstPos() {
    return this.repository.findOne();
  }
}
