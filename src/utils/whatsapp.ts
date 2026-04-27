type ProductItem = {
  id: number | string;
  name: string;
  price: string;
  quantity?: number;
  discount?: number;
};

const WHATSAPP_NUMBER = "+15197029537";

const getProductLink = (id: number | string) =>
  `${window.location.origin}${import.meta.env.VITE_BASE_URL}#/product/${id}`;

export function generateWhatsAppCartMessage(
  cartItems: ProductItem[],
  totalPrice: number,
  totalSaved: number
): string {
  const message = cartItems
    .map((item) => {
      const basePrice = Number(item.price.replace(/[^0-9.]/g, ""));
      const discountAmount = item.discount ? (basePrice * item.discount) / 100 : 0;
      const discountedPrice = basePrice - discountAmount;
      const quantity = item.quantity || 1;

      return `${item.name} (Qty: ${quantity}) - $${(discountedPrice * quantity).toFixed(
        2
      )}\nLink: ${getProductLink(item.id)}`;
    })
    .join("\n\n");

  return `Hello, I want to order:\n${message}\n\nCustomization notes: \n\nTotal: $${totalPrice.toFixed(2)}${
    totalSaved > 0 ? ` (You saved: $${totalSaved.toFixed(2)})` : ""
  }`;
}

export function generateWhatsAppBuyNowLink(
  product: ProductItem,
  quantity: number = 1
): string {
  const safeQuantity = quantity > 0 ? quantity : 1;
  const message = `Hi, I'm interested in buying or customizing: ${product.name} (Quantity: ${safeQuantity})\nCustomization notes: \nLink: ${getProductLink(product.id)}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
