import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-wrap">
      <div className="not-found-card">
        <h1 className="not-found-code">404</h1>
        <h2 className="section-title" style={{ fontSize: "2.5rem" }}>
          This page slipped out of the gallery.
        </h2>
        <p className="section-copy">
          Head back to the storefront and keep the shopping experience moving.
        </p>
        <Button className="button-fill" onClick={() => navigate("/")}>
          Return home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
