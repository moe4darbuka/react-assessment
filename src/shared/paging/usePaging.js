import { useState } from "react";

import { PAGE_SIZE } from "./constants";

const usePaging = ({ pageSize = PAGE_SIZE, totalRowsCount }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const handlePageChange = (e, nextPageNumber) => {
    setPageNumber(nextPageNumber);
  };

  const getPageRows = (rows) => {
    return pageSize > 0
      ? rows.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
      : rows;
  };

  const lastPageNumber = Math.ceil(totalRowsCount / pageSize) - 1;

  const pageFirstRowIndex = pageNumber * pageSize;

  const pageLastRowIndex =
    pageNumber === lastPageNumber
      ? totalRowsCount - 1
      : pageFirstRowIndex + pageSize - 1;

  return {
    pageNumber,
    pageFirstRowIndex,
    pageLastRowIndex,
    handlePageChange,
    getPageRows,
  };
};

export default usePaging;
