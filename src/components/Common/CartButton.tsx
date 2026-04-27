import React from "react";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const FloatingCartButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useAppSelector((state) => state.cart.items.length);

  if (location.pathname === "/cart") {
    return null;
  }

  return (
    <button
      type="button"
      className="floating-cart"
      onClick={() => navigate("/cart")}
      aria-label="Go to cart"
    >
      <Badge count={cartCount} size="small" offset={[-1, 5]}>
        <ShoppingCartOutlined />
      </Badge>
    </button>
  );
};

export default FloatingCartButton;
