import { useState, useEffect } from "react";
import usePaging from "../../../shared/paging/usePaging";
import { getPhotos } from "./photosApi";

const usePhotosTable = () => {
  const [photos, setPhotos] = useState([]);
  const { pageNumber, handlePageChange, getPageRows } = usePaging();

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

  return {
    pagePhotos: getPageRows(photos),
    pageNumber,
    totalPhotosCount: photos.length,
    handlePageChange,
    handlePhotoEdit,
    handlePhotoTitleChange,
    handlePhotoEditDone,
    handlePhotoDelete,
  };
};

export default usePhotosTable;
