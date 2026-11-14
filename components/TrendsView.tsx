"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Music,
  ShoppingBag,
  Play,
  Sparkles,
} from "lucide-react";
import { TRENDS_DATA, Product } from "@/data/products";

interface TrendsViewProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const TrendsView: React.FC<TrendsViewProps> = ({
  onAddToCart,
  onQuickView,
}) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());

  const currentReel = TRENDS_DATA[activeReelIndex];

  const toggleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const next = new Set(prev);
      if (next.has(reelId)) next.delete(reelId);
      else next.add(reelId);
      return next;
    });
  };

  return (
    <div className="w-full min-h-screen bg-black text-white pb-24 select-none relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-2">
          <span className="text-base font-extrabold tracking-tight text-white flex items-center">
            <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" />
            Trends &amp; Reels
          </span>
        </div>

        <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0.5 text-xs font-semibold">
          <button className="px-3 py-1 bg-white text-zinc-900 rounded-full shadow-sm">
            For You
          </button>
          <button className="px-3 py-1 text-white/80 hover:text-white">
            Following
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-md h-[82vh] max-h-[750px] mt-12 rounded-3xl overflow-hidden shadow-2xl bg-zinc-900 flex flex-col justify-between">
        <div
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 cursor-pointer overflow-hidden"
        >
          <img
            src={currentReel.product.image}
            alt={currentReel.caption}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center animate-in zoom-in-75">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>
          )}
        </div>

        <div className="relative z-20 flex space-x-1.5 px-3 pt-3">
          {TRENDS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveReelIndex(idx)}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                activeReelIndex === idx ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <div className="relative z-20 self-end mr-3 flex flex-col items-center space-y-4 mb-28">
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
              <img
                src={currentReel.avatar}
                alt={currentReel.creator}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#a82046] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow">
              +
            </button>
          </div>

          <button
            onClick={() => toggleLike(currentReel.id)}
            className="flex flex-col items-center active:scale-75 transition-transform"
          >
            <div
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                likedReels.has(currentReel.id)
                  ? "bg-rose-600 text-white"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              <Heart
                className={`w-6 h-6 ${
                  likedReels.has(currentReel.id) ? "fill-white" : ""
                }`}
              />
            </div>
            <span className="text-[11px] font-bold mt-1 text-white drop-shadow">
              {(
                currentReel.likes + (likedReels.has(currentReel.id) ? 1 : 0)
              ).toLocaleString()}
            </span>
          </button>

          <button className="flex flex-col items-center active:scale-75 transition-transform">
            <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold mt-1 text-white drop-shadow">
              {currentReel.comments}
            </span>
          </button>

          <button className="flex flex-col items-center active:scale-75 transition-transform">
            <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold mt-1 text-white drop-shadow">
              {Math.round(currentReel.likes * 0.18)}
            </span>
          </button>
        </div>

        <div className="relative z-20 px-4 pb-4 space-y-3">
          <div>
            <h4 className="text-sm font-bold text-white drop-shadow flex items-center">
              {currentReel.creator}
              <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-amber-400 text-black font-extrabold rounded">
                Verified
              </span>
            </h4>
            <p className="text-xs text-white/90 line-clamp-2 mt-1 drop-shadow leading-relaxed">
              {currentReel.caption}
            </p>
            <div className="flex items-center text-[11px] text-white/70 mt-1.5">
              <Music className="w-3 h-3 mr-1 animate-spin" />
              <span className="truncate">Original audio &bull; Festive Beats Mix</span>
            </div>
          </div>

          <div className="p-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-zinc-900 flex items-center justify-between shadow-xl">
            <div
              onClick={() => onQuickView(currentReel.product)}
              className="flex items-center space-x-2.5 cursor-pointer flex-1 min-w-0"
            >
              <img
                src={currentReel.product.image}
                alt={currentReel.product.title}
                className="w-11 h-11 object-cover rounded-xl border border-zinc-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-zinc-900 truncate">
                  {currentReel.product.title}
                </p>
                <div className="flex items-center space-x-1.5 text-xs">
                  <span className="font-extrabold text-[#a82046]">
                    ₹{currentReel.product.price}
                  </span>
                  <span className="line-through text-[11px] text-zinc-400">
                    ₹{currentReel.product.originalPrice}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {currentReel.product.discount}% OFF
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(currentReel.product)}
              className="ml-2 px-3.5 py-2 bg-[#a82046] hover:bg-[#8e1739] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-3">
        <button
          onClick={() =>
            setActiveReelIndex((prev) =>
              prev === 0 ? TRENDS_DATA.length - 1 : prev - 1
            )
          }
          className="text-xs text-white/70 hover:text-white px-3 py-1 bg-white/10 rounded-full"
        >
          Previous Look
        </button>
        <button
          onClick={() =>
            setActiveReelIndex((prev) =>
              prev === TRENDS_DATA.length - 1 ? 0 : prev + 1
            )
          }
          className="text-xs text-white/70 hover:text-white px-3 py-1 bg-white/10 rounded-full"
        >
          Next Look
        </button>
      </div>
    </div>
  );
};
