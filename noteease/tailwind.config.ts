import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#4A90E2',
          50: '#EEF4FC',
          100: '#DBE9F9',
          200: '#B6D3F3',
          300: '#91BDED',
          400: '#6CA7E7',
          500: '#4A90E2',
          600: '#2173D1',
          700: '#1A5AA3',
          800: '#134174',
          900: '#0C2846',
        },
        accent: {
          DEFAULT: '#F5A623',
          50: '#FEF6E9',
          100: '#FDECD3',
          200: '#FAD9A7',
          300: '#F8C57B',
          400: '#F6B24F',
          500: '#F5A623',
          600: '#D68A0A',
          700: '#A16807',
          800: '#6B4505',
          900: '#362302',
        },
      },
    },
  },
  plugins: [
    formsPlugin({
      strategy: 'class',
    }),
  ],
} satisfies Config;
