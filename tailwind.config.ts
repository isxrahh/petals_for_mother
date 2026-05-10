// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main Backgrounds
        'petal-frost': '#ffe0e9',
        'pastel-pink': '#ffc2d4',
        'pink-mist': '#ff9ebb',
        'petal-rouge': '#ff7aa2',
        'blush-rose': '#e05780',
        'rosewood': '#b9375e',
        'vintage-berry': '#8a2846',
        'crimson-violet': '#602437',
        'mauve-shadow': '#522e38',

        // Semantic Colors
        main: '#ffe0e9',
        card: '#ffc2d4',
        primary: '#8a2846',
        accent: '#e05780',
        muted: '#b9375e',
      },
    },
  },
  plugins: [],
};
export default config;