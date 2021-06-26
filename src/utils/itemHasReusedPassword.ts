import { IItem } from '~/services/getUserItems';

const itemHasReusedPassword = (item: IItem, itemList: Array<IItem>): boolean => {
  const reusedItems = itemList.filter((listItem) => (
    listItem.password === item.password
  ));

  return reusedItems.length > 1;
};

export default itemHasReusedPassword;
