import React from "react";
import PageLayout from "../../shared/layouts/PageLayout";
import { Alert, LinearProgress } from "@mui/material";
import PhotosTable from "./PhotosTable";
import usePhotosTable from "./PhotosTable/usePhotosTable";

const PhotosPage = () => {
  const {
    tableRef,
    loading,
    error,
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
      {loading && <LinearProgress className="page__linear-progress" />}
      {error && (
        <Alert severity="error" className="page__alert">
          Something went wrong.
        </Alert>
      )}
      <PhotosTable
        tableRef={tableRef}
        pagePhotos={pagePhotos}
        pageNumber={pageNumber}
        totalPhotosCount={totalPhotosCount}
        handlePageChange={handlePageChange}
        handlePhotoEdit={handlePhotoEdit}
        handlePhotoTitleChange={handlePhotoTitleChange}
        handlePhotoTitleClick={handlePhotoTitleClick}
        handlePhotoEditDone={handlePhotoEditDone}
        handlePhotoDelete={handlePhotoDelete}
        handleRowClick={handleRowClick}
      />
    </PageLayout>
  );
};

export default PhotosPage;
