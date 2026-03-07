import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MentionCard } from './MentionCard';

// モック関数を定義
const mockUpdateMention = vi.fn();

// モジュールをモック
vi.mock('../stores/mentionStore', () => ({
  useMentions: (selector) => {
    const state = {
      updateMention: mockUpdateMention,
    };
    return selector(state);
  },
}));

describe('MentionCard', () => {
  it('should display message', () => {
    const mockMention = {
      id: '1',
      message: 'テストメッセージ',
      status: 'pending' as const,
      createdBy: 'user1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    render(<MentionCard mention={mockMention} />);

    expect(screen.getByText('テストメッセージ')).toBeInTheDocument();
  });

  it('should display button when status is pending', () => {
    const mockMention = {
      id: '1',
      message: 'テストメッセージ',
      status: 'pending' as const,
      createdBy: 'user1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    render(<MentionCard mention={mockMention} />);

    expect(
      screen.getByRole('button', { name: '俺がやるぜ' }),
    ).toBeInTheDocument();
  });

  it('should not display button when status is is_progress', () => {
    const mockMention = {
      id: '1',
      message: 'テストメッセージ',
      status: 'in_progress' as const,
      createdBy: 'user1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    render(<MentionCard mention={mockMention} />);

    expect(
      screen.queryByRole('button', { name: '俺がやるぜ' }),
    ).not.toBeInTheDocument();
  });

  it('should call updateMention when button is clicked', async () => {
    const user = userEvent.setup();
    const mockMention = {
      id: '1',
      message: 'テストメッセージ',
      status: 'pending' as const,
      createdBy: 'user1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    render(<MentionCard mention={mockMention} />);

    await user.click(screen.getByRole('button', { name: '俺がやるぜ' }));

    expect(mockUpdateMention).toHaveBeenCalled();
  });
});
