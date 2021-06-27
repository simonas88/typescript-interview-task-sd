import { useCallback, useState } from 'react';

type ModalEffect = [
  showModal: boolean,
  openModal: () => void,
  closeModal: () => void
]

const useModal = (initialState: boolean): ModalEffect => {
  const [showModal, setShowModal] = useState(initialState);
  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return [
    showModal,
    openModal,
    closeModal,
  ];
};

export default useModal;
