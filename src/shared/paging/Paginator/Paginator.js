import React from "react";
import TablePagination from "@mui/material/TablePagination";
import PaginatorActions from "./PaginatorActions";
import { PAGE_SIZE } from "../constants";

const Paginator = ({
  pageNumber,
  pageSize = PAGE_SIZE,
  pageSizeOptions = [],
  totalCount,
  onPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      page={pageNumber}
      rowsPerPage={pageSize}
      rowsPerPageOptions={pageSizeOptions}
      count={totalCount}
      ActionsComponent={PaginatorActions}
      onPageChange={onPageChange}
    />
  );
};

export default Paginator;
