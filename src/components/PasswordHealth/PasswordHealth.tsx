import React, { useCallback } from 'react';
import List from './components/List/List';
import useItemsProvider from './userItemsProvider';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import itemHasWeakPassword from '~/utils/itemHasWeakPassword';
import itemHasReusedPassword from '~/utils/itemHasReusedPassword';
import { useUserContext } from '../UserContext';
import { logout } from '~/services/authentication';
import itemHasOldPassword from '~/utils/itemHasOldPassword';

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

  const reusedPassFilter = useCallback((item) => itemHasReusedPassword(item, items), [items]);

  const handleLogout = async (): Promise<void> => {
    await logout();
    push(Routes.Login);
  };

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen/>;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage}/>;
  }

  const reusedPasswords = items.filter(reusedPassFilter);
  const weakPasswords = items.filter(itemHasWeakPassword);
  const oldPasswords = items.filter(itemHasOldPassword);

  const vulnerablePasswordCount = reusedPasswords.length + weakPasswords.length + oldPasswords.length;

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
