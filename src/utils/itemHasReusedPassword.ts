import { Item } from '~/types';
import getRepeatValues from './getRepeatValues';

const itemHasReusedPassword = (item: Item, itemList: Array<Item>): boolean => {
  const repeatedPasswords = getRepeatValues(itemList, item => item.password);
  return repeatedPasswords.has(item.password);
};

export default itemHasReusedPassword;
