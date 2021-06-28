import { API } from '~/constants';
import getUrl from '~/utils/getUrl';
import { getToken } from './tokenStore';
import { IItem } from './getUserItems';

const updateItem = async (item: IItem): Promise<void> => {
  fetch(getUrl(API.Items), {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default updateItem;
