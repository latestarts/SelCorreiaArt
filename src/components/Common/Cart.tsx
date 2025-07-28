// src/components/Cart.tsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button, InputNumber, List, Typography, Divider, Row, Col } from "antd";
import { deleteFromCart, updateQuantity } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const parsePrice = (priceStr: string): number => {
  return Number(priceStr.replace(/[^0-9.-]+/g, ""));
};

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    dispatch(deleteFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  // Calculate total price after discount if any
  const totalPrice = cartItems.reduce((sum, item) => {
    const basePrice = parsePrice(item.price);
    const discountAmount = item.discount
      ? (basePrice * item.discount) / 100
      : 0;
    const discountedPrice = basePrice - discountAmount;
    return sum + discountedPrice * (item.quantity || 1);
  }, 0);

  // Calculate total saved amount
  const totalSaved = cartItems.reduce((sum, item) => {
    if (!item.discount) return sum;
    const basePrice = parsePrice(item.price);
    const discountAmount = (basePrice * item.discount) / 100;
    return sum + discountAmount * (item.quantity || 1);
  }, 0);

  const handleWhatsAppOrder = () => {
    const message = cartItems
      .map((item) => {
        const basePrice = parsePrice(item.price);
        const discountAmount = item.discount
          ? (basePrice * item.discount) / 100
          : 0;
        const discountedPrice = basePrice - discountAmount;
        return `${item.name} (Qty: ${item.quantity || 1}) - $${(
          discountedPrice * (item.quantity || 1)
        ).toFixed(2)}\nLink: ${window.location.origin}/product/${item.id}`;
      })
      .join("\n\n");

    const fullMessage = `Hello, I want to order:\n${message}\n\nTotal: $${totalPrice.toFixed(
      2
    )} ${totalSaved > 0 ? `(You saved: $${totalSaved.toFixed(2)})` : ""}`;
    const whatsappUrl = `https://wa.me/+15197029537?text=${encodeURIComponent(
      fullMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 800, margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        🛒 Your Cart
      </Title>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Text>No products in cart.</Text>
          <br />
          <Button type="primary" onClick={() => navigate("/product-list")}>
            Start Shopping
          </Button>
        </div>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <InputNumber
                    min={1}
                    value={item.quantity || 1}
                    onChange={(value) =>
                      handleQuantityChange(item.id, value || 1)
                    }
                  />,
                  <Button danger onClick={() => handleRemove(item.id)}>
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  }
                  title={item.name}
                  description={`${item.price}${
                    item.discount ? ` (-${item.discount}%)` : ""
                  } x ${item.quantity || 1} = $${(
                    parsePrice(item.price) *
                    (1 - (item.discount || 0) / 100) *
                    (item.quantity || 1)
                  ).toFixed(2)}`}
                />
              </List.Item>
            )}
          />

          <Divider />

          <Row
            justify="space-between"
            align="middle"
            style={{ padding: "1rem" }}
          >
            <Col>
              <Text
                strong
                style={{
                  fontSize: "1.25rem",
                  backgroundColor: "#f0f9f1",
                  padding: "0.2rem 0.6rem",
                  borderRadius: 6,
                }}
              >
                Total: ${totalPrice.toFixed(2)}{" "}
                {totalSaved > 0 && (
                  <span
                    style={{
                      backgroundColor: "#d4edda",
                      color: "#155724",
                      padding: "0.2rem 0.5rem",
                      borderRadius: 4,
                      marginLeft: 8,
                      fontWeight: "normal",
                      fontSize: "1rem",
                    }}
                  >
                    (You saved: ${totalSaved.toFixed(2)})
                  </span>
                )}
              </Text>
            </Col>
            <Col>
              <Button type="primary" onClick={handleWhatsAppOrder}>
                Order via WhatsApp
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Cart;
