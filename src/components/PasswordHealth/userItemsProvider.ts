import { useCallback, useEffect, useState } from 'react';
import getUserItems, { IItem } from '~/services/getUserItems';
import updateItemApi from '~/services/updateItem';

type UserItems = {
  isLoading: boolean;
  errorMessage: string;
  items: IItem[];
  updateItem: (input: IItem) => void;
}

const userItemsProvider = (): UserItems => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [items, setItems] = useState<Array<IItem>>([]);

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
    (item: IItem) => void updateItemApi(item)
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
