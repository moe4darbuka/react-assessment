import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import Paginator from "../../../shared/paging/Paginator";
import "./PhotosTable.css";

const PhotosTable = ({
  tableRef,
  pagePhotos,
  pageNumber,
  totalPhotosCount,
  handlePageChange,
  handlePhotoEdit,
  handlePhotoTitleChange,
  handlePhotoTitleClick,
  handlePhotoEditDone,
  handlePhotoDelete,
  handleRowClick,
}) => {
  return (
    <Paper ref={tableRef} className="photos-table__paper">
      <TableContainer className="photos-table__container">
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell width="120px">Id</TableCell>
              <TableCell width="120px">Album Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell width="150px">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagePhotos.map((photo) => (
              <TableRow key={photo.id} onClick={() => handleRowClick(photo.id)}>
                <TableCell>{photo.id}</TableCell>
                <TableCell>{photo.albumId}</TableCell>
                <TableCell>
                  {!photo.editing && photo.title}
                  {photo.editing && (
                    <TextField
                      autoFocus={true}
                      fullWidth={true}
                      size="small"
                      value={photo.editedTitle}
                      error={photo.editedTitleError}
                      onChange={(e) => handlePhotoTitleChange(e, photo.id)}
                      onClick={handlePhotoTitleClick}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <img
                    className="photos-table__img"
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                  />
                </TableCell>
                <TableCell>
                  {!photo.editing && (
                    <Button
                      className="photos-table__action"
                      variant="contained"
                      size="small"
                      onClick={(e) => handlePhotoEdit(e, photo.id)}
                    >
                      Edit
                    </Button>
                  )}
                  {photo.editing && (
                    <Button
                      className="photos-table__action"
                      variant="contained"
                      size="small"
                      color="success"
                      disabled={photo.editedTitleError}
                      onClick={(e) => handlePhotoEditDone(e, photo.id)}
                    >
                      Done
                    </Button>
                  )}
                  <Button
                    className="photos-table__action"
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={(e) => handlePhotoDelete(e, photo.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginator
        pageNumber={pageNumber}
        totalCount={totalPhotosCount}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
};

export default PhotosTable;
