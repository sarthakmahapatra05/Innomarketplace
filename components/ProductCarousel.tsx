"use client";

import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/data/products";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  onQuickView: (product: Product) => void;
  onViewMore?: (title: string) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onViewMore,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -460 : 460;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="relative w-full max-w-7xl mx-auto py-3 sm:py-5 px-3 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-xl font-bold text-zinc-900 tracking-tight flex items-center">
          <span>{title}</span>
        </h2>
        <button
          onClick={() => onViewMore && onViewMore(title)}
          className="flex items-center text-xs sm:text-sm font-bold text-[#a82046] hover:text-[#881534] transition-colors group"
        >
          <span>View more</span>
          <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="relative group/carousel">
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white/95 shadow-xl border border-zinc-200 items-center justify-center text-zinc-800 hover:bg-white hover:text-black z-20 opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-105"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white/95 shadow-xl border border-zinc-200 items-center justify-center text-zinc-800 hover:bg-white hover:text-black z-20 opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-105"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-start space-x-3 sm:space-x-5 overflow-x-auto no-scrollbar scroll-smooth pb-3 pt-1"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.has(product.id)}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
