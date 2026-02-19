import type { Product } from "../types/product";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

/**
 * Fetch all products
 * Optionally filter by category
 *
 * Examples:
 *  fetchProducts() → GET /products
 *  fetchProducts("Apparel") → GET /products?category=Apparel
 */
export async function fetchProducts(category?: string): Promise<Product[]> {
  // Build URL
  const url = new URL(`${API_BASE}/products`);

  // If category is provided and not "All", add query param
  if (category && category !== "All") {
    url.searchParams.set("category", category);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status})`);
  }

  const data: Product[] = await response.json();
  return data;
}
