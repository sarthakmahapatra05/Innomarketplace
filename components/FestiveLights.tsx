"use client";

import React from "react";

export const FestiveLights: React.FC<{ variant?: "top" | "middle" }> = ({ variant = "top" }) => {
  if (variant === "top") {
    return (
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-10 h-14">
        <svg
          viewBox="0 0 600 50"
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M-20,10 Q60,35 140,15 Q220,38 300,16 Q380,38 460,15 Q540,36 620,10"
            fill="none"
            stroke="#1a0724"
            strokeWidth="1.8"
            strokeOpacity="0.85"
          />

          {[
            { cx: 30, cy: 22, anim: "twinkle-bulb-1" },
            { cx: 85, cy: 30, anim: "twinkle-bulb-2" },
            { cx: 140, cy: 15, anim: "twinkle-bulb-3" },
            { cx: 195, cy: 30, anim: "twinkle-bulb-4" },
            { cx: 250, cy: 31, anim: "twinkle-bulb-1" },
            { cx: 300, cy: 16, anim: "twinkle-bulb-2" },
            { cx: 355, cy: 30, anim: "twinkle-bulb-3" },
            { cx: 410, cy: 31, anim: "twinkle-bulb-4" },
            { cx: 460, cy: 15, anim: "twinkle-bulb-1" },
            { cx: 515, cy: 30, anim: "twinkle-bulb-2" },
            { cx: 570, cy: 22, anim: "twinkle-bulb-3" },
          ].map((bulb, i) => (
            <g key={i} className={bulb.anim}>
              <line
                x1={bulb.cx}
                y1={bulb.cy - 7}
                x2={bulb.cx}
                y2={bulb.cy}
                stroke="#2a0838"
                strokeWidth="1.5"
              />
              <circle
                cx={bulb.cx}
                cy={bulb.cy + 3}
                r="7"
                fill="#fde047"
                opacity="0.35"
              />
              <ellipse
                cx={bulb.cx}
                cy={bulb.cy + 3}
                rx="3.5"
                ry="5"
                fill="#fef08a"
              />
              <ellipse
                cx={bulb.cx}
                cy={bulb.cy + 2}
                rx="1.5"
                ry="2.5"
                fill="#ffffff"
                opacity="0.8"
              />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden pointer-events-none select-none z-10 h-8 sm:h-10 my-0.5 sm:my-1">
      <svg
        viewBox="0 0 600 35"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M-20,6 Q80,26 180,9 Q280,28 380,8 Q480,26 620,6"
          fill="none"
          stroke="#1a0724"
          strokeWidth="1.5"
          strokeOpacity="0.75"
        />

        {[
          { cx: 50, cy: 18, anim: "twinkle-bulb-2" },
          { cx: 110, cy: 24, anim: "twinkle-bulb-3" },
          { cx: 180, cy: 10, anim: "twinkle-bulb-1" },
          { cx: 250, cy: 24, anim: "twinkle-bulb-4" },
          { cx: 315, cy: 25, anim: "twinkle-bulb-2" },
          { cx: 380, cy: 9, anim: "twinkle-bulb-3" },
          { cx: 445, cy: 23, anim: "twinkle-bulb-1" },
          { cx: 510, cy: 24, anim: "twinkle-bulb-4" },
          { cx: 565, cy: 15, anim: "twinkle-bulb-2" },
        ].map((bulb, i) => (
          <g key={i} className={bulb.anim}>
            <line
              x1={bulb.cx}
              y1={bulb.cy - 6}
              x2={bulb.cx}
              y2={bulb.cy}
              stroke="#2a0838"
              strokeWidth="1.2"
            />
            <circle
              cx={bulb.cx}
              cy={bulb.cy + 2.5}
              r="6"
              fill="#fbbf24"
              opacity="0.4"
            />
            <ellipse
              cx={bulb.cx}
              cy={bulb.cy + 2.5}
              rx="3"
              ry="4.2"
              fill="#fef08a"
            />
            <ellipse
              cx={bulb.cx}
              cy={bulb.cy + 1.8}
              rx="1.2"
              ry="2"
              fill="#ffffff"
              opacity="0.8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
