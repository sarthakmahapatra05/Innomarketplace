module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkPurple: "#2a0d35",
          deepPurple: "#3d134e",
          midPurple: "#4e1864",
          lightPurple: "#672882",
          accentPink: "#b32057",
          wineRed: "#9e174d",
          burgundy: "#831843",
          gold: "#fcd34d",
          goldLight: "#fef08a",
          goldDark: "#f59e0b",
          discountGreen: "#16a34a",
          cardBg: "#f8f5f9",
          cardBorder: "#f0e6f2",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        festive: "0 4px 20px -2px rgba(93, 24, 112, 0.25)",
        floatingNav: "0 10px 30px -5px rgba(0, 0, 0, 0.2), 0 0 1px 1px rgba(255, 255, 255, 0.7) inset",
        card: "0 2px 10px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        glow: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
