import { useEffect, type JSX } from 'react';
import { useMentions } from '../stores/mentionStore';
import { FilterBar } from '../components/FilterBar';
import { MentionList } from '../components/MentionList';
import { mentionUseCases } from '../../di/container';

export const DashboardPage = (): JSX.Element => {
  const setMentions = useMentions((s) => s.setMentions);

  useEffect(() => {
    mentionUseCases.getMentions().then(setMentions);
  }, [setMentions]);

  return (
    <div>
      <FilterBar />
      <MentionList />
    </div>
  );
};
