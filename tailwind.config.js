/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Cinematic Dark
        surface: "#121212",
        primary: "#ffffff",
        secondary: "#a1a1aa",
        accent: "#22c55e", // Green dot status
        "glass": "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        // Keep previous linear colors if needed, or remove if replacing
      },
      fontFamily: {
        sans: ['Inter Tight', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
      },
      backgroundImage: {
        "linear-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        "linear-radial":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 30%)",
      },
    },
  },
  plugins: [],
};
