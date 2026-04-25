import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ product, qty }]

  const cartCount = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items]
  );

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const found = prev.find((x) => x.product.id === product.id);
      if (found) {
        return prev.map((x) =>
          x.product.id === product.id ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [...prev, { product, qty }];
    });
  }

  function removeFromCart(productId) {
    setItems((prev) => prev.filter((x) => x.product.id !== productId));
  }

  function setQty(productId, qty) {
    setItems((prev) =>
      prev
        .map((x) => (x.product.id === productId ? { ...x, qty } : x))
        .filter((x) => x.qty > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(
    () => ({ items, cartCount, addToCart, removeFromCart, setQty, clearCart }),
    [items, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}