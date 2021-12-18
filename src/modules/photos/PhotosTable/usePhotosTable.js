import { useEffect } from "react";
import usePaging from "../../../shared/paging/usePaging";
import { getPhotos } from "./photosApi";
import { useStateWithRef, getRandomInteger } from "../../../shared/utils";

const usePhotosTable = () => {
  const [photos, setPhotos, photosRef] = useStateWithRef([]);

  const {
    pageNumber,
    pageFirstRowIndex,
    pageLastRowIndex,
    handlePageChange,
    getPageRows,
  } = usePaging({ totalRowsCount: photos.length });

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextPhotos = photosRef.current.map((photo, index) =>
        index >= pageFirstRowIndex && index <= pageLastRowIndex
          ? {
              ...photo,
              id: getRandomInteger(1, 1000000),
              albumId: getRandomInteger(1, 1000000),
            }
          : photo
      );

      setPhotos(nextPhotos);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [photosRef, pageFirstRowIndex, pageLastRowIndex]);

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
