import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      },
      keyframes: {
        'scale-up-center': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(0.95)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;