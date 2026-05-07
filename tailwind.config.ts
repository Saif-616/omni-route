import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#32B531",
        background: "#070707",
        accent: "#16AE58",
        textPrimary: "#FFFFFF",
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(50, 181, 49, 0.5), 0 0 20px rgba(50, 181, 49, 0.3)',
        'neon-accent': '0 0 10px rgba(22, 174, 88, 0.6), 0 0 30px rgba(22, 174, 88, 0.4)',
      }
    },
  },
  plugins: [],
};
export default config;
