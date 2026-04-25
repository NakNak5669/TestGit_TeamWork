export const mockCategories = [
  "All",
  "Clothes",
  "Electronics",
  "Shoes",
  "Furniture",
  "Misc",
];

export const mockProducts = Array.from({ length: 24 }).map((_, i) => {
  const id = i + 1;
  const category = ["Clothes", "Electronics", "Shoes", "Furniture", "Misc"][i % 5];
  const price = Math.round((10 + (i % 10) * 7 + i * 1.2) * 100) / 100;

  return {
    id,
    title: `Product ${id} — ${category}`,
    description:
      "This is a clean UI-first mock item. Later you will replace this with API data.",
    price,
    category,
    rating: (i % 5) + 1,
    images: [
      `https://picsum.photos/seed/nakshop-${id}/800/800`,
      `https://picsum.photos/seed/nakshop-${id}-2/800/800`,
    ],
  };
});