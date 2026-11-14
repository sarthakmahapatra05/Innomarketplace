"use client";

import React from "react";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Product } from "@/data/products";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                My Wishlist ({wishlistedProducts.length})
              </h2>
              <p className="text-xs text-zinc-500">
                Saved items you love
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-zinc-700"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <Heart className="w-12 h-12 mx-auto text-zinc-300 stroke-1 mb-2" />
              <p className="text-sm font-semibold">Your wishlist is empty</p>
              <p className="text-xs text-zinc-400 mt-1">
                Explore items and tap the heart icon to save them
              </p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-center space-x-3"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-16 h-20 object-cover rounded-xl shrink-0 border border-zinc-200"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 truncate">
                    {p.title}
                  </h4>
                  <div className="flex items-center space-x-1.5 mt-1 text-xs">
                    <span className="font-extrabold text-zinc-950">₹{p.price}</span>
                    <span className="text-[11px] text-zinc-400 line-through">
                      ₹{p.originalPrice}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600">
                      {p.discount}% OFF
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => {
                        onMoveToCart(p);
                        onRemoveFromWishlist(p);
                      }}
                      className="px-3 py-1 bg-[#a82046] hover:bg-[#8e1739] text-white text-xs font-bold rounded-lg flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(p)}
                      className="p-1 text-zinc-400 hover:text-rose-600"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-zinc-100 bg-zinc-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-xl active:scale-95 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
