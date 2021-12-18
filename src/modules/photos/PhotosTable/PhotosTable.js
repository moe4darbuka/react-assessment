import React, { useState, useEffect } from "react";
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
import usePaging from "../../../shared/paging/usePaging";
import { getPhotos } from "./photosApi";
import "./PhotosTable.css";

const PhotosTable = () => {
  const [photos, setPhotos] = useState([]);
  const { pageNumber, handlePageChange, getPageRows } = usePaging();

  useEffect(() => {
    getPhotos().then((data) => {
      const nextPhotos = data.map((photo) => ({
        ...photo,
        editing: false,
        editedTitle: photo.title,
        editedTitleError: false,
      }));

      setPhotos(nextPhotos);
    });
  }, []);

  const pagePhotos = getPageRows(photos);

  const handlePhotoEdit = (photoId) => {
    const nextPhotos = photos.map((photo) =>
      photo.id === photoId
        ? {
            ...photo,
            editing: true,
          }
        : photo
    );

    setPhotos(nextPhotos);
  };

  const handlePhotoTitleChange = (photoId, e) => {
    const nextPhotos = photos.map((photo) =>
      photo.id === photoId
        ? {
            ...photo,
            editedTitle: e.target.value,
            editedTitleError: !e.target.value.trim(),
          }
        : photo
    );

    setPhotos(nextPhotos);
  };

  const handlePhotoEditDone = (photoId) => {
    const nextPhotos = photos.map((photo) =>
      photo.id === photoId
        ? {
            ...photo,
            editing: false,
            title: photo.editedTitle.trim(), // discard whitespace when committing the title
            editedTitle: photo.editedTitle.trim(),
          }
        : photo
    );

    setPhotos(nextPhotos);
  };

  const handlePhotoDelete = (photoId) => {
    const nextPhotos = photos.filter((photo) => photo.id !== photoId);
    setPhotos(nextPhotos);
  };

  return (
    <Paper className="table" sx={{ width: "66.6667%" }}>
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
              <TableRow key={photo.id}>
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
                      onChange={(e) => handlePhotoTitleChange(photo.id, e)}
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
                      onClick={() => handlePhotoEdit(photo.id)}
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
                      onClick={() => handlePhotoEditDone(photo.id)}
                    >
                      Done
                    </Button>
                  )}
                  <Button
                    className="table__action-button"
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handlePhotoDelete(photo.id)}
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
        totalCount={photos.length}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
};

export default PhotosTable;
