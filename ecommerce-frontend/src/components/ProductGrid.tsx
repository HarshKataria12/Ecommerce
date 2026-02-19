import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";
import styles from "./ProductGrid.module.css";

type Props = {
  products: Product[];
  onAddToCart?: (input: { productId: string; variantId?: string }) => void;
};

export function ProductGrid({ products, onAddToCart }: Props) {
  return (
    <section className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}
