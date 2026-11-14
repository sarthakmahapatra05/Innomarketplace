"use client";

import React from "react";
import {
  Home,
  Flame,
  LayoutGrid,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";

export type NavTab = "home" | "trends" | "categories" | "cart";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  wishlistCount,
  onOpenWishlist,
  onOpenProfile,
}) => {
  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md sm:max-w-lg md:max-w-xl pointer-events-auto">
      <nav className="backdrop-blur-xl bg-zinc-950/90 text-white rounded-full px-2 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/15">
        <button
          onClick={() => onTabChange("home")}
          className={`flex flex-col sm:flex-row items-center justify-center py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-full transition-all duration-200 active:scale-90 ${
            activeTab === "home"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Home"
        >
          <Home className="w-4 h-4 sm:w-4 sm:h-4 stroke-[2.2]" />
          <span className="text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-0 sm:ml-1.5 tracking-tight">
            Home
          </span>
        </button>

        <button
          onClick={() => onTabChange("trends")}
          className={`flex flex-col sm:flex-row items-center justify-center py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-full transition-all duration-200 active:scale-90 ${
            activeTab === "trends"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Trends"
        >
          <Flame className="w-4 h-4 sm:w-4 sm:h-4 stroke-[2.2]" />
          <span className="text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-0 sm:ml-1.5 tracking-tight">
            Trends
          </span>
        </button>

        <button
          onClick={() => onTabChange("categories")}
          className={`flex flex-col sm:flex-row items-center justify-center py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-full transition-all duration-200 active:scale-90 ${
            activeTab === "categories"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Categories"
        >
          <LayoutGrid className="w-4 h-4 sm:w-4 sm:h-4 stroke-[2.2]" />
          <span className="text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-0 sm:ml-1.5 tracking-tight">
            Categories
          </span>
        </button>

        <button
          onClick={onOpenWishlist}
          className="relative flex flex-col sm:flex-row items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className="w-4 h-4 sm:w-4 sm:h-4 stroke-[2.2]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold h-3.5 min-w-[14px] px-0.5 rounded-full flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="hidden sm:inline text-xs font-semibold ml-1.5 tracking-tight">
            Saved
          </span>
        </button>

        <button
          onClick={() => onTabChange("cart")}
          className={`relative flex flex-col sm:flex-row items-center justify-center py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-full transition-all duration-200 active:scale-90 ${
            activeTab === "cart"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
              : "text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4 sm:w-4 sm:h-4 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-amber-400 text-zinc-950 text-[9px] font-black h-3.5 min-w-[14px] px-0.5 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-0 sm:ml-1.5 tracking-tight">
            Cart
          </span>
        </button>

        <button
          onClick={onOpenProfile}
          className="flex flex-col sm:flex-row items-center justify-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
          aria-label="Account"
        >
          <User className="w-4 h-4 sm:w-4 sm:h-4 stroke-[2.2]" />
          <span className="hidden sm:inline text-xs font-semibold ml-1.5 tracking-tight">
            Profile
          </span>
        </button>
      </nav>
    </div>
  );
};
