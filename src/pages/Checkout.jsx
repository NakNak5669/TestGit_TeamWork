import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";
import "../styles/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Cambodia",
    note: "",
    payment: "card", // card | cod
    cardName: "",
    cardNumber: "",
    exp: "",
    cvc: "",
  });

  const [error, setError] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.product.price * it.qty, 0),
    [items]
  );

  const shipping = useMemo(() => (subtotal >= 100 ? 0 : items.length ? 5 : 0), [subtotal, items.length]);
  const tax = useMemo(() => (items.length ? subtotal * 0.0 : 0), [subtotal, items.length]); // UI only
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function validate() {
    if (!items.length) return "Cart is empty.";
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.phone.trim()) return "Phone is required.";
    if (!form.address.trim()) return "Address is required.";
    if (!form.city.trim()) return "City is required.";

    if (form.payment === "card") {
      if (!form.cardName.trim()) return "Card name is required.";
      if (!form.cardNumber.replace(/\s/g, "")) return "Card number is required.";
      if (!form.exp.trim()) return "Expiry is required.";
      if (!form.cvc.trim()) return "CVC is required.";
    }
    return "";
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) return setError(msg);

    // ✅ UI Only: simulate success
    console.log("CHECKOUT UI:", { form, items, subtotal, shipping, tax, total });

    clearCart();
    navigate("/?checkout=success");
  }

  if (!items.length) {
    return (
      <div className="container">
        <EmptyState
          title="Your cart is empty"
          subtitle="Add items before checkout."
          action={<Link to="/" className="btn btn-primary">Go shopping</Link>}
        />
      </div>
    );
  }

  return (
    <div className="container checkout">
      <div className="checkout-top">
        <div>
          <h1>Checkout</h1>
          <p className="muted">UI only. Later you will connect payment + order API.</p>
        </div>
        <Link to="/cart" className="btn btn-ghost">← Back to cart</Link>
      </div>

      <div className="checkout-layout">
        {/* Left: Form */}
        <section className="panel">
          <h3>Shipping details</h3>

          {error ? <div className="alert">{error}</div> : null}

          <form className="checkout-form" onSubmit={onSubmit}>
            <div className="grid2">
              <label className="field">
                <span className="muted">Full name</span>
                <input
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>

              <label className="field">
                <span className="muted">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
            </div>

            <div className="grid2">
              <label className="field">
                <span className="muted">Phone</span>
                <input
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="(+855) ..."
                  autoComplete="tel"
                />
              </label>

              <label className="field">
                <span className="muted">Country</span>
                <select
                  className="select"
                  value={form.country}
                  onChange={(e) => setField("country", e.target.value)}
                >
                  <option value="Cambodia">Cambodia</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Laos">Laos</option>
                </select>
              </label>
            </div>

            <label className="field">
              <span className="muted">Address</span>
              <input
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                placeholder="Street, house number..."
                autoComplete="street-address"
              />
            </label>

            <div className="grid2">
              <label className="field">
                <span className="muted">City</span>
                <input
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  placeholder="Phnom Penh"
                  autoComplete="address-level2"
                />
              </label>

              <label className="field">
                <span className="muted">Note (optional)</span>
                <input
                  value={form.note}
                  onChange={(e) => setField("note", e.target.value)}
                  placeholder="Leave a note for delivery..."
                />
              </label>
            </div>

            <h3 className="section-title">Payment</h3>

            <div className="payment">
              <button
                type="button"
                className={form.payment === "card" ? "paytab active" : "paytab"}
                onClick={() => setField("payment", "card")}
              >
                Card
              </button>
              <button
                type="button"
                className={form.payment === "cod" ? "paytab active" : "paytab"}
                onClick={() => setField("payment", "cod")}
              >
                Cash on delivery
              </button>
            </div>

            {form.payment === "card" ? (
              <div className="cardbox">
                <label className="field">
                  <span className="muted">Name on card</span>
                  <input
                    value={form.cardName}
                    onChange={(e) => setField("cardName", e.target.value)}
                    placeholder="Card holder"
                    autoComplete="cc-name"
                  />
                </label>

                <label className="field">
                  <span className="muted">Card number</span>
                  <input
                    value={form.cardNumber}
                    onChange={(e) => setField("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    autoComplete="cc-number"
                  />
                </label>

                <div className="grid2">
                  <label className="field">
                    <span className="muted">Expiry</span>
                    <input
                      value={form.exp}
                      onChange={(e) => setField("exp", e.target.value)}
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                    />
                  </label>

                  <label className="field">
                    <span className="muted">CVC</span>
                    <input
                      value={form.cvc}
                      onChange={(e) => setField("cvc", e.target.value)}
                      placeholder="123"
                      autoComplete="cc-csc"
                    />
                  </label>
                </div>

                <p className="muted tiny">
                  UI only: don’t enter real card info.
                </p>
              </div>
            ) : (
              <div className="codbox">
                <p className="muted">
                  You’ll pay when the order arrives. (UI only)
                </p>
              </div>
            )}

            <button className="btn btn-primary full" type="submit">
              Place order
            </button>
          </form>
        </section>

        {/* Right: Summary */}
        <aside className="panel summary">
          <h3>Order summary</h3>

          <div className="summary-items">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="sum-item">
                <img src={product.images?.[0]} alt={product.title} />
                <div className="sum-mid">
                  <div className="sum-title">{product.title}</div>
                  <div className="muted tiny">Qty: {qty}</div>
                </div>
                <div className="sum-price">
                  ${(product.price * qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="sum-row">
            <span className="muted">Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="sum-row">
            <span className="muted">Shipping</span>
            <strong>${shipping.toFixed(2)}</strong>
          </div>
          <div className="sum-row">
            <span className="muted">Tax</span>
            <strong>${tax.toFixed(2)}</strong>
          </div>
          <div className="divider" />
          <div className="sum-row big">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <div className="hint">
            Free shipping for orders ≥ <strong>$100</strong>.
          </div>
        </aside>
      </div>
    </div>
  );
}