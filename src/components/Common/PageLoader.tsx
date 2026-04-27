import React from "react";
import { Spin } from "antd";

const PageLoader: React.FC = () => {
  return (
    <div className="page-loader">
      <div className="page-loader-panel">
        <Spin size="large" />
        <div className="section-copy">Loading the collection...</div>
      </div>
    </div>
  );
};

export default PageLoader;
