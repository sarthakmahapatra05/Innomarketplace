"use client";

import React from "react";
import { FestiveLights } from "./FestiveLights";
import { CATEGORY_ARCHES } from "@/data/products";

interface FestiveHeroBannerProps {
  activeCategory: "ALL" | "ETHNIC" | "WESTERN" | "MEN";
  onSelectCategory: (cat: "ALL" | "ETHNIC" | "WESTERN" | "MEN") => void;
  onSelectArchCategory: (archId: string) => void;
}

export const FestiveHeroBanner: React.FC<FestiveHeroBannerProps> = ({
  activeCategory,
  onSelectCategory,
  onSelectArchCategory,
}) => {
  return (
    <div
      className="relative w-full text-white pt-2 sm:pt-3 pb-5 sm:pb-7 shadow-festive select-none bg-gradient-to-b from-[#20082b] via-[#350f45] to-[#45145b] overflow-hidden"
    >
      <FestiveLights variant="top" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto no-scrollbar pt-2 pb-2">
          {(["ALL", "ETHNIC", "WESTERN", "MEN"] as const).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shrink-0 ${
                  isActive
                    ? "bg-white/20 text-white border border-white shadow-md backdrop-blur-md"
                    : "bg-transparent text-white/70 hover:text-white hover:bg-white/10 border border-transparent"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <FestiveLights variant="middle" />

        <div className="flex items-center justify-start sm:justify-center space-x-3 sm:space-x-6 overflow-x-auto no-scrollbar py-2 px-1">
          {CATEGORY_ARCHES.map((arch) => (
            <button
              key={arch.id}
              onClick={() => onSelectArchCategory(arch.id)}
              className="flex flex-col items-center group shrink-0 w-[72px] sm:w-[92px] active:scale-95 transition-transform"
            >
              <div className="w-16 h-18 sm:w-20 sm:h-22 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <img
                  src={arch.image}
                  alt={arch.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-center text-white/90 mt-1 leading-snug group-hover:text-amber-200 transition-colors whitespace-nowrap">
                {arch.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

