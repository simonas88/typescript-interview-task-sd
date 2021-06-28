import React, { FC, useCallback } from 'react';
import Modal from '~/components/Modal';
import ItemIcon from './components/ItemIcon';
import PasswordForm from '../PasswordForm/PasswordForm';
import useModal from './useModal';
import { Item } from '~/types';

import './list-style.scss';

interface IList {
  items: Array<Item>;
  onUpdate: (item: Item) => void;
}

interface IUpdateModal {
  item: Item;
  onUpdate: (item: Item) => void;
}

const UpdateModal: FC<IUpdateModal> = ({ item, onUpdate }) => {
  const [showModal, openModal, closeModal] = useModal(false);
  
  const handleUpdate = useCallback(
    (password: string) => {
      onUpdate({ ...item, password });
      closeModal();
    },
    [item],
  );

  return (
    <>
      <button className="update" onClick={openModal}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <PasswordForm
          onConfirm={handleUpdate}
          onCancel={closeModal} />
      </Modal>
    </>
  );
};

const List: FC<IList> = ({ items, onUpdate }) => (
  <ul className="list">
    {
      items.map((item) => (
        <li
          className="item"
          key={item.title}>
          <ItemIcon title={item.title}/>
          <div>
            <div className="title">
              {item.title}
            </div>
            <div className="description">
              {item.description}
            </div>
          </div>
          <UpdateModal item={item} onUpdate={onUpdate} />
        </li>
      ))
    }
  </ul>
);

export default List;
