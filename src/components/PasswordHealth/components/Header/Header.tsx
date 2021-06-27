import React, { FC, Fragment } from 'react';

import './header-style.scss';
interface IHeader {
  vulnerableItems: number;
  username: string;
  onLogout: () => void;
}

const Header: FC<IHeader> = ({ vulnerableItems, username, onLogout }) => (
  <div className={`header${vulnerableItems > 0 ? ' header--warning' : ''}`}>
    <div className="user-section">
      <button onClick={onLogout}>{`Logout ${username}`}</button>
    </div>
    { vulnerableItems > 0 ? (
      <Fragment>
        <h1>{`${vulnerableItems} Items are vulnerable`}</h1>
        <span>Create new complex passwords to protect your accounts</span>
      </Fragment>
    ) : <h1>All items in order</h1> }
  </div>
);

export default Header;
