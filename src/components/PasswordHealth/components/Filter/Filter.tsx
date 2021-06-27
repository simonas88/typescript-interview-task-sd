import React from 'react';
import { Routes } from '~/constants';
import FilterTab from './components/FilterTab';

import './filter-style.scss';

interface IFilter {
  weakItems: number;
  reusedItems: number;
  oldItems: number;
}

const Filter: React.FC<IFilter> = ({
  weakItems,
  reusedItems,
  oldItems,
}) => (
  <div className="filter">
    <FilterTab title="Weak" count={weakItems} path={Routes.Weak}/>
    <FilterTab title="Reused" count={reusedItems} path={Routes.Reused}/>
    <FilterTab title="Old" count={oldItems} path={Routes.Old}/>
  </div>
);

export default Filter;
