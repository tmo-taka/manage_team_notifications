import type { Mention } from '../../domain/entities/Mention';

export interface IMentionRepository {
  getMentions(): Promise<Mention[]>;
  updateMention(id: string, data: Partial<Mention>): Promise<Mention>;
}
