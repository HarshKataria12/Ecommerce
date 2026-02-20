import * as React from "react";
import { useProducts } from "./hooks/useProducts";
import { ProductGrid } from "./components/ProductGrid";
import { useCart } from "./components/cartContext";
import styles from "./App.module.css";

const CATEGORIES = ["All", "Apparel", "Electronics", "Shoes", "Accessories"];

export default function App() {
  const [category, setCategory] = React.useState<string>("All");
  
  // 👈 State to control whether the cart dropdown is visible
  const [showCart, setShowCart] = React.useState<boolean>(false);
  
  const { products, loading, error } = useProducts(category);
  
  // 👈 Grab the cart, remove function, and count from Context
  const { cart, addToCart, removeFromCart, cartCount } = useCart(); 

  const handleAddToCart = (input: { productId: string; variantId?: string }) => {
    addToCart(input.productId, input.variantId); 
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.titleBlock}>
            <h1 className={styles.h1}>Product Listing</h1>
          </div>

          <div className={styles.controls}>
            {/* 👈 Cart Button that toggles the cart menu */}
            <div style={{ position: "relative" }}>
              <button 
                onClick={() => setShowCart(!showCart)}
                style={{ fontWeight: "bold", marginRight: "16px", padding: "8px 12px", cursor: "pointer" }}
              >
                🛒 Cart ({cartCount})
              </button>

              {/* 👈 The actual Cart Dropdown UI */}
              {showCart && (
                <div style={{
                  position: "absolute", top: "100%", right: "16px", width: "300px",
                  background: "white", border: "1px solid #ccc", borderRadius: "8px",
                  padding: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 100
                }}>
                  <h3>Your Cart</h3>
                  {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {cart.map((cartItem) => {
                        // 1. Find the matching product
                        const product = products.find(p => p.id === cartItem.productId);
                        if (!product) return null;

                        // 2. Find the exact variant the user selected (if any)
                        const variant = product.variants.find(v => v.id === cartItem.variantId);
                        
                        // 3. Format the price correctly
                        const formattedPrice = new Intl.NumberFormat(undefined, {
                          style: "currency",
                          currency: product.currency,
                        }).format(product.priceCents / 100);

                        return (
                          <li key={`${cartItem.productId}-${cartItem.variantId}`} style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                            <div>
                              <strong style={{ display: "block", fontSize: "14px" }}>{product.name}</strong> 
                              
                              {/* 👉 Show the Variant Label here! */}
                              {variant && (
                                <span style={{ fontSize: "12px", color: "#64748b", display: "block", marginTop: "2px" }}>
                                  Variant: {variant.label}
                                </span>
                              )}
                              
                              <span style={{ fontSize: "12px", fontWeight: "600", marginTop: "4px", display: "block" }}>
                                {formattedPrice} × {cartItem.quantity} = <strong>{new Intl.NumberFormat(undefined, { style: "currency", currency: product.currency }).format((product.priceCents * cartItem.quantity) / 100)}</strong>
                              </span>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(cartItem.productId, cartItem.variantId)}
                              style={{ background: "#ff4d4f", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", height: "32px", padding: "0 10px", alignSelf: "center", fontSize: "12px", fontWeight: "bold" }}
                            >
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>

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
        {loading && <div className={styles.stateBox}><div className={styles.stateTitle}>Loading products…</div></div>}
        {!loading && error && <div className={`${styles.stateBox} ${styles.stateError}`}><div className={styles.stateTitle}>Something went wrong</div><div className={styles.stateText}>{error}</div></div>}
        {!loading && !error && products.length === 0 && <div className={styles.stateBox}><div className={styles.stateTitle}>No products found</div></div>}
        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}