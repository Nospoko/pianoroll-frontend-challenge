import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: {
          100: "#ffffff",
          200: "#ccc",
        },
      },
    },
    colors: {
      white: "#F0F0F0",
      black: "#1C1C1A",
      navy: "#154151",
      red: "944038",
      brown: "381815",
    },
  },
  plugins: [],
};
export default config;
