import type { Product } from "../types/Product";

const baseUrl = import.meta.env.VITE_BASE_URL;

const productsWithVideos: (Product & { video: string })[] = [
  {
    id: 1,
    name: "Cross Keychain with Blue Pebbles",
    price: "$18",
    image: `${baseUrl}images/product1.png`,
    video: `${baseUrl}videos/product_vid.mp4`,
    description:
      "A short showcase of one of the brand's most giftable resin keychains, reframed to match the storefront aesthetic.",
    category: "Keychain",
    discount: 10,
  },
  {
    id: 10,
    name: "Green Glitter Hoop Earrings",
    price: "$18",
    image: `${baseUrl}images/product10.png`,
    video: `${baseUrl}videos/product_vid.mp4`,
    description:
      "Studio-style motion preview for earrings that benefit from shimmer, texture, and closer visual storytelling.",
    category: "Earrings",
    discount: 20,
  },
  {
    id: 11,
    name: "Gold Star Chain Bracelet",
    price: "$19",
    image: `${baseUrl}images/product11.png`,
    video: `${baseUrl}videos/product_vid.mp4`,
    description:
      "A warmer, more premium bracelet feature that supports browsing and quick WhatsApp ordering from mobile.",
    category: "Bracelet",
    discount: 20,
  },
  {
    id: 14,
    name: "Feather Resin Art Piece",
    price: "$30",
    image: `${baseUrl}images/product14.png`,
    video: `${baseUrl}videos/product_vid.mp4`,
    description:
      "Decor-focused video card used to give statement pieces stronger presence and perceived value in the shop.",
    category: "Decor",
    discount: 25,
  },
];

export default productsWithVideos;
