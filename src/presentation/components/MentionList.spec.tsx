import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MentionList } from './MentionList';
import dbData from '../../../db.json';

let mockFilter = 'all';

// モジュールをモック
vi.mock('../stores/mentionStore', () => ({
  useMentions: (selector) => {
    const state = {
      filter: mockFilter,
      mentions: dbData.mentions,
    };
    return selector(state);
  },
}));

describe('MentionList', () => {
  it('should display all when filter is all', () => {
    render(<MentionList />);

    const cards = screen.getAllByTestId('mention-card');
    expect(cards).toHaveLength(2);
  });

  it('should be able to filtered when filter is pending', () => {
    mockFilter = 'pending';
    render(<MentionList />);

    const cards = screen.getAllByTestId('mention-card');
    expect(cards).toHaveLength(1);
  });

  it('should not displayed when filter is completed', () => {
    mockFilter = 'completed';
    render(<MentionList />);

    const cards = screen.queryAllByTestId('mention-card');
    expect(cards).toHaveLength(0);
  });
});
