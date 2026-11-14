"use client";

import React, { useState } from "react";
import { PRODUCTS_DATA, CATEGORY_CARDS, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface CategoriesViewProps {
  initialCategory: "ALL" | "ETHNIC" | "WESTERN" | "MEN";
  onAddToCart: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onQuickView: (product: Product) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  initialCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  const [activeFilter, setActiveFilter] = useState<"All" | "Ethnic" | "Western">(
    initialCategory === "ETHNIC" ? "Ethnic" : initialCategory === "WESTERN" ? "Western" : "All"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCards = CATEGORY_CARDS.filter((c) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Ethnic") return c.filter === "ETHNIC";
    if (activeFilter === "Western") return c.filter === "WESTERN" || c.filter === "MEN";
    return true;
  });

  const getProductsForCategory = (catId: string): Product[] => {
    switch (catId) {
      case "new-arrivals":
        return PRODUCTS_DATA.slice(0, 8);
      case "tops":
        return PRODUCTS_DATA.filter((p) => p.title.toLowerCase().includes("top") || p.title.toLowerCase().includes("tank"));
      case "dresses":
        return PRODUCTS_DATA.filter((p) => p.title.toLowerCase().includes("dress") || p.section === "Bodycon Dresses");
      case "trouser-sets":
        return PRODUCTS_DATA.filter((p) => p.category === "WESTERN");
      case "festive-ethnics":
        return PRODUCTS_DATA.filter((p) => p.category === "ETHNIC");
      case "mens-wear":
        return PRODUCTS_DATA.filter((p) => p.category === "MEN");
      default:
        return PRODUCTS_DATA;
    }
  };

  if (selectedCategory) {
    const products = getProductsForCategory(selectedCategory);
    const catName = CATEGORY_CARDS.find((c) => c.id === selectedCategory)?.name || "Products";
    
    return (
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 pb-24">
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-zinc-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">{catName}</h2>
          <span className="text-sm text-zinc-400">({products.length} items)</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.has(product.id)}
              onQuickView={onQuickView}
              isGridView
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#20082b] via-[#350f45] to-[#45145b]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-3">
        <div className="flex items-center justify-center space-x-3">
          {(["All", "Ethnic", "Western"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-white/20 text-white border border-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10 border border-transparent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredCards.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="category-card relative aspect-[4/3] rounded-xl overflow-hidden group"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg drop-shadow-lg">
                  {cat.name}
                </h3>
              </div>
              <div className="absolute inset-0 border-2 border-purple-400/0 group-hover:border-purple-400/60 rounded-xl transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
