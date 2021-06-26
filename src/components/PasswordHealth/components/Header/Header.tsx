import React, { FC } from 'react';
import { IItem } from '~/services/getUserItems';

import './header-style.scss';

interface IHeader {
  items: Array<IItem>;
  username: string;
  onLogout: () => void;
}

const Header: FC<IHeader> = ({ items, username, onLogout }) => (
  <div className="header">
    <div className="user-section">
      <button onClick={onLogout}>{`Logout ${username}`}</button>
    </div>
    <h1>{`${items.length} Items are vulnerable`}</h1>
    <span>Create new complex passwords to protect your accounts</span>
  </div>
);

export default Header;
