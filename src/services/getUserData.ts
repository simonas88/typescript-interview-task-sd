import { API } from '~/constants';
import getUrl from '~/utils/getUrl';
import authorizedFetch from './authorizedFetch';

type UserData = {
  id: string;
  username: string;
  email: string;
}

export const getUserData = async (): Promise<UserData> => {
  const response = await authorizedFetch(getUrl(API.User));

  const { id, username, email } = await response.json();
  
  return { id, username, email };
};
