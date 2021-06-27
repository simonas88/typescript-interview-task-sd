import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface IFilterTab {
  title: string;
  count: number;
  path: string;
  active?: boolean;
}

const FilterTab: FC<IFilterTab> = ({
  title,
  count,
  path,
  active,
}) => {
  const { push } = useHistory();

  return (
    <div className={`filter-tab${active ? ' filter-tab--active' : ''}`} onClick={() => push(path)}>
      {`${title} (${count})`}
    </div>
  );
};

export default FilterTab;
