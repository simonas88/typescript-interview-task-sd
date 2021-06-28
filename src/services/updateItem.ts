import { API } from '~/constants';
import getUrl from '~/utils/getUrl';
import { IItem } from './getUserItems';
import authorizedFetch from './authorizedFetch';

const updateItem = async (item: IItem): Promise<void> => {
  authorizedFetch(getUrl(API.Items), {
    method: 'POST',
    body: JSON.stringify(item),
    headers: { 'Content-Type': 'application/json' },
  });
};

export default updateItem;
