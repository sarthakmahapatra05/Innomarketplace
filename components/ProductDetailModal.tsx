"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  userPincode?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  userPincode = "201301",
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [pincodeInput, setPincodeInput] = useState(userPincode);
  const [pincodeVerified, setPincodeVerified] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const currentSizes = product.sizes || ["S", "M", "L", "XL"];
  const images = [
    product.image,
    product.secondaryImage || product.image,
  ];

  const handleCheckPincode = () => {
    if (pincodeInput.length === 6) {
      setPincodeVerified(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col sm:flex-row mt-auto sm:my-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-700 shadow-md backdrop-blur-md active:scale-90 transition-all"
          aria-label="Close details"
        >
          <X className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="sm:w-1/2 bg-zinc-100 relative h-72 sm:h-auto overflow-hidden">
          <img
            src={images[activeImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover"
          />

          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImageIndex === idx ? "w-6 bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="sm:w-1/2 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto max-h-[60vh] sm:max-h-none">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                  {product.section}
                </span>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-rose-600 transition-colors"
                  aria-label="Wishlist toggle"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </button>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-zinc-950 mt-1">
                {product.title}
              </h2>

              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-emerald-600 text-emerald-600 ml-1" />
                </div>
                <span className="text-xs text-zinc-400">
                  {product.reviewsCount.toLocaleString()} verified ratings
                </span>
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-zinc-950">
                ₹{product.price}
              </span>
              <span className="text-sm text-zinc-400 line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            </div>

            <div>
              <span className="block text-xs font-bold text-zinc-700 mb-2">
                Select Size
              </span>
              <div className="flex space-x-2">
                {currentSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all border ${
                      selectedSize === size
                        ? "border-[#a82046] bg-rose-50 text-[#a82046] ring-1 ring-[#a82046]"
                        : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="block text-xs font-bold text-zinc-700 mb-2">
                  Colors Available
                </span>
                <div className="flex space-x-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedColorIndex === idx
                          ? "ring-2 ring-offset-2 ring-[#a82046] scale-110"
                          : "border-zinc-300"
                      }`}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-700">Check Delivery</span>
                <span className="text-[11px] text-zinc-400">Doorstep delivery</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-[#a82046]"
                />
                <button
                  onClick={handleCheckPincode}
                  className="px-3 py-1.5 bg-zinc-900 text-white rounded-xl font-bold text-xs hover:bg-black"
                >
                  Check
                </button>
              </div>
              {pincodeVerified && (
                <div className="flex items-center text-[11px] text-emerald-700 font-semibold space-x-1 pt-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Free Express Delivery by tomorrow evening</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-500 pt-1">
              <div className="flex items-center space-x-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                <span>14 Days Return</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2.5 pt-4 mt-4 border-t border-zinc-100">
            <button
              onClick={() => {
                onAddToCart(product, selectedSize);
                onClose();
              }}
              className="flex-1 py-3 border-2 border-[#a82046] text-[#a82046] hover:bg-rose-50 active:scale-95 text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center space-x-1.5 transition-all"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => {
                onBuyNow(product, selectedSize);
                onClose();
              }}
              className="flex-1 py-3 bg-[#a82046] hover:bg-[#8e1739] active:scale-95 text-white text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center space-x-1.5 shadow-lg transition-all"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
