import { useState } from "react";

import { PAGE_SIZE } from "./constants";

const usePaging = (pageSize = PAGE_SIZE) => {
  const [pageNumber, setPageNumber] = useState(0);

  const handlePageChange = (e, nextPageNumber) => {
    setPageNumber(nextPageNumber);
  };

  const getPageRows = (rows) => {
    return pageSize > 0
      ? rows.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
      : rows;
  };

  return {
    pageNumber,
    handlePageChange,
    getPageRows,
  };
};

export default usePaging;
