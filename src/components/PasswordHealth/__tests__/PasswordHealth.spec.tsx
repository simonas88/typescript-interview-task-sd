import React from 'react';
import { render, act, RenderResult } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

const mockItemsProvider = jest.fn();
const mockUserContext = jest.fn();

jest.mock('../useItemsProvider', () => ({
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
  test('renders', async () => {
    mockItemsProvider.mockReturnValue({ items: [] });
    mockUserContext.mockReturnValue({});

    const { container } = await factory();

    const rootElement = container.querySelector('.container');

    expect(rootElement).not.toBeNull();
  });
});
