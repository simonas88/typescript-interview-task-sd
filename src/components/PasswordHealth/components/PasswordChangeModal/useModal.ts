import { useCallback, useState } from 'react';
import { Item } from '~/types';

type ModalEffect = [
  selectedItem: Item,
  openModal: (i: Item) => void,
  closeModal: () => void
]

const usePasswordChangeModal = (item: Item | null): ModalEffect => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(item);
  const clearSelectedItem = useCallback(() => setSelectedItem(null), []);

  return [
    selectedItem,
    setSelectedItem,
    clearSelectedItem,
  ];
};

export default usePasswordChangeModal;
