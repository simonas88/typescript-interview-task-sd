import { API } from '~/constants';
import getUrl from '~/utils/getUrl';

import { getToken, removeToken, saveToken, tokenExists } from './tokenStore';

export const isLoggedIn = tokenExists;

export const login = async (username: string, password: string): Promise<void> => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);

  if (response.status === 401) {
    throw new Error('Incorrect username or password!');
  }

  const data = await response.json();

  saveToken(data.token);
};

export const logout = async (): Promise<void> => {
  fetch(getUrl(API.Logout), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  removeToken();
};
