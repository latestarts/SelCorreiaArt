import React from "react";
import { Card, Button } from "antd";
import type { Product } from "../../types/Product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../store/slices/cartSlice";

const { Meta } = Card;

interface Props {
  product: Product;
}

const VideoProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const incrementQuantity = () => {
    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
  };

  const decrementQuantity = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    }
  };

  const handleBuy = () => {
    const whatsappUrl = `https://wa.me/+15197029537?text=${encodeURIComponent(
      `Hi, I'm interested in buying: ${product.name} (Quantity: ${
        quantity || 1
      })`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        borderRadius: 10,
        marginBottom: 24,
        display: "flex",
        flexDirection: "column",
        minHeight: 380, // use minHeight instead of fixed height
        overflow: "hidden",
      }}
    >
      {product.video ? (
        <video
          src={product.video}
          autoPlay
          loop
          muted
          playsInline
          className="rounded-top"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            backgroundColor: "#000",
            borderRadius: "10px 10px 0 0",
            flexShrink: 0,
          }}
        />
      ) : (
        <img
          alt={product.name}
          src={product.image}
          className="img-fluid rounded-top"
          style={{
            height: 200,
            objectFit: "cover",
            borderRadius: "10px 10px 0 0",
            flexShrink: 0,
          }}
        />
      )}

      <div
        style={{
          flexGrow: 1,
          padding: "12px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Meta
          title={product.name}
          description={
            <>
              <div>{`Price: ${product.price}`}</div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  color: "#555",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.description}
              </div>
            </>
          }
        />
      </div>

      <div
        style={{
          paddingTop: 16,
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          height: 56,
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        {quantity === 0 ? (
          <Button
            type="primary"
            style={{ flex: 1, height: 40 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <>
            <Button style={{ height: 40 }} onClick={decrementQuantity}>
              −
            </Button>
            <span
              style={{
                minWidth: 24,
                textAlign: "center",
                display: "inline-block",
                lineHeight: "40px",
                userSelect: "none",
              }}
            >
              {quantity}
            </span>
            <Button style={{ height: 40 }} onClick={incrementQuantity}>
              +
            </Button>
          </>
        )}

        <Button
          type="default"
          style={{ flex: 1, height: 40 }}
          onClick={handleBuy}
        >
          Buy
        </Button>
      </div>
    </Card>
  );
};

export default VideoProductCard;
