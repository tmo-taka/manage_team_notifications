import { Container } from 'inversify';
import { TYPES } from './types';
import type { IMentionRepository } from '../application/ports/IMentionRepository';
import { MentionRepository } from '../infrastructure/repositories/MentionRepository';
import type { User } from '../domain/entities/User';

import { getMentions } from '../application/use-cases/GetMentions';
import { takeOwnership } from '../application/use-cases/TakeOwnership';

const container = new Container();
container
  .bind<IMentionRepository>(TYPES.MentionRepository)
  .to(MentionRepository);

const mentionRepository = container.get<IMentionRepository>(
  TYPES.MentionRepository,
);

export const mentionUseCases = {
  getMentions: () => getMentions(mentionRepository),
  takeOwnership: (id: string, assignee: User) =>
    takeOwnership(mentionRepository, id, assignee),
};
