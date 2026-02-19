import * as React from "react";
import { useProducts } from "./hooks/useProducts";
import { ProductGrid } from "./components/ProductGrid";
import styles from "./App.module.css";

const CATEGORIES = ["All", "Apparel", "Electronics", "Shoes", "Accessories"];

export default function App() {
  const [category, setCategory] = React.useState<string>("All");
  const { products, loading, error } = useProducts(category);

  // Demo add-to-cart handler (just to prove the button works)
  const handleAddToCart = (input: { productId: string; variantId?: string }) => {
    console.log("Add to cart:", input);
    // later: connect to Cart Context or backend cart endpoint
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.titleBlock}>
            <h1 className={styles.h1}>Product Listing</h1>
            <p className={styles.sub}>
            
            </p>
          </div>

          <div className={styles.controls}>
            <label className={styles.filterLabel}>
              Category
              <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        {loading && (
          <div className={styles.stateBox}>
            <div className={styles.stateTitle}>Loading products…</div>
            <div className={styles.stateText}>
              Fetching the latest items. (Mock data demo)
            </div>
          </div>
        )}

        {!loading && error && (
          <div className={`${styles.stateBox} ${styles.stateError}`}>
            <div className={styles.stateTitle}>Something went wrong</div>
            <div className={styles.stateText}>{error}</div>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className={styles.stateBox}>
            <div className={styles.stateTitle}>No products found</div>
            <div className={styles.stateText}>
              Try selecting a different category.
            </div>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          
        </div>
      </footer>
    </div>
  );
}
