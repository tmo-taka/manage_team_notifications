import type { MentionStatus } from '../value-objects/MentionStatus';

export type Mention = {
  id: string;
  status: MentionStatus;
  message: string;
  assignee?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};
