import { passwords } from '../data';
import { Password } from '../types';

const items: Password[] = [];

export const updateItem = (item: Password): void => {
  items.push(item);
};

export const getItems = (): Password[] => {
  return passwords.map((passwordItem) => {
    const updatedItem = items.find(({ id }) => id === passwordItem.id);

    return {
      ...(updatedItem || passwordItem),
    };
  });
};



