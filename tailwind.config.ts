import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: ['"Press Start 2P"', 'cursive']
      },
      colors: {
        orangeDynasty: "#FF6B00",
        bgDark: "#1E1E1E",
        bgLight: "#FFF8F0"
      },
      animation: {
        pop: "pop 0.3s ease-out",
        shake: "shake 0.6s ease-in-out"
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" }
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
