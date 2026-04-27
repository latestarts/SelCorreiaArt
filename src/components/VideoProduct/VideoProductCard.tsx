import React from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../../store/slices/cartSlice";
import { generateWhatsAppBuyNowLink } from "../../utils/whatsapp";

interface Props {
  product: Product;
}

const VideoProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const quantity = cartItem?.quantity ?? 0;

  return (
    <Card hoverable className="product-card">
      <div className="product-media">
        {product.video ? (
          <video src={product.video} autoPlay loop muted playsInline />
        ) : (
          <img src={product.image} alt={product.name} />
        )}
        <div className="product-overlay">
          <span className="pill pill-surface">Studio reel</span>
          {product.discount ? (
            <span className="pill pill-discount">Save {product.discount}%</span>
          ) : null}
        </div>
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">
          {product.description.length > 100
            ? `${product.description.slice(0, 100).trim()}...`
            : product.description}
        </p>
        <div className="price-stack price-stack-labeled" style={{ marginTop: "1rem" }}>
          <span className="price-current">{product.price}</span>
        </div>
      </div>

      <div className="product-footer">
        {quantity === 0 ? (
          <Button className="button-fill" onClick={() => dispatch(addToCart(product))}>
            Add to cart
          </Button>
        ) : (
          <div className="stepper">
            <Button
              className="stepper-button"
              onClick={() => {
                if (quantity === 1) {
                  dispatch(removeFromCart(product.id));
                  return;
                }
                dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
              }}
            >
              -
            </Button>
            <span className="stepper-value">{quantity}</span>
            <Button
              className="stepper-button"
              onClick={() =>
                dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))
              }
            >
              +
            </Button>
          </div>
        )}

        <div className="product-actions">
          <Button className="button-quiet" onClick={() => navigate(`/product/${product.id}`)}>
            View product
          </Button>
          <Button
            className="button-whatsapp"
            onClick={() => window.open(generateWhatsAppBuyNowLink(product, quantity || 1), "_blank")}
          >
            Buy now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoProductCard;
