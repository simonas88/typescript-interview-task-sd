import React, { FC, useCallback, useState } from 'react';
import { IItem } from '~/services/getUserItems';
import ItemIcon from './components/ItemIcon';
import Modal from 'react-modal';

import './list-style.scss';

interface IList {
  items: Array<IItem>;
  onUpdate: (item: IItem) => void;
}

interface IUpdateModal {
  item: IItem;
  onUpdate: (item: IItem) => void;
}

const UpdateModal: FC<IUpdateModal> = ({ item, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState('');
  
  const handleUpdate = useCallback(() => onUpdate({ ...item, password: newPass }), [item, newPass]);

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)} 
        />
        <div className="pt-12px text-center">
          <button className="button" onClick={handleUpdate}>Change</button>
          <button className="button ml-12px" onClick={() => {
            setNewPass('');
            setShowModal(false);
          }}>
            Cancel
          </button>
        </div>
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
