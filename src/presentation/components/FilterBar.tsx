import { useTransition } from 'react';
import type { JSX } from 'react';
import { useMentions } from '../stores/mentionStore';
import type { MentionStatus } from '../../domain/value-objects/MentionStatus';

const STATUS_LIST = [
  { id: 'all', label: 'すべて' },
  { id: 'pending', label: '対応待ち' },
  { id: 'in_progress', label: '対応中' },
  { id: 'completed', label: '完了' },
  { id: 'skipped', label: '対応不要' },
];

export const FilterBar = (): JSX.Element => {
  const setFilter = useMentions((s) => s.setFilter);
  const [isPending, startTransition] = useTransition();

  const handleClick = (status: MentionStatus | 'all') => {
    startTransition(() => {
      setFilter(status);
    });
  };

  return (
    <ul>
      {STATUS_LIST.map((status) => (
        <li key={status.id}>
          <button
            type="button"
            onClick={() => handleClick(status.id)}
            disabled={isPending}
          >
            {status.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
