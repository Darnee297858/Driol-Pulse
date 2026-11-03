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
        background: "#090A0F",
        surface: "#12141D",
        "surface-border": "#1E2230",
        brand: {
          cyan: "#00F2FE",
          purple: "#7928CA",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#EF4444"
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
