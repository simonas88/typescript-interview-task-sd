import { API, Routes } from '~/constants';
import getUrl from '~/utils/getUrl';

import { getToken, removeToken, saveToken, tokenExists } from './tokenStore';

export const isLoggedIn = tokenExists;

export const login = async (username: string, password: string): Promise<void> => {
  const url = getUrl(API.Login);

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    throw new Error('Incorrect username or password!');
  }

  const data = await response.json();

  saveToken(data.token);
};

export const logout = async (): Promise<void> => {
  await fetch(getUrl(API.Logout), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  removeToken();
};

export const logoutAndReload = async (): Promise<void> => {
  await logout();
  window.location.assign(Routes.Login);
};
