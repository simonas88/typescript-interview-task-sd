import { API } from '~/constants';
import { UserData } from '~/types';
import getUrl from '~/utils/getUrl';
import authorizedFetch from './authorizedFetch';

const getUserData = async (): Promise<UserData> => {
  const response = await authorizedFetch(getUrl(API.User));

  const { id, username, email } = await response.json();
  
  return { id, username, email };
};

export default getUserData;
