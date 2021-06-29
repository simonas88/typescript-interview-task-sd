import React, { FC } from 'react';
import ItemIcon from './components/ItemIcon';
import { Item } from '~/types';

import './list-style.scss';

interface IList {
  items: Array<Item>;
  onUpdate: (item: Item) => void;
}

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
          <button className="update" onClick={() => onUpdate(item)}>
            Update Password
          </button>
        </li>
      ))
    }
  </ul>
);

export default List;
