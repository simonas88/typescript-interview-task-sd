import { API } from '~/constants';
import getUrl from '~/utils/getUrl';

const TOKEN_KEY = 'token';

export const login = async (username: string, password: string): Promise<void> => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);
  const data = await response.json();
  const { token } = data;

  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
