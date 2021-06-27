import { API } from '~/constants';
import getUrl from '~/utils/getUrl';

const TOKEN_KEY = 'token';

export const getToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);
export const isLoggedIn = (): boolean => getToken() !== null;

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
  const { token } = data;

  sessionStorage.setItem(TOKEN_KEY, token);
};

export const logout = async (): Promise<void> => {
  sessionStorage.removeItem(TOKEN_KEY);
  fetch(getUrl(API.Logout), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
