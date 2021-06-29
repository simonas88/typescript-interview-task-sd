import React from 'react';
import Header from '../Header';
import { render, fireEvent, screen, RenderResult } from '@testing-library/react';

const getSequenceTo = (to: number): number[] => Array(to).fill(0).map((_, index) => index + 1);

const factory = (username: string, items: number, onLogout: () => void): RenderResult => render(
  <Header username={username} vulnerableItems={items} onLogout={onLogout} />,
);

describe('<Header /> tests', () => {
  test('renders', () => {
    const { container } = factory('test', 0, jest.fn());
    
    expect(container.querySelector('.header')).not.toBeNull();
  });

  test('logout button works', () => {
    const logoutMock = jest.fn();
    factory('test', 0, logoutMock);

    const button = screen.getByText('Logout test');

    fireEvent.click(button);

    expect(logoutMock).toHaveBeenCalled();
  });

  test.each(getSequenceTo(10))('renders warning message because %s vulnerable item', async (itemCount) => {
    factory('test', itemCount, jest.fn());

    const warningMessage = await screen.queryByText('Items are vulnerable', { exact: false });

    expect(warningMessage).not.toBeNull();
  });

  test('doesn\'t render warning messages no vulnerable items', async () => {
    factory('test', 0, jest.fn());

    const warningMessage = await screen.queryByText('Items are vulnerable', { exact: false });

    expect(warningMessage).toBeNull();
  });
});
