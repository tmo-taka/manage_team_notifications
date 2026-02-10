import type { IMentionRepository } from '../ports/IMentionRepository';

export const getMentions = async (repository: IMentionRepository) => {
  return await repository.getMentions();
};
