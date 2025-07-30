import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/products";
import { Button, Space, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";
import { generateWhatsAppBuyNowLink } from "../../utils/whatsapp";

const colorNameToCss: Record<string, string> = {
  Blue: "#007bff",
  White: "#ffffff",
  Pink: "#ff69b4",
  Purple: "#800080",
  Black: "#000000",
  Green: "#28a745",
  Gold: "#ffd700",
  Silver: "#c0c0c0",
  Red: "#dc3545",
  Orange: "#fd7e14",
  Turquoise: "#40e0d0",
  Brown: "#8b4513",
  Clear: "transparent",
  Multi: "#999999",
  "Multi-Color": "#999999",
};

const multiColorPalette = ["Red", "Blue", "Green", "Orange", "Purple", "Pink"];

const getColorCss = (colorName: string) => {
  const key = colorName.trim().toLowerCase();
  return colorNameToCss[key] || key;
};

const isLightColor = (colorName: string) => {
  const key = colorName.trim().toLowerCase();
  return key === "white" || key === "clear" || key === "silver";
};

const parsePrice = (priceStr: string): number =>
  Number(priceStr.replace(/[^0-9.-]+/g, ""));

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product Not Found</h2>
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Products
        </Button>
      </div>
    );
  }

  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      dispatch(removeFromCart(product.id));
    }
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const whatsappUrl = generateWhatsAppBuyNowLink(product, quantity);
    window.open(whatsappUrl, "_blank");
  };

  const colors = product.color
    ? product.color.split(",").map((c) => c.trim())
    : [];

  const originalPrice = parsePrice(product.price);
  const discountedPrice = product.discount
    ? (originalPrice * (1 - product.discount / 100)).toFixed(2)
    : null;

  return (
    <div className="container py-4">
      <Button
        className="mb-4"
        onClick={() => navigate(-1)}
        style={{ borderRadius: 6 }}
      >
        ← Back
      </Button>

      <div className="row g-4">
        <div className="col-12 col-md-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow float-animate"
            style={{ maxHeight: 400, objectFit: "contain" }}
          />
        </div>

        <div className="col-12 col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <h4 className="text-primary mb-3">
            Price:{" "}
            {product.discount ? (
              <>
                <span
                  style={{ textDecoration: "line-through", marginRight: 8 }}
                >
                  {product.price}
                </span>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  ${discountedPrice}
                </span>
              </>
            ) : (
              product.price
            )}
          </h4>

          <div className="mb-3">
            {product.category && (
              <p className="mb-1">
                <strong>Category:</strong> {product.category}
              </p>
            )}

            {colors.length > 0 && (
              <div className="mb-2 d-flex align-items-center flex-wrap">
                <strong className="me-2">Colors:</strong>
                <div className="d-flex flex-wrap gap-2">
                  {colors.map((color, index) => {
                    const lowerColor = color.toLowerCase();
                    if (
                      lowerColor === "multi" ||
                      lowerColor === "multi-color"
                    ) {
                      return (
                        <Tooltip key={index} title="Multi-Color">
                          <div style={{ display: "flex", gap: 2 }}>
                            {multiColorPalette.map((mc, i) => (
                              <div
                                key={i}
                                style={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: "50%",
                                  backgroundColor: getColorCss(mc),
                                  border: isLightColor(mc)
                                    ? "1px solid #999"
                                    : "1px solid #ccc",
                                  cursor: "default",
                                }}
                              />
                            ))}
                          </div>
                        </Tooltip>
                      );
                    }

                    return (
                      <Tooltip
                        title={
                          color.charAt(0).toUpperCase() +
                          color.slice(1).toLowerCase()
                        }
                        key={index}
                      >
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            backgroundColor: getColorCss(color),
                            border: isLightColor(color)
                              ? "1px solid #999"
                              : "1px solid #ccc",
                            cursor: "default",
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            )}

            {product.material && (
              <p className="mb-1">
                <strong>Material:</strong> {product.material}
              </p>
            )}
            {product.attachment && (
              <p className="mb-1">
                <strong>Attachment:</strong> {product.attachment}
              </p>
            )}
          </div>

          <p className="text-muted">{product.description}</p>

          <Space size="middle" wrap className="mt-3">
            {quantity > 0 ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid #1890ff",
                  borderRadius: 6,
                  minWidth: 140,
                  justifyContent: "space-between",
                  padding: "0 10px",
                  height: 32,
                  cursor: "default",
                }}
              >
                <Button
                  size="small"
                  onClick={handleRemoveFromCart}
                  disabled={quantity === 0}
                  style={{ padding: "0 8px" }}
                >
                  −
                </Button>
                <span>{quantity}</span>
                <Button
                  size="small"
                  onClick={handleAddToCart}
                  style={{ padding: "0 8px" }}
                >
                  +
                </Button>
              </div>
            ) : (
              <Button
                type="primary"
                onClick={handleAddToCart}
                style={{ minWidth: 140 }}
              >
                Add to Cart
              </Button>
            )}

            <Button
              onClick={handleBuy}
              style={{
                minWidth: 140,
                backgroundColor: "#25D366",
                color: "white",
                border: "none",
              }}
            >
              Buy Now
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
