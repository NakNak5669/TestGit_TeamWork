import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";
import "../styles/Cart.css";

export default function Cart() {
  const { items, removeFromCart, setQty, clearCart } = useCart();

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.product.price * it.qty, 0),
    [items],
  );

  if (items.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="Your cart is empty"
          subtitle="Add some products from home page."
          action={
            <Link to="/" className="btn btn-primary">
              Shop now
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="container cart">
      <h1>Cart</h1>

      <div className="cart-layout">
        <section className="cart-items">
          {items.map(({ product, qty }) => (
            <div className="cart-row" key={product.id}>
              <img
                className="cart-img"
                src={product.images?.[0]}
                alt={product.title}
              />
              <div className="cart-mid">
                <Link to={`/products/${product.id}`} className="cart-title">
                  {product.title}
                </Link>
                <div className="muted">${product.price.toFixed(2)}</div>

                <div className="qty">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setQty(product.id, qty - 1)}
                  >
                    -
                  </button>
                  <input
                    value={qty}
                    onChange={(e) =>
                      setQty(product.id, Number(e.target.value || 1))
                    }
                    aria-label="Quantity"
                  />
                  <button
                    className="btn btn-ghost"
                    onClick={() => setQty(product.id, qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-right">
                <div className="line-total">
                  ${(product.price * qty).toFixed(2)}
                </div>
                <button
                  className="btn btn-ghost danger"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </section>

        <aside className="summary">
          <h3>Summary</h3>
          <div className="sum-row">
            <span className="muted">Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="sum-row">
            <span className="muted">Shipping</span>
            <strong>$0.00</strong>
          </div>
          <div className="divider" />
          <div className="sum-row">
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <Link className="btn btn-primary full" to="/checkout">
            Checkout
          </Link>
          <button
            className="btn btn-ghost full"
            type="button"
            onClick={clearCart}
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
