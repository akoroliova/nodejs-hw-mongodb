import { sortOrderList } from '../constants/index.js';

const parseSortParams = ({ sortOrder, sortBy }, contactFieldList) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];

  const parsedSortBy = contactFieldList.includes(sortBy)
    ? sortBy
    : contactFieldList[0];

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};

export default parseSortParams;
