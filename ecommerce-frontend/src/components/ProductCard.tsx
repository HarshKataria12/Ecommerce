import * as React from "react";
import type { Product } from "../types/product";
import styles from "./ProductCard.module.css";

type Props = {
  product: Product;
  onAddToCart?: (input: { productId: string; variantId?: string }) => void;
};

export function ProductCard({ product, onAddToCart }: Props) {
  const [variantId, setVariantId] = React.useState<string | undefined>(
    product.variants[0]?.id
  );

  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);

  const isOutOfStock = !product.inStock;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
        />

        {isOutOfStock && <span className={styles.badge}>Out of Stock</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <h3 className={styles.title} title={product.name}>
            {product.name}
          </h3>
          <span className={styles.category}>{product.category}</span>
        </div>

        <p className={styles.price}>{formattedPrice}</p>

        {product.variants.length > 0 ? (
          <label className={styles.label}>
            Variant
            <select
              className={styles.select}
              value={variantId ?? ""}
              onChange={(e) => setVariantId(e.target.value || undefined)}
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <div className={styles.variantLabel}>No variants</div>
        )}

        <button
          className={styles.button}
          disabled={isOutOfStock}
          onClick={() => onAddToCart?.({ productId: product.id, variantId })}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
