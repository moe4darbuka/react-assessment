import { useState, useEffect, useRef } from "react";
import usePaging from "../../../shared/paging/usePaging";
import { useOutsideClick, numberUtils } from "../../../shared/utils";
import { fetchPhotos } from "../photosApi";
import { PAGE_SIZE } from "../../../shared/paging/constants";

const usePhotosTable = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomized, setRandomized] = useState(true);
  const [randomizedRowIndex, setRandomizedRowIndex] = useState(null); // store the index of the row because its `id` changes

  const tableRef = useRef();

  const {
    pageNumber,
    pageFirstRowIndex,
    pageLastRowIndex,
    handlePageChange,
    getPageRows,
  } = usePaging({ totalRowsCount: photos.length });

  useOutsideClick(tableRef, () => {
    setRandomized((prevRandomized) => !prevRandomized);
    setRandomizedRowIndex(null);
  });

  const pagePhotos = getPageRows(photos);

  const handlePhotoEdit = (e, photoId) => {
    e.stopPropagation();

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

  const handlePhotoTitleChange = (e, photoId) => {
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

  const handlePhotoTitleClick = (e) => {
    e.stopPropagation(); // otherwise, clicking on the TextField would trigger `handleRowChange`, which would incorrectly toggle `randomizedRowIndex`
  };

  const handlePhotoEditDone = (e, photoId) => {
    e.stopPropagation();

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

  const handlePhotoDelete = (e, photoId) => {
    e.stopPropagation();

    const rowIndex = getRowIndex(photoId);
    if (rowIndex === randomizedRowIndex) setRandomizedRowIndex(null);

    const nextPhotos = photos.filter((photo) => photo.id !== photoId);
    setPhotos(nextPhotos);
  };

  const handleRowClick = (photoId) => {
    const rowIndex = getRowIndex(photoId);

    if (rowIndex !== randomizedRowIndex) {
      setRandomizedRowIndex(rowIndex);
    } else {
      setRandomized(true); // could be `false` if the user had stopped randomization for the entire table before toggling the row
      setRandomizedRowIndex(null);
    }
  };

  const getRowIndex = (photoId) => {
    const pagePhotoIds = pagePhotos.map((photo) => photo.id);
    return pageNumber * PAGE_SIZE + pagePhotoIds.indexOf(photoId);
  };

  useEffect(() => {
    fetchPhotos()
      .then((data) => {
        const nextPhotos = data.map((photo) => ({
          ...photo,
          editing: false,
          editedTitle: photo.title,
          editedTitleError: false,
        }));

        setPhotos(nextPhotos);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!randomized && randomizedRowIndex === null) return;

    const intervalId = setInterval(() => {
      const getNextPhotos = (prevPhotos) =>
        prevPhotos.map((photo, index) =>
          index >= pageFirstRowIndex &&
          index <= pageLastRowIndex &&
          (randomizedRowIndex === null || index === randomizedRowIndex)
            ? {
                ...photo,
                id: numberUtils.getRandomInteger(1, 1000000),
                albumId: numberUtils.getRandomInteger(1, 1000000),
              }
            : photo
        );

      setPhotos(getNextPhotos);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [randomized, randomizedRowIndex, pageFirstRowIndex, pageLastRowIndex]);

  return {
    tableRef,
    loading,
    error,
    pagePhotos,
    pageNumber,
    totalPhotosCount: photos.length,
    handlePageChange,
    handlePhotoEdit,
    handlePhotoTitleChange,
    handlePhotoTitleClick,
    handlePhotoEditDone,
    handlePhotoDelete,
    handleRowClick,
  };
};

export default usePhotosTable;
