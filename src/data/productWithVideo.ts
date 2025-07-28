// src/data/productsWithVideos.ts
import type { Product } from "../types/Product";

const productsWithVideos: (Product & { video: string; description: string })[] = [
  {
    id: 1,
    name: "iPhone 15",
    price: "$999",
    image: "../Public/images/product.jpg", // fallback image (optional)
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "Experience the latest iPhone 15 with stunning display, powerful A16 chip, and amazing camera features.",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: "$899",
    image: "../Public/images/product.jpg",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    description:
      "Samsung Galaxy S24 offers a sleek design, fast processor, and vibrant screen for an incredible mobile experience.",
  },
  {
    id: 3,
    name: "Google Pixel 8",
    price: "$799",
    image: "../Public/images/product.jpg",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    description:
      "Google Pixel 8 combines smooth Android experience with the best AI-powered camera technology.",
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: "$749",
    image: "../Public/images/product.jpg",
    video: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    description:
      "OnePlus 12 delivers blazing fast performance, long battery life, and a fluid user interface.",
  },
  {
    id: 5,
    name: "Sony Xperia 1 V",
    price: "$899",
    image: "../Public/images/product.jpg",
    video: "https://media.w3.org/2010/05/bunny/movie.mp4",
    description:
      "Sony Xperia 1 V offers pro-grade video recording and a stunning 4K OLED display for multimedia lovers.",
  },
  {
    id: 6,
    name: "Nothing Phone 2",
    price: "$699",
    image: "../Public/images/product.jpg",
    video: "https://media.w3.org/2010/05/video/movie_300.mp4",
    description:
      "Nothing Phone 2 features a unique design and smooth performance with OxygenOS.",
  },
];

export default productsWithVideos;
