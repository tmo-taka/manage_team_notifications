import type { MentionStatus } from '../value-objects/MentionStatus';
import type { User } from './User';

export type Mention = {
  id: string;
  status: MentionStatus;
  message: string;
  assignee?: User;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};
