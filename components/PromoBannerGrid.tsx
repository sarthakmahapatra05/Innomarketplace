"use client";

import React from "react";
import { Play, ChevronRight, Sparkles } from "lucide-react";

interface PromoBannerGridProps {
  onExploreVideo: () => void;
  onExploreCategory: (categoryName: string) => void;
}

export const PromoBannerGrid: React.FC<PromoBannerGridProps> = ({
  onExploreVideo,
  onExploreCategory,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 min-h-[320px] sm:min-h-[420px]">
        <div
          onClick={onExploreVideo}
          className="relative h-80 sm:h-auto rounded-3xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300 bg-zinc-900 border border-purple-900/20"
        >
          <img
            src="https://dkgd4bwi6vytp.cloudfront.net/homepage/sections/1789332717873-sln4pm.png"
            alt="Bold & Beautiful Tops"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

          <div className="absolute top-4 left-4 bg-[#881337] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Up to 50% OFF</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/40 transition-all shadow-2xl">
              <Play className="w-6 h-6 sm:w-9 sm:h-9 text-white fill-white ml-1" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                FEATURED DROP
              </span>
              <h3 className="text-lg sm:text-2xl font-black tracking-tight drop-shadow-md">
                Bold &amp; Beautiful Tops
              </h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExploreCategory("Tops");
              }}
              className="inline-flex items-center space-x-1 bg-white hover:bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-xl transition-all active:scale-95 shrink-0"
            >
              <span>Explore</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-3 sm:gap-6">
          <div
            onClick={() => onExploreCategory("Diwali Collection")}
            className="relative h-44 sm:h-auto rounded-3xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 bg-zinc-800 border border-purple-900/20"
          >
            <img
              src="https://dkgd4bwi6vytp.cloudfront.net/homepage/sections/1789333168886-rc3lwp.png"
              alt="Festive Trends"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30" />
            <div className="absolute top-3 left-3 bg-[#881337] text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              Up to 50% OFF
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white">
              <span className="text-[10px] font-bold text-amber-300 uppercase block">
                DIWALI EDIT
              </span>
              <p className="text-sm sm:text-lg font-bold drop-shadow">
                Festive Glamour
              </p>
            </div>
          </div>

          <div
            onClick={() => onExploreCategory("Streetwear")}
            className="relative h-44 sm:h-auto rounded-3xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 bg-zinc-800 border border-purple-900/20"
          >
            <img
              src="https://dkgd4bwi6vytp.cloudfront.net/homepage/sections/1793748846682-yw1sjm.png"
              alt="Hoodie season trends"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30" />
            <div className="absolute top-3 left-3 bg-[#881337] text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              Up to 50% OFF
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white">
              <span className="text-[10px] font-bold text-amber-300 uppercase block">
                SEASON ESSENTIAL
              </span>
              <p className="text-sm sm:text-lg font-bold drop-shadow">
                Winter Knits &amp; Hoodies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
