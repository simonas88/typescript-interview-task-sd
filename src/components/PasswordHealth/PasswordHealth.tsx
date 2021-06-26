import React from 'react';
import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
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
  } = useItemsProvider();

  const handleLogout = (): void => {
    logout();
    push(Routes.Login);
  };

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen/>;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage}/>;
  }

  return (
    <div className="container">
      <Header
        items={items}
        username={username}
        onLogout={handleLogout} />
      <Filter items={items}/>
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items}/>
        </Route>
        <Route path={Routes.Weak}>
          <List items={items.filter(itemHasWeakPassword)}/>
        </Route>
        <Route path={Routes.Reused}>
          <List items={items.filter((item) => itemHasReusedPassword(item, items))}/>
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
