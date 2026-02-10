import type { IMentionRepository } from '../ports/IMentionRepository';

export const completeMention = async (
  repository: IMentionRepository,
  id: string,
) => {
  return await repository.updateMention(id, {
    status: 'completed',
  });
};
