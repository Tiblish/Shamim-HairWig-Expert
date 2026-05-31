import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        cream: "#f8f8f6",
        gold: {
          light: "#e5c158",
          DEFAULT: "#d4af37",
          dark: "#b3912b",
        },
        navy: {
          light: "#1e293b",
          DEFAULT: "#0f172a",
          dark: "#090d16",
        },
        charcoal: "#1a1a1a",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
