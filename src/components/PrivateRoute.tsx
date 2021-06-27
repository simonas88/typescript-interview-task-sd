import React, { FC } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import { isLoggedIn } from '~/services/authentication';

const PrivateRoute: FC<RouteProps> = ({
  path,
  component,
}) => {
  const { push } = useHistory();

  if (!isLoggedIn()) {
    push(Routes.Login);
  }

  return <Route path={path} component={component}/>;
};

export default PrivateRoute;
