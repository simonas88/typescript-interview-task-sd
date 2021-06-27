import React from 'react';
import { Routes } from '~/constants';
import FilterTab from './components/FilterTab';

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
}) => (
  <div className="filter">
    <FilterTab title="All" count={allItems} path={Routes.PasswordHealth}/>
    <FilterTab title="Weak" count={weakItems} path={Routes.Weak}/>
    <FilterTab title="Reused" count={reusedItems} path={Routes.Reused}/>
    <FilterTab title="Old" count={oldItems} path={Routes.Old}/>
  </div>
);

export default Filter;
