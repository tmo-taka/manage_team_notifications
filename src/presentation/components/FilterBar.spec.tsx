import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FilterBar } from './FilterBar';
import userEvent from '@testing-library/user-event';

const mockSetFilter = vi.fn();

// モジュールをモック
vi.mock('../stores/mentionStore', () => ({
  useMentions: (selector) => {
    const state = {
      setFilter: mockSetFilter,
    };
    return selector(state);
  },
}));

describe('FilterBar', () => {
  it('should set filter pending when click button of pending', async () => {
    const user = userEvent.setup();
    render(<FilterBar />);

    await user.click(screen.getByRole('button', { name: '対応待ち' }));
    expect(mockSetFilter).toHaveBeenCalled();
    expect(mockSetFilter).toHaveBeenCalledWith('pending');
  });
});
