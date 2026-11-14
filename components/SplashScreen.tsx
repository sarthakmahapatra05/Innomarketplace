"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1200);
    const t3 = setTimeout(() => setStage(3), 2000);
    const t4 = setTimeout(() => setStage(4), 2800);
    const t5 = setTimeout(() => setStage(5), 3600);
    const t6 = setTimeout(() => onComplete(), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#180524] via-[#2a083a] to-[#3d0f52] transition-opacity duration-700 select-none overflow-hidden ${
        stage === 5 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: "15%", left: "20%", delay: "0s" },
          { top: "25%", left: "80%", delay: "1s" },
          { top: "70%", left: "15%", delay: "0.5s" },
          { top: "75%", left: "75%", delay: "1.5s" },
          { top: "45%", left: "88%", delay: "2s" },
          { top: "55%", left: "12%", delay: "0.8s" },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute text-amber-300/40 animate-pulse"
            style={{ top: star.top, left: star.left, animationDelay: star.delay }}
          >
            <Sparkles className="w-3 h-3 text-amber-300/50" />
          </div>
        ))}
      </div>

      <div
        className={`mb-8 flex items-center justify-center p-1 transition-all duration-700 ${
          stage >= 1 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 -translate-y-4"
        }`}
      >
        <img
          src="/logo.png"
          alt="InnoMarket"
          className="h-12 sm:h-16 w-auto object-contain drop-shadow-[0_4px_24px_rgba(251,191,36,0.3)]"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-7 px-4">
        <div
          className={`transition-all duration-700 transform ${
            stage >= 1
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-6"
          }`}
        >
          <span
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-amber-300 font-serif ${
              stage >= 4 ? "drop-shadow-[0_0_35px_rgba(252,211,77,0.9)]" : "drop-shadow-lg"
            }`}
          >
            Buy
          </span>
          <span className="hidden sm:inline text-white/30 text-4xl sm:text-6xl md:text-7xl ml-3 font-light">
            •
          </span>
        </div>

        <div
          className={`transition-all duration-700 transform ${
            stage >= 2
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-6"
          }`}
        >
          <span
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-rose-400 font-serif ${
              stage >= 4 ? "drop-shadow-[0_0_35px_rgba(251,113,133,0.9)]" : "drop-shadow-lg"
            }`}
          >
            Wear
          </span>
          <span className="hidden sm:inline text-white/30 text-4xl sm:text-6xl md:text-7xl ml-3 font-light">
            •
          </span>
        </div>

        <div
          className={`transition-all duration-700 transform ${
            stage >= 3
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-6"
          }`}
        >
          <span
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-emerald-300 font-serif ${
              stage >= 4 ? "drop-shadow-[0_0_35px_rgba(110,231,183,0.9)]" : "drop-shadow-lg"
            }`}
          >
            Repeat
          </span>
        </div>
      </div>

      <div
        className={`mt-10 sm:mt-12 text-center transition-all duration-700 ${
          stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase">
          INNOMARKET <span className="text-amber-400">•</span> FESTIVE EDIT
        </p>
      </div>

      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-white/60 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95"
      >
        Skip
      </button>
    </div>
  );
};
