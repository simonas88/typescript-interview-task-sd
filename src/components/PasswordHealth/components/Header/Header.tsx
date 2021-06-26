import React, { FC, Fragment } from 'react';
import { IItem } from '~/services/getUserItems';

import './header-style.scss';

interface IHeader {
  items: Array<IItem>;
  username: string;
  onLogout: () => void;
}

const Header: FC<IHeader> = ({ items, username, onLogout }) => (
  /* TODO: change to semantic HTML5 */
  <div className="header">
    <div className="user-section">
      <button onClick={onLogout}>{`Logout ${username}`}</button>
    </div>
    { items.length > 0 ? (
      <Fragment>
        <h1>{`${items.length} Items are vulnerable`}</h1>
        <span>Create new complex passwords to protect your accounts</span>
      </Fragment>
    ) : <h1>All items in order</h1> }
  </div>
);

export default Header;
