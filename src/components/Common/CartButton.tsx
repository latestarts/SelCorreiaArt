import React from "react";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const FloatingCartButton: React.FC = () => {
  const navigate = useNavigate();
  const cartCount = useAppSelector((state) => state.cart.items.length);

  return (
    <div
      className="floating-cart"
      onClick={() => navigate("/cart")}
      role="button"
      tabIndex={0}
      aria-label="Go to cart"
    >
      <Badge count={cartCount} size="small" offset={[-2, 2]}>
        <ShoppingCartOutlined />
      </Badge>
    </div>
  );
};

export default FloatingCartButton;
