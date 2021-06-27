import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import FilterTab from './components/FilterTab';

import { Routes } from '~/constants';

import './filter-style.scss';

interface IFilter {
  allItems: number;
  weakItems: number;
  reusedItems: number;
  oldItems: number;
}

const Filter: React.FC<IFilter> = ({
  allItems,
  weakItems,
  reusedItems,
  oldItems,
}) => {
  const currentRoute = useLocation();
  const isActiveRoute = useCallback((route: Routes) => currentRoute.pathname === route, [currentRoute]);

  return (
    <div className="filter">
      <FilterTab
        title="All"
        count={allItems}
        active={isActiveRoute(Routes.PasswordHealth)}
        path={Routes.PasswordHealth}/>
      <FilterTab
        title="Weak"
        count={weakItems}
        active={isActiveRoute(Routes.Weak)}
        path={Routes.Weak}/>
      <FilterTab
        title="Reused"
        count={reusedItems}
        active={isActiveRoute(Routes.Reused)}
        path={Routes.Reused}/>
      <FilterTab
        title="Old"
        count={oldItems}
        active={isActiveRoute(Routes.Old)}
        path={Routes.Old}/>
    </div>
  );
};

export default Filter;
