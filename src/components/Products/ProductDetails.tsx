import React from "react";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import products from "../../data/products";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart, updateQuantity } from "../../store/slices/cartSlice";
import { generateWhatsAppBuyNowLink } from "../../utils/whatsapp";

const colorNameToCss: Record<string, string> = {
  blue: "#2f71cf",
  white: "#ffffff",
  pink: "#de7aa2",
  purple: "#7f58af",
  black: "#1f1a17",
  green: "#577c56",
  gold: "#cda86d",
  silver: "#c5c8cf",
  red: "#b84e43",
  orange: "#d78446",
  turquoise: "#4aa8ac",
  brown: "#8b5c44",
  clear: "transparent",
  multi: "#999999",
  "multi-color": "#999999",
};

const multiColorPalette = ["Red", "Blue", "Green", "Orange", "Purple", "Pink"];

const parsePrice = (priceStr: string): number =>
  Number(priceStr.replace(/[^0-9.-]+/g, ""));

const getColorCss = (colorName: string) => {
  const key = colorName.trim().toLowerCase();
  return colorNameToCss[key] || key;
};

const isLightColor = (colorName: string) => {
  const key = colorName.trim().toLowerCase();
  return key === "white" || key === "clear" || key === "silver";
};

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = products.find((item) => item.id.toString() === productId);
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id.toString() === productId)
  );
  const quantity = cartItem?.quantity ?? 0;

  if (!product) {
    return (
      <div className="not-found-wrap">
        <div className="not-found-card">
          <h1 className="not-found-code">Oops</h1>
          <h2 className="section-title" style={{ fontSize: "2.4rem" }}>
            Product not found
          </h2>
          <p className="section-copy">
            This item may have moved, but the rest of the collection is still ready to browse.
          </p>
          <Button className="button-fill" onClick={() => navigate("/product-list")}>
            Back to the shop
          </Button>
        </div>
      </div>
    );
  }

  const colors = product.color ? product.color.split(",").map((color) => color.trim()) : [];
  const originalPrice = parsePrice(product.price);
  const discountedPrice = product.discount
    ? (originalPrice * (1 - product.discount / 100)).toFixed(2)
    : null;

  return (
    <section>
      <div className="detail-back">
        <Button className="button-quiet" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="detail-layout">
        <div className="detail-media-card detail-panel">
          <div className="detail-image-frame">
            <img
              src={product.image}
              alt={product.name}
              className="float-animate"
            />
          </div>
        </div>

        <div className="detail-info-card detail-panel">
          <div className="detail-header">
            <div>
              {product.category ? <span className="eyebrow">{product.category}</span> : null}
              <h1 className="page-title" style={{ fontSize: "3.4rem" }}>
                {product.name}
              </h1>
            </div>
            {product.discount ? <span className="pill pill-discount">Save {product.discount}%</span> : null}
          </div>

          <div className="price-stack price-stack-labeled" style={{ marginTop: "1rem" }}>
            <span className="price-current">
              {discountedPrice ? `$${discountedPrice}` : product.price}
            </span>
            {discountedPrice ? <span className="price-original">Was {product.price}</span> : null}
          </div>

          <p className="detail-copy" style={{ marginTop: "1.2rem" }}>
            {product.description}
          </p>

          <div className="detail-spec-grid">
            {colors.length > 0 ? (
              <div className="detail-spec">
                <span className="detail-spec-label">Colors</span>
                <div className="detail-spec-value">
                  <div className="swatch-row">
                    {colors.map((color) => {
                      const lowerColor = color.toLowerCase();
                      if (lowerColor === "multi" || lowerColor === "multi-color") {
                        return (
                          <div key={color} className="swatch-row" title="Multi-color">
                            {multiColorPalette.map((paletteColor) => (
                              <span
                                key={paletteColor}
                                className="color-swatch"
                                style={{
                                  width: 18,
                                  height: 18,
                                  backgroundColor: getColorCss(paletteColor),
                                  borderColor: isLightColor(paletteColor)
                                    ? "rgba(77, 53, 42, 0.2)"
                                    : undefined,
                                }}
                              />
                            ))}
                          </div>
                        );
                      }

                      return (
                        <span
                          key={color}
                          className="color-swatch"
                          title={color}
                          style={{
                            backgroundColor: getColorCss(color),
                            borderColor: isLightColor(color)
                              ? "rgba(77, 53, 42, 0.2)"
                              : undefined,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {product.material ? (
              <div className="detail-spec">
                <span className="detail-spec-label">Material</span>
                <span className="detail-spec-value">{product.material}</span>
              </div>
            ) : null}

            {product.attachment ? (
              <div className="detail-spec">
                <span className="detail-spec-label">Attachment</span>
                <span className="detail-spec-value">{product.attachment}</span>
              </div>
            ) : null}

            <div className="detail-spec">
              <span className="detail-spec-label">Crafted for</span>
              <span className="detail-spec-value">
                Thoughtful gifts, personal keepsakes, and custom conversations.
              </span>
            </div>

            <div className="detail-spec custom-detail-spec">
              <span className="detail-spec-label">Customize</span>
              <span className="detail-spec-value">
                Ask for a different color palette, name, initial, charm, flower
                detail, glitter style, or gift theme before ordering.
              </span>
            </div>
          </div>

          <div className="detail-action-bar">
            {quantity > 0 ? (
              <div className="stepper">
                <Button
                  className="stepper-button"
                  onClick={() =>
                    dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))
                  }
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
            ) : (
              <Button className="button-fill" onClick={() => dispatch(addToCart(product))}>
                Add to cart
              </Button>
            )}

            <Button
              className="button-whatsapp"
              onClick={() =>
                window.open(generateWhatsAppBuyNowLink(product, quantity || 1), "_blank")
              }
            >
              Customize or order
            </Button>

            <Button className="button-quiet" onClick={() => navigate("/product-list")}>
              Continue browsing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
