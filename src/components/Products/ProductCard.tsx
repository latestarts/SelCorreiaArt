import React from "react";
import { Card, Button, Typography } from "antd";
import type { Product } from "../../types/Product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

interface Props {
  product: Product;
}

const parsePrice = (priceStr: string): number =>
  Number(priceStr.replace(/[^0-9.-]+/g, ""));

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const quantity = cartItem?.quantity ?? 0;

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    }
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const whatsappUrl = `https://wa.me/+15197029537?text=${encodeURIComponent(
      `Hi, I'm interested in buying: ${product.name} (Quantity: ${
        quantity || 1
      })\nLink: ${productUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const originalPrice = parsePrice(product.price);
  const discountedPrice = product.discount
    ? (originalPrice * (1 - product.discount / 100)).toFixed(2)
    : null;

  return (
    <Card
      hoverable
      style={{ width: "100%", borderRadius: 10 }}
      bodyStyle={{ padding: 0 }}
    >
      <div onClick={handleNavigate} style={{ cursor: "pointer" }}>
        <img
          alt={product.name}
          src={product.image}
          className="img-fluid rounded-top"
          style={{ height: 200, objectFit: "cover", width: "100%" }}
        />
        <div style={{ padding: "16px" }}>
          <Meta
            title={product.name}
            description={
              product.discount ? (
                <span>
                  <Text delete style={{ marginRight: 8 }}>
                    {product.price}
                  </Text>
                  <Text strong style={{ color: "red" }}>
                    ${discountedPrice}
                  </Text>
                </span>
              ) : (
                <Text strong>{product.price}</Text>
              )
            }
          />
        </div>
      </div>

      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {quantity === 0 ? (
          <Button
            type="primary"
            block
            onClick={handleAddToCart}
            style={{ flex: 1 }}
          >
            Add to Cart
          </Button>
        ) : (
          <>
            <Button onClick={decrementQuantity}>−</Button>
            <span
              style={{
                minWidth: 24,
                textAlign: "center",
                display: "inline-block",
              }}
            >
              {quantity}
            </span>
            <Button onClick={incrementQuantity}>+</Button>
          </>
        )}

        <Button
          block
          onClick={handleBuy}
          style={{ flex: 1, marginLeft: "auto" }}
        >
          Buy
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
