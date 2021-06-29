import React from 'react';

interface IFilterTab {
  title: string;
  count: number;
  onClick: () => void;
  active?: boolean;
}

const FilterTab: React.FC<IFilterTab> = ({
  title,
  count,
  onClick,
  active,
}) => (
  <div
    className={`filter-tab${active ? ' filter-tab--active' : ''}`}
    onClick={onClick}>
    {`${title} (${count})`}
  </div>
);

export default FilterTab;
