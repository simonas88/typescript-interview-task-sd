import React from 'react';

import './header-style.scss';

interface IHeader {
  vulnerableItems: number;
  username: string;
  onLogout: () => void;
}

const Header: React.FC<IHeader> = ({ vulnerableItems, username, onLogout }) => (
  <header className={`header${vulnerableItems > 0 ? ' header--warning' : ''}`}>
    <div className="user-section">
      <button onClick={onLogout}>{`Logout ${username}`}</button>
    </div>
    { vulnerableItems > 0 ? (
      <>
        <h1>{`${vulnerableItems} Items are vulnerable`}</h1>
        <span>Create new complex passwords to protect your accounts</span>
      </>
    ) : <h1>All items in order</h1> }
  </header>
);

export default Header;
