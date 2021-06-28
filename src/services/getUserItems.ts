import { API } from '~/constants';
import getUrl from '~/utils/getUrl';
import { getToken } from './tokenStore';

export interface IItem {
  title: string,
  description: string,
  password: string,
  createdAt: string,
}

const getUserItems = async (): Promise<Array<IItem>> => {
  const url = getUrl(API.Items);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  return data.items;
};

export default getUserItems;
