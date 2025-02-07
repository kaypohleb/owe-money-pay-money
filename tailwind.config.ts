import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Cascadia Code Mono"]
      },
      colors: {
        brightlime: "#00FF00",
      },
      height:{
        "full-footer": "calc(100% - 3rem)"
      },
      minHeight:{
        "full-footer": "calc(100% - 3rem)"
      },
    },
  },
  plugins: [],
} satisfies Config;
