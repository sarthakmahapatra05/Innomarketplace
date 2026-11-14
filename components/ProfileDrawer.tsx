"use client";

import React from "react";
import {
  X,
  Package,
  MapPin,
  Coins,
  HelpCircle,
  Bell,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Address } from "@/data/products";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddresses: () => void;
  currentAddress: Address;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAddresses,
  currentAddress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        <div>
          <div className="p-4 bg-gradient-to-r from-[#2c0e39] to-[#55176e] text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-[#2c0e39] font-black text-lg flex items-center justify-center border-2 border-white shadow-md">
                SS
              </div>
              <div>
                <h3 className="font-bold text-sm">Sarthak Sharma</h3>
                <p className="text-[11px] text-white/70">+91 98765 43210</p>
                <div className="inline-flex items-center text-[10px] bg-amber-300 text-zinc-950 font-bold px-1.5 py-0.5 rounded mt-0.5">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                  VIP Member
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white"
              aria-label="Close profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-1 text-sm divide-y divide-zinc-100">
            <div className="py-2.5 flex items-center justify-between hover:bg-zinc-50 px-2 rounded-xl cursor-pointer">
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4 text-zinc-600" />
                <span className="font-semibold text-zinc-800 text-xs sm:text-sm">My Orders</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>

            <div
              onClick={() => {
                onClose();
                onOpenAddresses();
              }}
              className="py-2.5 flex items-center justify-between hover:bg-zinc-50 px-2 rounded-xl cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-zinc-600" />
                <div>
                  <span className="font-semibold text-zinc-800 text-xs sm:text-sm block">Saved Addresses</span>
                  <span className="text-[11px] text-zinc-400">
                    {currentAddress.tag}: {currentAddress.city} ({currentAddress.pincode})
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="py-2.5 flex items-center justify-between hover:bg-zinc-50 px-2 rounded-xl cursor-pointer">
              <div className="flex items-center space-x-3">
                <Coins className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="font-semibold text-zinc-800 text-xs sm:text-sm block">InnoCoins &amp; Cash</span>
                  <span className="text-[11px] text-emerald-600 font-bold">250 Coins Balance</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="py-2.5 flex items-center justify-between hover:bg-zinc-50 px-2 rounded-xl cursor-pointer">
              <div className="flex items-center space-x-3">
                <Bell className="w-4 h-4 text-zinc-600" />
                <span className="font-semibold text-zinc-800 text-xs sm:text-sm">Notifications &amp; Deals</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="py-2.5 flex items-center justify-between hover:bg-zinc-50 px-2 rounded-xl cursor-pointer">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-4 h-4 text-zinc-600" />
                <span className="font-semibold text-zinc-800 text-xs sm:text-sm">Help Center &amp; Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-bold rounded-xl flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4 text-zinc-500" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
