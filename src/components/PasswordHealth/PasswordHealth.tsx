import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import List from './components/List/List';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import PasswordChangeModal from './components/PasswordChangeModal/PasswordChangeModal';
import usePasswordChangeModal from './components/PasswordChangeModal/useModal';
import ErrorBlock from '../ErrorBlock';
import LoadingScreen from '../LoadingScreen';
import useItemsProvider from './userItemsProvider';
import { UserContextProvider, useUserContext } from '../UserContext';
import { logout } from '~/services/authentication';
import { Item } from '~/types';
import { Routes } from '~/constants';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import itemHasOldPassword from '~/utils/itemHasOldPassword';
import getRepeatValues from '~/utils/getRepeatValues';

const PasswordHealth: React.FC = () => {
  const [selectedItem, openModal, closeModal] = usePasswordChangeModal(null);
  
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const { push } = useHistory();

  const {
    items,
    isLoading,
    errorMessage,
    updateItem,
  } = useItemsProvider();

  const reusedPasswordSet = useMemo(() => getRepeatValues(items, i => i.password), [items]);
  const reusedPassFilter = useCallback((item: Item) => reusedPasswordSet.has(item.password), [items]);

  const reusedPasswords = useMemo(() => items.filter(reusedPassFilter), [items]);
  const weakPasswords = useMemo(() => items.filter(itemHasWeakPassword), [items]);
  const oldPasswords = useMemo(() => items.filter(itemHasOldPassword), [items]);

  const vulnerablePasswordCount = reusedPasswords.length + weakPasswords.length + oldPasswords.length;

  const handleLogout = useCallback(async (): Promise<void> => {
    await logout();
    push(Routes.Login);
  }, []);

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen/>;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage}/>;
  }

  return (
    <div className="container">
      <Header
        vulnerableItems={vulnerablePasswordCount}
        username={username}
        onLogout={handleLogout} />
      <Filter
        allItems={items.length}
        weakItems={weakPasswords.length}
        reusedItems={reusedPasswords.length}
        oldItems={oldPasswords.length} />
      <PasswordChangeModal
        item={selectedItem}
        onChange={updateItem}
        onClose={closeModal} />
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} onUpdate={openModal} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={weakPasswords} onUpdate={openModal} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={reusedPasswords} onUpdate={openModal} />
        </Route>
        <Route path={Routes.Old}>
          <List items={oldPasswords} onUpdate={openModal} />
        </Route>
      </Switch>
    </div>
  );
};

const PasswordHealthWithContext: React.FC = () => (
  <UserContextProvider>
    <PasswordHealth />
  </UserContextProvider>
);

export default PasswordHealthWithContext;
