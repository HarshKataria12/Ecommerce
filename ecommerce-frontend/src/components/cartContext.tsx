import React, { createContext, useContext, useState } from "react";

type CartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
  variantLabel?: string; // Optional label for the variant, e.g., "Red, Size M"
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (productId: string, variantId?: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void; //  New function type
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: string, variantId?: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item === existingItem ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { productId, variantId, quantity: 1 }];
    });
  };

  //  New function to remove items entirely
  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prevCart) => 
      prevCart.filter(item => !(item.productId === productId && item.variantId === variantId))
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}