// src/lib/normalizeProduct.js

/**
 * normalizeProduct(p)
 * ✅ បំលែង (normalize) product ពី API → ទៅជា data ទម្រង់ស្តង់ដា សម្រាប់ UI
 *
 * ហេតុផល:
 * - UI មិន crash បើ field ខ្វះ (title/images/category/price)
 * - UI អាចប្រើ fields ដដែលៗជានិច្ច (stable shape)
 * - ពេល API ប្តូរ structure កែតែ file នេះមួយ
 */
export function normalizeProduct(p) {
  /**
   * ✅ Normalize images
   * - Array.isArray(...) = ពិនិត្យថា images ជា array មែនទេ
   * - filter(Boolean) = លុប values ខូចៗ ដូច null, undefined, ""
   * - បើ images មិនមែន array → ឲ [] (safe)
   */
  const images = Array.isArray(p?.images) ? p.images.filter(Boolean) : [];

  /**
   * ✅ Normalize category
   * API ខ្លះ category ជា string ("Shoes")
   * ខ្លះ category ជា object ({ name: "Shoes" })
   * ដូច្នេះយើងធ្វើឲ category ជា string ជានិច្ច
   */
  const categoryName =
    typeof p?.category === "string"
      ? p.category
      : p?.category?.name || "Unknown";

  /**
   * ✅ Fallback image
   * - បើ images ទទេ → ដាក់ fallback image 1 ទៅ avoid broken image
   */
  const safeImages =
    images.length > 0
      ? images
      : ["https://picsum.photos/seed/nakshop/800/800"];

  return {
    // ✅ id សម្រាប់ key និង route (/products/:id)
    id: p?.id,

    // ✅ បើ title ខ្វះ កុំឲ UI ទទេ
    title: p?.title || "Untitled",

    // ✅ បើ description ខ្វះ ឲ string ទទេ (safe)
    description: p?.description || "",

    // ✅ បំលែង price ទៅ number (ឲ .toFixed(2) មិន error)
    price: Number(p?.price || 0),

    // ✅ category ជា string ស្តង់ដា
    category: categoryName,

    // ✅ images ជា array ស្តង់ដា (មាន fallback)
    images: safeImages,

    /**
     * ✅ rating
     * Platzi API មិនសូវមាន rating → ដាក់ default 4 (demo)
     * (អ្នកអាចកែទៅ 0 ឬ remove field នេះក៏បាន)
     */
    rating: Number.isFinite(p?.rating) ? p.rating : 4,
  };
}