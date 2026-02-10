import type { User } from '../../domain/entities/User';
import type { IMentionRepository } from '../ports/IMentionRepository';

export const takeOwnership = async (
  repository: IMentionRepository,
  id: string,
  assignee: User,
) => {
  return await repository.updateMention(id, {
    status: 'in_progress',
    assignee,
  });
};
