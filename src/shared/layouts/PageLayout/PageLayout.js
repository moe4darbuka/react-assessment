import React from "react";
import "./PageLayout.css";

const PageLayout = ({ children }) => {
  return <div className="page">{children}</div>;
};

PageLayout.Title = ({ children }) => {
  return <div className="page__title">{children}</div>;
};

export default PageLayout;
