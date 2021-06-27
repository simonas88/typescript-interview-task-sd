import React from 'react';
import { render, act, screen, RenderResult } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

const mockItemsProvider = jest.fn();
const mockUserContext = jest.fn();

jest.mock('../userItemsProvider', () => ({
  __esModule: true,
  default: mockItemsProvider,
}));

jest.mock('../../UserContext', () => ({
  useUserContext: mockUserContext,
}));

import PasswordHealth from '../PasswordHealth'; // has to be imported AFTER jest.mock due to hoisting issues


const factory = async (): Promise<RenderResult> => {
  let wrapper;
  await act(async () => {
    wrapper = await render(
      <MemoryRouter>
        <PasswordHealth />
      </MemoryRouter>,
    );
  });
  return wrapper;
};

describe('<PasswordHealth /> tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockUserContext.mockReturnValue({});
  });

  test('renders', async () => {
    mockItemsProvider.mockReturnValue({ items: [] });

    const { container } = await factory();

    const rootElement = container.querySelector('.container');

    expect(rootElement).not.toBeNull();
  });

  test('renders routes correctly', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2019-02-01').valueOf());

    mockItemsProvider.mockReturnValue({
      items: [
        { password: '123', createdAt: new Date('2019-01-01').toISOString() },
        { password: '123', createdAt: new Date('2019-01-01').toISOString() },
        { password: 'Proper123!', createdAt: new Date('2019-01-30').toISOString() },
      ],
    });

    await factory();
    const allTab = screen.getByText('All', { exact: false });
    const weakTab = screen.getByText('Weak', { exact: false });
    const reusedTab = screen.getByText('Reused', { exact: false });
    const oldTab = screen.getByText('Old', { exact: false });

    expect(allTab.textContent).toMatch('All (3)');
    expect(weakTab.textContent).toMatch('Weak (2)');
    expect(reusedTab.textContent).toMatch('Reused (2)');
    expect(oldTab.textContent).toMatch('Old (2)');
  });
});
