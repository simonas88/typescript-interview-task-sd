import React from 'react';
import Header from '../Header';
import { render, fireEvent, screen, RenderResult } from '@testing-library/react';
import { IItem } from '~/services/getUserItems';

const factory = (username: string, items: IItem[], onLogout: () => void): RenderResult => render(
  <Header username={username} items={items} onLogout={onLogout} />,
);

describe('<Header /> tests', () => {
  test('renders', () => {
    const { container } = factory('test', [], jest.fn());
    
    expect(container.querySelector('.header')).not.toBeNull();
  });

  test('logout button works', () => {
    const logoutMock = jest.fn();
    factory('test', [], logoutMock);

    const button = screen.getByText('Logout test');

    fireEvent.click(button);

    expect(logoutMock).toHaveBeenCalled();
  });

  test('renders warning message because 1 vulnerable item', async () => {
    factory('test', [null], jest.fn());

    const warningMessage = await screen.queryByText('Items are vulnerable', { exact: false });

    expect(warningMessage).not.toBeNull();
  });

  test('doesn\'t render warning messages no vulnerable items', async () => {
    factory('test', [], jest.fn());

    const warningMessage = await screen.queryByText('Items are vulnerable', { exact: false });

    expect(warningMessage).toBeNull();
  });
});
