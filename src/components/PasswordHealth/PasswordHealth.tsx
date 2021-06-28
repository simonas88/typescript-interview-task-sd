import React, { useCallback, useMemo } from 'react';
import List from './components/List/List';
import useItemsProvider from './userItemsProvider';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import { useUserContext } from '../UserContext';
import { logout } from '~/services/authentication';
import itemHasOldPassword from '~/utils/itemHasOldPassword';
import getRepeatValues from '~/utils/getRepeatValues';
import { IItem } from '~/services/getUserItems';

const PasswordHealth: React.FC = () => {
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
  const reusedPassFilter = useCallback((item: IItem) => reusedPasswordSet.has(item.password), [items]);

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
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} onUpdate={updateItem} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={weakPasswords} onUpdate={updateItem} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={reusedPasswords} onUpdate={updateItem} />
        </Route>
        <Route path={Routes.Old}>
          <List items={oldPasswords} onUpdate={updateItem} />
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
