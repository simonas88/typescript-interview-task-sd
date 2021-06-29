import { API } from '~/constants';
import getUrl from '~/utils/getUrl';
import authorizedFetch from './authorizedFetch';

export interface IItem {
  title: string,
  description: string,
  password: string,
  createdAt: string,
}

const getUserItems = async (): Promise<Array<IItem>> => {
  const response = await authorizedFetch(getUrl(API.Items));

  const data = await response.json();

  return data.items;
};

export default getUserItems;
