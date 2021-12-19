import React from "react";
import TablePagination from "@mui/material/TablePagination";
import PaginatorActions from "./PaginatorActions";
import { PAGE_SIZE } from "../constants";

// I created this "proxy" component for a couple of reasons:
//   1. pagination UI isn't only required by <Table />, and I didn't like
//        the fact that it was called <TablePagination />
//   2. the functionality of <TablePagination /> is extended by the custom <PaginatorActions />,
//        and I didn't want the consumer to import both <TablePagination /> and <PaginationActions />
//        each time.

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
