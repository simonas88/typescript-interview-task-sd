import { API } from '~/constants';
import getUrl from '~/utils/getUrl';
import { getToken } from './authentication';

type UserData = {
  id: string;
  username: string;
  email: string;
}

export const getUserData = async (): Promise<UserData> => {
  const response = await fetch(getUrl(API.User), {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const { id, username, email } = await response.json();
  
  return { id, username, email };
};
