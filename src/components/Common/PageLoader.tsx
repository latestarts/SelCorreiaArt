import React from "react";
import { Spin } from "antd";

const loaderStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(255,255,255,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  borderRadius: "8px",
};

const PageLoader: React.FC = () => {
  return (
    <div style={loaderStyle}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default PageLoader;
