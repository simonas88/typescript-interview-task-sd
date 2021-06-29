import { useCallback, useEffect, useState } from 'react';
import getUserItems from '~/services/getUserItems';
import updateItemApi from '~/services/updateItem';
import { Item } from '~/types';

type UserItems = {
  isLoading: boolean;
  errorMessage: string;
  items: Item[];
  updateItem: (input: Item) => void;
}

const userItemsProvider = (): UserItems => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [items, setItems] = useState<Array<Item>>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const userItems = await getUserItems();

        setItems(userItems);
      } catch (error) {
        setErrorMessage(error.message);
      }

      setIsLoading(false);
    })();
  }, []);

  const updateItem = useCallback(
    (item: Item) => void updateItemApi(item)
      .then(() => getUserItems())
      .then(setItems),
    [],
  );

  return {
    isLoading,
    errorMessage,
    items,
    updateItem,
  };
};

export default userItemsProvider;
