import { API } from '~/constants';
import getUrl from '~/utils/getUrl';
import { getToken } from './authentication';
import { IItem } from './getUserItems';

const updateItem = (item: IItem): Promise<Response> => (
  fetch(getUrl(API.Items), {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
);

export default updateItem;
