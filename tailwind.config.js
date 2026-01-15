/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        mist: "#f6f7fb",
        linear: {
          50: "#0d0f14",
          100: "#12141b",
          200: "#191d27",
          300: "#202534",
          400: "#272e40",
          500: "#2f374d",
          600: "#3a455d",
          700: "#46526d",
          800: "#53607e",
          900: "#6a7899",
          950: "#8da1c2",
        },
        glass: {
          stroke: "rgba(255, 255, 255, 0.08)",
          strokeStrong: "rgba(255, 255, 255, 0.14)",
        },
      },
      borderColor: {
        "glass/1": "rgba(255, 255, 255, 0.08)",
        "glass/2": "rgba(255, 255, 255, 0.14)",
      },
      boxShadow: {
        "glass-sm": "0 10px 40px rgba(0, 0, 0, 0.35)",
        "glass-lg": "0 20px 70px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "linear-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        "linear-radial":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 30%)",
      },
      backdropBlur: {
        10: "10px",
        16: "16px",
      },
    },
  },
  plugins: [],
};
