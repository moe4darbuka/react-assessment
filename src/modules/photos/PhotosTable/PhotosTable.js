import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paginator from "../../../shared/paging/Paginator";
import usePaging from "../../../shared/paging/usePaging";
import { getPhotos } from "./photosApi";
import "./PhotosTable.css";

const PhotosTable = () => {
  const [photos, setPhotos] = useState([]);
  const { pageNumber, handlePageChange, getPageRows } = usePaging();

  useEffect(() => {
    getPhotos().then((response) => setPhotos(response));
  }, []);

  const pagePhotos = getPageRows(photos);

  return (
    <Paper className="table" sx={{ width: "66.6667%" }}>
      <TableContainer>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell width="20%">Id</TableCell>
              <TableCell width="20%">Album Id</TableCell>
              <TableCell width="40%">Title</TableCell>
              <TableCell width="20%">Thumbnail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagePhotos.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.albumId}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <img
                    className="photos-table__row-img"
                    src={row.thumbnailUrl}
                    alt={row.title}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginator
        pageNumber={pageNumber}
        totalCount={photos.length}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
};

export default PhotosTable;
