import type { IMentionRepository } from '../ports/IMentionRepository';

export const skipMention = async (
  repository: IMentionRepository,
  id: string,
) => {
  return await repository.updateMention(id, {
    status: 'skipped',
  });
};
