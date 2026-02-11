import type { Mention } from '../../domain/entities/Mention';
import { httpClient } from '../api/httpClient';
import type { IMentionRepository } from '../../application/ports/IMentionRepository';

const getMentions = async (): Promise<Mention[]> => {
  const res = await httpClient.get('/mentions');
  return res.data;
};

const updateMention = async (id: string, data: Partial<Mention>) => {
  const res = await httpClient.patch(`/mentions/${id}`, data);
  return res.data;
};

export const mentionRepository: IMentionRepository = {
  getMentions,
  updateMention,
};
