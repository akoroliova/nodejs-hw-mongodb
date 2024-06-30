import { sortOrderList } from '../constants/index.js';

const parseSortParams = ({ sortOrder, sortBy }, contactFieldList) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : 'asc';

  const parsedSortBy = contactFieldList.includes(sortBy) ? sortBy : 'name';

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parseSortParams;
