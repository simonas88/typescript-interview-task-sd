import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import getUserItems from '~/services/getUserItems';
import getUserData from '~/services/getUserData';
import { render, act, screen, RenderResult, waitFor } from '@testing-library/react';

import PasswordHealth from '../PasswordHealth';

jest.mock('~/services/getUserItems', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('~/services/getUserData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../Modal', jest.fn());

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

const mockUserData = { id: '1', username: 'test', email: 'test@mail.com' };

const waitUntilLoaded = (): Promise<void> =>
  waitFor(async () => expect(await screen.queryByText('Loading', { exact: false })).toBeNull());

describe('<PasswordHealth /> tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders', async () => {
    (getUserData as jest.Mock).mockReturnValue(Promise.resolve(mockUserData));
    (getUserItems as jest.Mock).mockReturnValue(Promise.resolve([]));

    const { container } = await factory();

    await waitUntilLoaded();

    const rootElement = container.querySelector('.container');

    expect(rootElement).not.toBeNull();
  });

  test('renders loading screen', async () => {
    (getUserData as jest.Mock).mockReturnValue(Promise.resolve(mockUserData));
    (getUserItems as jest.Mock).mockReturnValue(Promise.resolve([]));

    factory();

    const loader = screen.getByText('Loading', { exact: false });
    expect(loader).not.toBeNull();
  });

  test('renders error message', async () => {
    (getUserData as jest.Mock).mockReturnValue(Promise.resolve(mockUserData));
    (getUserItems as jest.Mock).mockRejectedValue({ message: 'test error' });

    await factory();
    await waitUntilLoaded();

    const loader = screen.getByText('test error');
    expect(loader).not.toBeNull();
  });

  test('renders routes correctly', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2019-02-01').valueOf());

    (getUserData as jest.Mock).mockReturnValue(Promise.resolve(mockUserData));
    (getUserItems as jest.Mock).mockReturnValue(Promise.resolve([
      { password: '123', createdAt: new Date('2019-01-01').toISOString() },
      { password: '123', createdAt: new Date('2019-01-01').toISOString() },
      { password: 'Proper123!', createdAt: new Date('2019-01-30').toISOString() },
    ]));

    await factory();
    await waitUntilLoaded();

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
