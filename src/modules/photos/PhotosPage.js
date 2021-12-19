import React from "react";
import PageLayout from "../../shared/layouts/PageLayout";
import PhotosTable from "./PhotosTable";
import usePhotosTable from "./PhotosTable/usePhotosTable";

const PhotosPage = () => {
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
