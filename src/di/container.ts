import { mentionRepository } from '../infrastructure/repositories/MentionRepository';
import { getMentions } from '../application/use-cases/GetMentions';
import { takeOwnership } from '../application/use-cases/TakeOwnership';
import type { Mention } from '../domain/entities/Mention';
import type { User } from '../domain/entities/User';

export const mentionUseCases = {
  getMentions: () => getMentions(mentionRepository),
  takeOwnership: (id: Mention['id'], assignee: User) =>
    takeOwnership(mentionRepository, id, assignee),
};
