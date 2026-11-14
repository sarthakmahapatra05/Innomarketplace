"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Search,
  X,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { PRODUCTS_DATA, Product } from "@/data/products";

interface HeaderProps {
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  wishlistCount: number;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWishlist,
  onOpenCart,
  wishlistCount,
  cartCount,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onLogoClick,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? PRODUCTS_DATA.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const popularSearches = [
    "Diwali Kurtas",
    "Bodycon Dresses",
    "Men's Sweatshirts",
    "Tank Tops",
    "Hoodies",
    "Quarter-Zip Pullovers",
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#20082b]/95 backdrop-blur-md border-b border-purple-900/30 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 py-2.5 sm:py-3">
          <div
            onClick={onLogoClick}
            className="cursor-pointer shrink-0 flex items-center transition-transform hover:scale-105 active:scale-95"
          >
            <img
              src="/logo.png"
              alt="InnoMarket"
              className="h-8 sm:h-10 w-auto max-w-[130px] sm:max-w-[200px] object-contain"
            />
          </div>

          <div
            ref={searchContainerRef}
            className="relative flex-1 max-w-2xl mx-1 sm:mx-4"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search products, brands..."
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/50 text-xs sm:text-sm pl-8 sm:pl-9 pr-8 py-2 sm:py-2.5 rounded-full border border-white/20 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 p-1 rounded-full text-white/60 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white text-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchQuery.trim() === "" ? (
                  <div className="p-3 sm:p-4">
                    <div className="flex items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {popularSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSearchQuery(term);
                            setIsSearchFocused(false);
                          }}
                          className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-full transition-colors font-medium"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="divide-y divide-zinc-100 max-h-96 overflow-y-auto">
                    <div className="px-3.5 py-2 bg-zinc-50 text-[11px] font-bold text-zinc-500 uppercase">
                      Matching Products ({searchResults.length})
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          setIsSearchFocused(false);
                        }}
                        className="p-3 flex items-center space-x-3 hover:bg-rose-50/50 cursor-pointer transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-10 h-10 sm:w-11 sm:h-11 object-cover rounded-lg shrink-0 border border-zinc-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-900 truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            <span className="font-bold text-zinc-950">₹{product.price}</span>{" "}
                            <span className="line-through text-[11px] text-zinc-400">
                              ₹{product.originalPrice}
                            </span>{" "}
                            <span className="text-emerald-600 font-bold">
                              {product.discount}% OFF
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-500">
                    No products found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all text-white/90 hover:text-white"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart className="w-5 h-5 stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all text-white/90 hover:text-white"
              aria-label="Shopping Cart"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-extrabold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
