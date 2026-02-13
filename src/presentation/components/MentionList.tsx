import type { JSX } from 'react';
import { useMentions } from '../stores/mentionStore';
import { MentionCard } from './MentionCard';

export const MentionList = (): JSX.Element => {
  const filter = useMentions((s) => s.filter);
  const mentions = useMentions((s) => s.mentions);

  const filterMentions =
    filter === 'all'
      ? mentions
      : mentions.filter((mention) => mention.status === filter);

  return (
    <>
      {filterMentions.map((mention) => (
        <MentionCard key={mention.id} mention={mention} />
      ))}
    </>
  );
};
