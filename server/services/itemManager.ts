import { passwords } from '../data';
import { Password } from '../types';

const items: Password[] = [...passwords];

export const updateItem = (item: Password): void => {
  const index = items.findIndex(({ id }) => id === item.id);
  items.splice(index, 1, item);
};

export const getItems = (): Password[] => items;
