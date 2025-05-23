import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}" // include global styles if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ['"Press Start 2P"', "system-ui", "sans-serif"],
      },
      colors: {
        orangeDynasty: "#FF6B00",
        bgDark: "#1E1E1E",
        bgLight: "#FFF8F0",
      },
      animation: {
        pop: "pop 0.3s ease-out",
        shake: "shake 0.6s ease-in-out",
        "fade-in": "fade-in 0.5s ease-in forwards",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
