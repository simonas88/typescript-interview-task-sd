import React, { FC } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import { isLoggedIn } from '~/services/authentication';

const PublicRoute: FC<RouteProps> = ({
  path,
  component,
}) => {
  const { push } = useHistory();

  if (isLoggedIn()) {
    push(Routes.PasswordHealth);
  }

  return <Route path={path} component={component}/>;
};

export default PublicRoute;
