import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
  const { push } = useHistory();
  const { pathname } = useLocation();
  const openAll = useCallback(() => push(Routes.PasswordHealth), []);
  const openWeak = useCallback(() => push(Routes.Weak), []);
  const openReused = useCallback(() => push(Routes.Reused), []);
  const openOld = useCallback(() => push(Routes.Old), []);

  return (
    <div className="filter">
      <FilterTab
        title="All"
        count={allItems}
        active={pathname === Routes.PasswordHealth}
        onClick={openAll} />
      <FilterTab
        title="Weak"
        count={weakItems}
        active={pathname === Routes.Weak}
        onClick={openWeak} />
      <FilterTab
        title="Reused"
        count={reusedItems}
        active={pathname === Routes.Reused}
        onClick={openReused} />
      <FilterTab
        title="Old"
        count={oldItems}
        active={pathname === Routes.Old}
        onClick={openOld} />
    </div>
  );
};

export default Filter;
