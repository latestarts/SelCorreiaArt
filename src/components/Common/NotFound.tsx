// src/components/Common/NotFound.tsx
import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-3 text-danger">404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p className="text-muted mb-4">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Button type="primary" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFound;
