const calcPaginationData = ({ total, page, perPage }) => {
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page !== totalPages;
  const hasPreviousPage = page !== 1;

  return {
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export default calcPaginationData;

// а якщо з фронта прийде page = 0?
