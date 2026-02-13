import type { Mention } from '../../domain/entities/Mention';
import { httpClient } from '../api/httpClient';
import type { IMentionRepository } from '../../application/ports/IMentionRepository';
import { injectable } from 'inversify';

@injectable()
export class MentionRepository implements IMentionRepository {
  async getMentions(): Promise<Mention[]> {
    const res = await httpClient.get('/mentions');
    return res.data;
  }

  async updateMention(id: string, data: Partial<Mention>): Promise<Mention> {
    const res = await httpClient.patch(`/mentions/${id}`, data);
    return res.data;
  }
}
