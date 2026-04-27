import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteFromCart, updateQuantity } from "../../store/slices/cartSlice";
import { generateWhatsAppCartMessage } from "../../utils/whatsapp";

const parsePrice = (priceStr: string): number =>
  Number(priceStr.replace(/[^0-9.-]+/g, ""));

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const basePrice = parsePrice(item.price);
    const discountedPrice = item.discount
      ? basePrice * (1 - item.discount / 100)
      : basePrice;
    return sum + discountedPrice * (item.quantity || 1);
  }, 0);

  const totalSaved = cartItems.reduce((sum, item) => {
    if (!item.discount) {
      return sum;
    }
    return sum + (parsePrice(item.price) * item.discount * (item.quantity || 1)) / 100;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="not-found-wrap">
        <div className="not-found-card">
          <h1 className="not-found-code">Cart</h1>
          <h2 className="section-title" style={{ fontSize: "2.5rem" }}>
            Your cart is empty.
          </h2>
          <p className="section-copy">
            The new storefront keeps the next step simple: head back to the
            collection and add the pieces that feel right.
          </p>
          <Button className="button-fill" onClick={() => navigate("/product-list")}>
            Start shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="page-hero-panel" style={{ marginBottom: "1.6rem" }}>
        <div className="page-hero-grid">
          <div>
            <span className="eyebrow">Checkout ready</span>
            <h1 className="page-title">A calmer cart that keeps buyers moving.</h1>
            <p className="page-copy" style={{ marginTop: "1rem", maxWidth: "36rem" }}>
              The cart now behaves like a final confidence screen: clear totals,
              cleaner quantities, and a direct WhatsApp order action with product links.
            </p>
          </div>
          <div className="page-summary">
            <div className="summary-chip">
              <span className="summary-chip-label">Items</span>
              <span className="summary-chip-value">{cartItems.length}</span>
            </div>
            <div className="summary-chip">
              <span className="summary-chip-label">Subtotal</span>
              <span className="summary-chip-value">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-chip">
              <span className="summary-chip-label">Savings</span>
              <span className="summary-chip-value">${totalSaved.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-layout">
        <div className="cart-list-panel cart-panel">
          <div className="cart-title-row">
            <div>
              <h2 className="cart-title">Your selected pieces</h2>
              <p className="cart-copy">
                Adjust quantities here before sending the order message.
              </p>
            </div>
            <Button className="button-quiet" onClick={() => navigate("/product-list")}>
              Continue shopping
            </Button>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => {
              const basePrice = parsePrice(item.price);
              const discountedPrice = item.discount
                ? basePrice * (1 - item.discount / 100)
                : basePrice;

              return (
                <article key={item.id} className="cart-item">
                  <img className="cart-item-image" src={item.image} alt={item.name} />

                  <div>
                    <h3 className="cart-item-title">{item.name}</h3>
                    <p className="cart-item-copy">
                      {item.discount ? (
                        <>
                          <strong>${discountedPrice.toFixed(2)}</strong>{" "}
                          <span className="price-original">Was {item.price}</span>
                          <span> each</span>
                        </>
                      ) : (
                        <strong>{item.price}</strong>
                      )}
                    </p>
                    {item.category ? (
                      <p className="cart-item-copy" style={{ marginTop: 6 }}>
                        Category: {item.category}
                      </p>
                    ) : null}
                  </div>

                  <div className="cart-item-actions">
                    <div className="stepper">
                      <Button
                        className="stepper-button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: (item.quantity || 1) - 1,
                            })
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="stepper-value">{item.quantity || 1}</span>
                      <Button
                        className="stepper-button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: (item.quantity || 1) + 1,
                            })
                          )
                        }
                      >
                        +
                      </Button>
                    </div>

                    <strong>${(discountedPrice * (item.quantity || 1)).toFixed(2)}</strong>

                    <Button
                      danger
                      type="text"
                      onClick={() => dispatch(deleteFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="summary-card">
          <h2 className="summary-title">Order summary</h2>
          <p className="summary-copy">
            Send the complete cart to WhatsApp with pricing and product links.
            Add any customization notes before sending.
          </p>

          <div className="custom-order-note">
            <strong>Need custom details?</strong>
            <span>
              Mention names, colors, initials, charms, flowers, glitter, or the
              occasion in WhatsApp and we will confirm what is possible.
            </span>
          </div>

          <div className="summary-list">
            <div className="summary-line">
              <span>Items total</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <div className="summary-line">
              <span>Discount savings</span>
              <strong>${totalSaved.toFixed(2)}</strong>
            </div>
            <div className="summary-line summary-line-highlight">
              <span>Estimated checkout total</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
          </div>

          {totalSaved > 0 ? <span className="saved-pill">You saved ${totalSaved.toFixed(2)}</span> : null}

          <div className="inline-actions" style={{ marginTop: "1.5rem" }}>
            <Button
              className="button-whatsapp"
              onClick={() => {
                const message = generateWhatsAppCartMessage(
                  cartItems,
                  totalPrice,
                  totalSaved
                );
                window.open(
                  `https://wa.me/+15197029537?text=${encodeURIComponent(message)}`,
                  "_blank"
                );
              }}
            >
              Customize or order
            </Button>
            <Button className="button-quiet" onClick={() => navigate("/about")}>
              Learn about the artist
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
