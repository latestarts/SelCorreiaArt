export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category?: string;
  material?: string;
  attachment?: string;
  color?: string;
  bgcolor?: string;
  video?: string;
  discount?: number; // percentage discount (e.g., 10 for 10%)
}
