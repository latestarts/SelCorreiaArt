type ProductItem = {
  id: number | string;
  name: string;
  price: string;
  quantity?: number;
  discount?: number;
};

export function generateWhatsAppCartMessage(
  cartItems: ProductItem[],
  totalPrice: number,
  totalSaved: number
): string {
  const baseUrl = `${window.location.origin}/SelCorreiaArt/#`;

  const message = cartItems
    .map((item) => {
      const basePrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      const discountAmount = item.discount ? (basePrice * item.discount) / 100 : 0;
      const discountedPrice = basePrice - discountAmount;
      const qty = item.quantity || 1;

      return `${item.name} (Qty: ${qty}) - $${(discountedPrice * qty).toFixed(
        2
      )}\nLink: ${baseUrl}/product/${item.id}`;
    })
    .join("\n\n");

  return `Hello, I want to order:\n${message}\n\nTotal: $${totalPrice.toFixed(
    2
  )} ${totalSaved > 0 ? `(You saved: $${totalSaved.toFixed(2)})` : ""}`;
}

export function generateWhatsAppBuyNowLink(
  product: ProductItem,
  quantity: number = 1
): string {
  const baseUrl = `${window.location.origin}/SelCorreiaArt/#`;
  const message = `Hi, I'm interested in buying: ${product.name} (Quantity: ${quantity})\nLink: ${baseUrl}/product/${product.id}`;

  return `https://wa.me/+15197029537?text=${encodeURIComponent(message)}`;
}
