import { create } from 'zustand';
import type { Mention } from '../../domain/entities/Mention';
import type { MentionStatus } from '../../domain/value-objects/MentionStatus';

type StateOfMention = {
  mentions: Mention[];
  filter: MentionStatus | 'all';
};

export const useMentions = create((set) => ({
  mentions: [],
  filter: 'all',
  setMentions: (newMentions: Mention[]) => set({ mentions: newMentions }),
  setFilter: (status: MentionStatus | 'all') =>
    set({
      filter: status,
    }),
  updateMention: (updateMention: Mention) =>
    set((state: StateOfMention) => {
      const newMention = state.mentions.map((mention) =>
        mention.id === updateMention.id ? updateMention : mention,
      );
      return { mentions: newMention };
    }),
}));
