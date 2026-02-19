import type { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    priceCents: 1999,
    currency: "EUR",
    category: "Apparel",
    inStock: true,
    variants: [
      { id: "v1", label: "S" },
      { id: "v2", label: "M" },
      { id: "v3", label: "L" },
    ],
  },
  {
    id: "2",
    name: "Running Sneakers",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    priceCents: 7999,
    currency: "EUR",
    category: "Shoes",
    inStock: false,
    variants: [
      { id: "v4", label: "40" },
      { id: "v5", label: "41" },
      { id: "v6", label: "42" },
    ],
  },
  {
    id: "3",
    name: "Wireless Headphones",
    imageUrl: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
    priceCents: 12999,
    currency: "EUR",
    category: "Electronics",
    inStock: true,
    variants: [
      { id: "v7", label: "Black" },
      { id: "v8", label: "White" },
    ],
  },
  {
    id: "4",
    name: "Leather Backpack",
    imageUrl: "https://images.unsplash.com/photo-1514477917009-389c76a86b68",
    priceCents: 5999,
    currency: "EUR",
    category: "Accessories",
    inStock: true,
    variants: [],
  },
];
