"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, Plus, Star, Check } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
  isGridView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
  isGridView = false,
}) => {
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className={`group relative flex flex-col cursor-pointer select-none transition-all duration-200 ${
        isGridView
          ? "w-full"
          : "w-[145px] sm:w-[185px] md:w-[205px] lg:w-[220px] shrink-0"
      }`}
    >
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#f8f4f9] to-[#eee4f0] border border-purple-100/50 shadow-sm group-hover:shadow-md transition-shadow">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all duration-200 active:scale-75 ${
            isWishlisted
              ? "bg-rose-50 text-rose-600 shadow-sm"
              : "bg-white/80 hover:bg-white text-zinc-600 hover:text-rose-600"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isWishlisted ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {product.tag && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#250b31]/80 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide">
            {product.tag}
          </span>
        )}

        <button
          onClick={handleAddClick}
          className={`absolute bottom-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#a82046] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-90 transition-all duration-200 border border-rose-100/50 z-10 ${
            isAddedAnim ? "bg-rose-700 text-white scale-110 ring-2 ring-rose-400" : ""
          }`}
          aria-label="Add to cart"
        >
          {isAddedAnim ? (
            <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
          ) : (
            <div className="relative">
              <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
              <Plus className="w-2.5 h-2.5 absolute -top-1 -right-1 text-[#a82046] stroke-[3]" />
            </div>
          )}
        </button>
      </div>

      <div className="pt-2 px-0.5">
        <h3 className="text-xs font-medium text-zinc-800 line-clamp-1 group-hover:text-purple-900 transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center space-x-1.5 mt-1 flex-wrap">
          <span className="text-sm font-bold text-zinc-950">
            ₹{product.price}
          </span>
          <span className="text-[11px] text-zinc-400 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="text-[11px] font-bold text-emerald-600">
            {product.discount}% OFF
          </span>
        </div>

        <div className="flex items-center space-x-1 mt-1">
          <div className="flex items-center text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600 ml-0.5" />
          </div>
          <span className="text-[10px] text-zinc-400">
            ({product.reviewsCount.toLocaleString()})
          </span>
        </div>
      </div>
    </div>
  );
};
