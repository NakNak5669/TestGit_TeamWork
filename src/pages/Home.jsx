// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getCategories } from "../api/categories";
import { getProducts } from "../api/products";
import { normalizeProduct } from "../lib/normalizeProduct";

import ProductCard from "../components/ProductCard";
import CategoryChips from "../components/CategoryChips";
import PriceRange from "../components/PriceRange";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import { useCart } from "../context/CartContext";
import "../styles/Home.css";

export default function Home() {
  const { addToCart } = useCart();
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") || "").trim();

  // UI filters
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  // API states
  const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);

  // Loading/Error states
  const [loadingCats, setLoadingCats] = useState(false);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");

  // 1) Fetch categories (run once){standard react}
  // useEffect(() => {
  //   let alive = true;
  //   async function loadCats() {
  //     setLoadingCats(true);
  //     try {
  //       const data = await getCategories();
  //       if (!alive) return;
  //       setCats(Array.isArray(data) ? data : []);
  //     } catch (e) {
  //       // categories error: show in console only (UI can still work)
  //       console.error("Categories error:", e);
  //     } finally {
  //       if (!alive) return;
  //       setLoadingCats(false);
  //     }
  //   }

  //   loadCats();
  //   return () => {
  //     alive = false;
  //   };
  // }, []);
useEffect(()=>{
  let alive = true;
  async function Category(){
    try{
      const res = await getCategories();
      if(!alive)return;
      setCats(res)
    }catch(e){
      console.error("Category error:",e)
    }finally{
      if(!alive) return;
    }
  }
  Category();
  return ()=>{
    alive = false;
  }
},[])

  // 2) Fetch products (run once)
  useEffect(() => {
    let alive = true;

    async function loadProducts() {
      setLoadingProducts(true);
      setError("");
      try {
        const data = await getProducts(); // should return array
        const normalized = Array.isArray(data) ? data.map(normalizeProduct) : [];
        if (!alive) return;
        setProducts(normalized);
        // learning: see raw + normalized
        console.log("Products raw:", data);
        console.log("Products normalized:", normalized);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Failed to load products");
      } finally {
        if (!alive) return;
        setLoadingProducts(false);
      }
    }

    loadProducts();
    return () => {
      alive = false;
    };
  }, []);

  // 3) Build category labels (strings only) for CategoryChips
  const categoryLabels = ["All", ...cats.map((c) => c?.name).filter(Boolean)];

  // 4) Filter + sort (NO useMemo)
  let filtered = [...products];

  // search by title/category
  if (q) {
    const qq = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        String(p.title).toLowerCase().includes(qq) ||
        String(p.category).toLowerCase().includes(qq)
    );
  }

  // category
  if (category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // price
  filtered = filtered.filter((p) => Number(p.price) <= Number(maxPrice));

  // sort
  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  // 5) Pagination (NO useMemo)
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  // keep page in range when filters reduce results
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  function resetFilters() {
    setCategory("All");
    setMaxPrice(200);
    setSort("featured");
    setPage(1);
    setParams((prev) => {
      prev.delete("q");
      return prev;
    });
  }

  // Loading / Error UI
  if (loadingProducts) return <LoadingState label="Loading products..." />;

  if (error) {
    return (
      <div className="container" style={{ padding: "18px 0" }}>
        <EmptyState
          title="Failed to load products"
          subtitle={error}
          action={
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Reload
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container home">
      <section className="hero">
        <div>
          <h1>UI First Shop</h1>
          <p className="muted">Fetch with useEffect + useState (no useMemo yet)</p>
        </div>
        <button className="btn" onClick={resetFilters}>
          Reset
        </button>
      </section>

      <div className="layout">
        <aside className="sidebar">
          <div className="panel">
            <h3>Categories</h3>
            <CategoryChips
              categories={categoryLabels}
              value={category}
              onChange={(c) => {
                setCategory(c);
                setPage(1);
              }}
            />
            {loadingCats ? (
              <p className="muted" style={{ marginTop: 10, fontSize: 12 }}>
                Loading categories...
              </p>
            ) : null}
          </div>

          <div className="panel">
            <h3>Price</h3>
            <PriceRange
              min={0}
              max={200}
              value={maxPrice}
              onChange={(v) => {
                setMaxPrice(v);
                setPage(1);
              }}
            />
          </div>

          <div className="panel">
            <h3>Sort</h3>
            <select
              className="select"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top rating</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
            </select>
          </div>

          {q ? (
            <div className="panel info">
              <div className="muted">Search</div>
              <strong className="mono">"{q}"</strong>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setParams((prev) => {
                    prev.delete("q");
                    return prev;
                  });
                  setPage(1);
                }}
              >
                Clear search
              </button>
            </div>
          ) : null}
        </aside>

        <section className="content">
          <div className="content-top">
            <div>
              <strong>{filtered.length}</strong> items
            </div>

            <div className="pager">
              <button
                className="btn btn-ghost"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>

              <span className="muted">
                Page <strong>{safePage}</strong> / {totalPages}
              </span>

              <button
                className="btn btn-ghost"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>

          {paged.length === 0 ? (
            <EmptyState
              title="No products found"
              subtitle="Try changing filters or reset."
              action={
                <button className="btn" onClick={resetFilters}>
                  Reset
                </button>
              }
            />
          ) : (
            <div className="grid">
              {paged.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}