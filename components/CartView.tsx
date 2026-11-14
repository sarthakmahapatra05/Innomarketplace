"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  Search,
  Trash2,
  Plus,
  Minus,
  Tag,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  onOpenSearch: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onProceedToCheckout,
  onOpenSearch,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const totalMRP = items.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const mrpDiscount = totalMRP - subtotal;
  const isFreeDelivery = subtotal >= 499 || items.length === 0;
  const deliveryFee = isFreeDelivery ? 0 : 49;
  const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);
  const totalSavings = mrpDiscount + couponDiscount + (isFreeDelivery ? 49 : 0);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError("");

    if (code === "DIWALI50") {
      const discount = Math.min(500, Math.round(subtotal * 0.5));
      setCouponDiscount(discount);
      setAppliedCoupon("DIWALI50");
      setCouponCode("");
    } else if (code === "FESTIVE20") {
      const discount = Math.round(subtotal * 0.2);
      setCouponDiscount(discount);
      setAppliedCoupon("FESTIVE20");
      setCouponCode("");
    } else if (code === "WELCOME100") {
      setCouponDiscount(100);
      setAppliedCoupon("WELCOME100");
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon. Try DIWALI50 or FESTIVE20");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponError("");
  };

  return (
    <div className="w-full min-h-screen bg-[#faf8fc] pb-28 select-none">
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <button
            onClick={onContinueShopping}
            className="flex items-center space-x-1.5 p-1 rounded-xl hover:bg-zinc-100 active:scale-95 transition-all text-zinc-900 group"
            aria-label="Back to shopping"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2] group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-bold hidden sm:inline text-zinc-600 group-hover:text-zinc-950">
              Continue Shopping
            </span>
          </button>

          <h1 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight flex items-center">
            <ShoppingBag className="w-4 h-4 mr-2 text-[#a82046]" />
            Shopping Bag {items.length > 0 && `(${items.reduce((s, i) => s + i.quantity, 0)})`}
          </h1>

          <button
            onClick={onOpenSearch}
            className="p-1.5 rounded-full hover:bg-zinc-100 active:scale-95 transition-colors text-zinc-800"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 pt-16 sm:pt-24 text-center max-w-md mx-auto">
          <div className="w-52 h-52 sm:w-64 sm:h-64 mb-6 relative">
            <img
              src="/images/cat_empty_cart.png"
              alt="Cart is empty"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://illustrations.popertee.com/empty-cart.png";
              }}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mb-2">
            Cart is empty
          </h2>

          <p className="text-sm text-zinc-600 mb-8 max-w-xs leading-relaxed">
            Looks like you haven&apos;t added anything yet
          </p>

          <button
            onClick={onContinueShopping}
            className="w-full sm:w-auto px-10 py-3.5 bg-[#a82046] hover:bg-[#8e1739] active:scale-95 text-white font-bold text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-3.5 sm:p-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-200/80 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
                  {isFreeDelivery ? (
                    <span className="text-xs sm:text-sm font-semibold text-amber-950">
                      Yay! You unlocked <strong className="text-emerald-700">FREE Express Delivery</strong>!
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm text-amber-900">
                      Add <strong>₹{499 - subtotal}</strong> more for <strong>FREE Delivery</strong>
                    </span>
                  )}
                </div>
                {isFreeDelivery && (
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                    Saved ₹49
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1">
                  Items in Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>

                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="p-3.5 sm:p-4 bg-white rounded-3xl border border-zinc-200 shadow-sm flex items-start space-x-3 sm:space-x-4 transition-all hover:shadow-md"
                  >
                    <div className="w-20 h-24 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-100">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between h-24 sm:h-32">
                      <div>
                        <h3 className="text-xs sm:text-base font-bold text-zinc-900 line-clamp-1">
                          {item.product.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">
                          Size: <span className="font-bold text-zinc-800">{item.size}</span>
                          {" • "}
                          <span className="text-emerald-700 font-semibold">In Stock</span>
                        </p>

                        <div className="flex items-center space-x-1.5 sm:space-x-2 mt-1 sm:mt-2">
                          <span className="text-sm sm:text-lg font-extrabold text-zinc-950">
                            ₹{item.product.price * item.quantity}
                          </span>
                          <span className="text-[11px] sm:text-xs text-zinc-400 line-through">
                            ₹{item.product.originalPrice * item.quantity}
                          </span>
                          <span className="text-[10px] sm:text-xs font-bold text-emerald-600">
                            {item.product.discount}% OFF
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-zinc-100">
                        <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 p-0.5">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.size, -1)
                            }
                            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-zinc-600 hover:text-zinc-950 active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                          <span className="w-7 sm:w-8 text-center text-xs font-bold text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.size, 1)
                            }
                            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-zinc-600 hover:text-zinc-950 active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center space-x-1 text-xs font-semibold"
                          aria-label="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white rounded-3xl border border-zinc-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-zinc-800 flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-[#a82046]" />
                    Coupons &amp; Offers
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs">
                    <div className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <div>
                        <span className="font-bold text-emerald-900">{appliedCoupon}</span> applied!
                        <p className="text-[11px] text-emerald-700">
                          You saved ₹{couponDiscount} extra on this order
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs font-bold text-rose-600 hover:underline px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter Promo Code (e.g. DIWALI50)"
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm uppercase bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-[#a82046] focus:bg-white transition-colors"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#a82046] hover:bg-[#8e1739] text-white text-xs sm:text-sm font-bold rounded-2xl active:scale-95 transition-all shadow-md"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-xs text-rose-600 font-medium">{couponError}</p>
                )}

                {!appliedCoupon && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { code: "DIWALI50", desc: "50% OFF up to ₹500" },
                      { code: "FESTIVE20", desc: "20% OFF on all" },
                    ].map((c) => (
                      <button
                        key={c.code}
                        onClick={() => handleApplyCoupon(c.code)}
                        className="text-xs bg-rose-50/60 hover:bg-rose-50 border border-dashed border-rose-300 text-rose-800 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors flex items-center space-x-1.5"
                      >
                        <span className="font-bold">{c.code}</span>
                        <span className="text-zinc-500 text-[11px]">({c.desc})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 lg:sticky lg:top-20 space-y-4">
              <div className="p-4 sm:p-5 bg-white rounded-3xl border border-zinc-200 shadow-md space-y-3 text-xs sm:text-sm">
                <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-wider border-b border-zinc-100 pb-3">
                  Order Summary ({items.length} {items.length === 1 ? "Item" : "Items"})
                </h3>

                <div className="flex justify-between text-zinc-600">
                  <span>Total MRP</span>
                  <span className="text-zinc-900 font-semibold">₹{totalMRP}</span>
                </div>

                <div className="flex justify-between text-emerald-600">
                  <span>Discount on MRP</span>
                  <span className="font-semibold">-₹{mrpDiscount}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span className="font-semibold">-₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Fee</span>
                  {isFreeDelivery ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span className="text-zinc-900 font-semibold">₹{deliveryFee}</span>
                  )}
                </div>

                <div className="border-t border-zinc-100 pt-3 flex justify-between text-base font-black text-zinc-950">
                  <span>Total Amount</span>
                  <span>₹{finalTotal}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="py-2 px-3 bg-emerald-50 rounded-xl text-emerald-800 font-bold text-center text-xs flex items-center justify-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>You save ₹{totalSavings} on this order!</span>
                  </div>
                )}

                <button
                  onClick={onProceedToCheckout}
                  className="w-full mt-4 flex items-center justify-center space-x-2 py-3.5 bg-[#a82046] hover:bg-[#8e1739] active:scale-95 text-white font-bold text-sm rounded-2xl shadow-xl transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-xs text-zinc-400 py-1">
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600" />
                  100% Secure Checkout
                </span>
                <span>•</span>
                <span>Easy 14 Days Return</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
