import type { Mention } from '../../domain/entities/Mention';
import { httpClient } from '../api/httpClient';

export const getMentions = async (): Promise<Mention[]> => {
  const res = await httpClient.get('/mentions');
  return res.data;
};

export const updateMention = async (id: string, data: Partial<Mention>) => {
  const res = await httpClient.patch(`/mentions/${id}`, data);
  return res.data;
};
