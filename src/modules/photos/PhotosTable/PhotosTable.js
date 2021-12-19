import React from "react";
import PageLayout from "../../../shared/layouts/PageLayout/PageLayout";
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
import usePhotosTable from "./usePhotosTable";
import "./PhotosTable.css";

const PhotosTable = () => {
  const {
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
  } = usePhotosTable();

  return (
    <PageLayout>
      <PageLayout.Title>Photos</PageLayout.Title>
      <Paper ref={tableRef} className="table" sx={{ width: "66.6667%" }}>
        <TableContainer>
          <Table stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Album Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell width="150px">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagePhotos.map((photo) => (
                <TableRow
                  key={photo.id}
                  onClick={() => handleRowClick(photo.id)}
                >
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
                      className="photos-table__row-img"
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                    />
                  </TableCell>
                  <TableCell>
                    {!photo.editing && (
                      <Button
                        className="table__action-button"
                        variant="contained"
                        size="small"
                        onClick={(e) => handlePhotoEdit(e, photo.id)}
                      >
                        Edit
                      </Button>
                    )}
                    {photo.editing && (
                      <Button
                        className="table__action-button"
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
                      className="table__action-button"
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
    </PageLayout>
  );
};

export default PhotosTable;
