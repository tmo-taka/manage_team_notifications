import { useOptimistic, type JSX } from 'react';
import type { Mention } from '../../domain/entities/Mention';
import { useMentions } from '../stores/mentionStore';

type PropsOfMentionCard = {
  mention: Mention;
};

export const MentionCard = (props: PropsOfMentionCard): JSX.Element => {
  const updateMention = useMentions((s) => s.updateMention);

  const [optimisticMention, setOptimisticMention] = useOptimistic(
    props.mention,
    (currentMention, newStatus) => ({
      ...currentMention,
      status: newStatus,
    }),
  );

  const handleTakeOwnership = () => {
    const UPDATE_STATUS = 'in_progress';
    setOptimisticMention(UPDATE_STATUS);
    updateMention({
      ...props.mention,
      status: UPDATE_STATUS,
    });
  };
  return (
    <div data-testid="mention-card">
      <span>{optimisticMention.status}</span>
      <p>{optimisticMention.message}</p>
      {optimisticMention.status === 'pending' && (
        <button type="button" onClick={handleTakeOwnership}>
          俺がやるぜ
        </button>
      )}
    </div>
  );
};
