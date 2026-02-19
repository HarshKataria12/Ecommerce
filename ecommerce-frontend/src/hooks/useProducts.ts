import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { mockProducts } from "../data/mockProducts";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(category: string): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // simulate API delay
    const timer = setTimeout(() => {
      if (category === "All") {
        setProducts(mockProducts);
      } else {
        setProducts(mockProducts.filter(p => p.category === category));
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category]);

  return { products, loading, error };
}
