import React from "react";
import PhotosTable from "./modules/photos/PhotosTable";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1 className="app__title">Photos</h1>
      <PhotosTable />
    </div>
  );
};

export default App;
