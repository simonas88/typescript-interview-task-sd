import { API } from '~/constants';
import { Item } from '~/types';
import getUrl from '~/utils/getUrl';
import authorizedFetch from './authorizedFetch';

const updateItem = async (item: Item): Promise<void> => {
  authorizedFetch(getUrl(API.Items), {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'Content-Type': 'application/json' },
  });
};

export default updateItem;
