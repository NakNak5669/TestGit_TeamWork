import React, { useState,useEffect,useMemo } from "react";
import { Link, useParams } from "react-router-dom";
// import { mockProducts } from "../data/mock";
import RatingStars from "../components/RatingStars";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetails.css";
import {getProductById} from "../api/products"
import { normalizeProduct } from "../lib/normalizeProduct";
import LoadingState from "../components/LoadingState";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [product,setProductDetail] = useState(null);

  useEffect(()=>{
    let alive = true;
    async function ProductDetail(){
      setLoading(true);
      setError("");
      setProductDetail(null);
      setActiveImage(0);
      try{
        const raw = await getProductById(id);
        console.log(raw)
        const normalized = normalizeProduct(raw);
        if(!alive)return;
        setProductDetail(normalized)
      }catch(e){
        if(!alive)return;
        setError(e?.message || "Failed to Load Product")
      }finally {
        if (!alive)
        setLoading(false);
      }
    }
    // ចឹងក៏បាន
    // ProductDetail()
    // តែនេះត្រឹមត្រូវជាង
     if (id) ProductDetail();
    return () => {
      alive = false;
    };
  },[id])



  const images = useMemo(() => product?.images || [], [product]);
  const mainImage = images.length ? images[Math.min(activeImage, images.length - 1)] : "";

  if (loading) return <LoadingState label="Loading product..." />;

  if (error) {
    return (
      <div className="container details">
        <Link to="/" className="back">← Back</Link>
        <EmptyState
          title="Failed to load product"
          subtitle={error}
          action={
            <Link className="btn btn-primary" to="/">
              Go home
            </Link>
          }
        />
      </div>
    );
  }




  if (!product) {
    return (
      <div className="container">
        <p className="muted">Product not found.</p>
        <Link className="btn" to="/">Go home</Link>
      </div>
    );
  }


  return (
    <div className="container details">
      <Link to="/" className="back">← Back</Link>

      <div className="details-card">
        <div className="gallery">
          <img
            className="main-img"
            src={mainImage}
            alt={product.title}
          />
          <div className="thumbs">
            {product.images?.map((src, idx) => (
              <button
                key={src}
                className={idx === activeImage ? "thumb active" : "thumb"}
                onClick={() => setActiveImage(idx)}
                type="button"
                aria-label={`View image ${idx + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="info">
          <span className="pill">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="rating-row">
            <RatingStars value={product.rating} />
            <span className="muted">{product.rating}/5</span>
          </div>

          <p className="muted">{product.description}</p>

          <div className="buy">
            <div className="price big">${product.price.toFixed(2)}</div>
            <button className="btn btn-primary" onClick={() => addToCart(product)}>
              Add to cart
            </button>
          </div>

          <div className="note">
            <strong>UI Tip:</strong> Later you will replace <code>mockProducts</code> with API data.
          </div>
        </div>
      </div>
    </div>
  );
}