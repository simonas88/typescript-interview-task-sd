import { IItem } from '~/services/getUserItems';
import getRepeatValues from './getRepeatValues';

const itemHasReusedPassword = (item: IItem, itemList: Array<IItem>): boolean => {
  const repeatedPasswords = getRepeatValues(itemList, item => item.password);
  return repeatedPasswords.has(item.password);
};

export default itemHasReusedPassword;
