import React from "react";
import { Button, Card } from "antd";
import { motion } from "framer-motion";
import type { Product } from "../../types/Product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { generateWhatsAppBuyNowLink } from "../../utils/whatsapp";

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

  const originalPrice = parsePrice(product.price);
  const discountedPrice = product.discount
    ? (originalPrice * (1 - product.discount / 100)).toFixed(2)
    : null;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleIncrement = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
  };

  const handleDecrement = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
      return;
    }
    dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
  };

  const handleBuy = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.open(generateWhatsAppBuyNowLink(product, quantity || 1), "_blank");
  };

  return (
    <motion.div
      className="product-card-motion"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card hoverable className="product-card">
        <button
          type="button"
          className="product-card-button"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="product-media">
            <img src={product.image} alt={product.name} />
            <div className="product-overlay">
              {product.category && <span className="pill pill-surface">{product.category}</span>}
              {product.discount ? (
                <span className="pill pill-discount">Save {product.discount}%</span>
              ) : null}
            </div>
          </div>

          <div className="product-content">
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">
              {product.description.length > 96
                ? `${product.description.slice(0, 96).trim()}...`
                : product.description}
            </p>

            <div className="product-meta-row">
              {product.material ? (
                <span className="product-meta">{product.material}</span>
              ) : null}
            </div>

            <div className="price-stack price-stack-labeled" style={{ marginTop: "1rem" }}>
              <span className="price-current">
                {discountedPrice ? `$${discountedPrice}` : product.price}
              </span>
              {discountedPrice ? (
                <span className="price-original">Was {product.price}</span>
              ) : null}
            </div>
          </div>
        </button>

        <div className="product-footer" onClick={(event) => event.stopPropagation()}>
          <div className="product-action-row">
            {quantity === 0 ? (
              <Button className="button-fill product-action-button" onClick={handleAddToCart}>
                Add to cart
              </Button>
            ) : (
              <div className="stepper product-action-button">
                <Button className="stepper-button" onClick={handleDecrement}>
                  -
                </Button>
                <span className="stepper-value">{quantity}</span>
                <Button className="stepper-button" onClick={handleIncrement}>
                  +
                </Button>
              </div>
            )}
            <Button className="button-quiet" onClick={() => navigate(`/product/${product.id}`)}>
              View details
            </Button>
          </div>
          <Button className="button-whatsapp product-buy-button" onClick={handleBuy}>
            Buy now
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
