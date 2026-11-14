"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  Package,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CartItem } from "./CartView";
import { Address } from "@/data/products";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  address: Address;
  totalAmount: number;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  address,
  totalAmount,
  onOrderSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      const generatedId = `INNO-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#a82046", "#fcd34d", "#10b981", "#6366f1"],
        });
      } catch (err) {}

      onOrderSuccess();
    }, 1800);
  };

  const handleDone = () => {
    setOrderComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={orderComplete ? undefined : onClose} />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {!orderComplete ? (
          <div>
            <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                    Quick Checkout
                  </h3>
                  <p className="text-xs text-zinc-500">
                    256-bit encrypted secure payment
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-700"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[72vh] overflow-y-auto">
              <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs">
                <span className="font-bold text-zinc-500 uppercase text-[10px] block mb-1">
                  Delivering To ({address.tag})
                </span>
                <p className="font-bold text-zinc-900">{address.name}</p>
                <p className="text-zinc-600 mt-0.5">
                  {address.street}, {address.city} - {address.pincode}
                </p>
                <p className="text-zinc-400 mt-0.5">Phone: {address.phone}</p>
              </div>

              <div>
                <span className="font-bold text-zinc-500 uppercase text-[10px] block mb-2 px-1">
                  Select Payment Method
                </span>

                <div className="space-y-2">
                  <div
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === "upi"
                        ? "border-[#a82046] bg-rose-50/40 ring-1 ring-[#a82046]"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-zinc-900 block">
                          Instant UPI (GPay, PhonePe, Paytm)
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          Fastest &bull; 0 payment fees
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === "upi"
                          ? "border-[#a82046] bg-[#a82046]"
                          : "border-zinc-300"
                      }`}
                    >
                      {paymentMethod === "upi" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === "card"
                        ? "border-[#a82046] bg-rose-50/40 ring-1 ring-[#a82046]"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-zinc-900 block">
                          Credit &amp; Debit Card
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          Visa, MasterCard, RuPay
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === "card"
                          ? "border-[#a82046] bg-[#a82046]"
                          : "border-zinc-300"
                      }`}
                    >
                      {paymentMethod === "card" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === "cod"
                        ? "border-[#a82046] bg-rose-50/40 ring-1 ring-[#a82046]"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-zinc-900 block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          Pay cash or UPI at delivery doorstep
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === "cod"
                          ? "border-[#a82046] bg-[#a82046]"
                          : "border-zinc-300"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Items Total ({items.length})</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Delivery Charges</span>
                  <span>FREE</span>
                </div>
                <div className="border-t border-zinc-200 pt-1.5 flex justify-between font-extrabold text-sm text-zinc-950">
                  <span>Total Payable</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-zinc-100 bg-zinc-50">
              <button
                disabled={isProcessing || items.length === 0}
                onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-[#a82046] hover:bg-[#8e1739] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-2xl active:scale-95 transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span>Securing Payment &amp; Placing Order...</span>
                ) : (
                  <>
                    <span>Pay ₹{totalAmount} &amp; Place Order</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">
                ORDER CONFIRMED
              </span>
              <h2 className="text-2xl font-black text-zinc-950">
                Thank You, {address.name}!
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Order Reference: <strong className="text-zinc-900">{orderId}</strong>
              </p>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs text-left space-y-2">
              <div className="flex items-center space-x-2 text-zinc-800 font-semibold">
                <Package className="w-4 h-4 text-emerald-600" />
                <span>Estimated Delivery: Within 3 business days</span>
              </div>
              <p className="text-zinc-500 text-[11px]">
                We have sent an order invoice &amp; live SMS tracker to {address.phone}.
              </p>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3 bg-[#a82046] hover:bg-[#8e1739] text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
