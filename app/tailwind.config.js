/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Minimal romantic palette
        cosmic: "#0c0c1a",
        stardust: "#151528",
        "blush-rose": "#e89ab5",
        "soft-coral": "#f0b4c8",
        "dusty-rose": "#b08e9b",
        "rose-gold": "#d4a5b5",
        cream: "#f5ede4",
        moonlight: "#a8b4d0",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        accent: ['"Great Vibes"', 'cursive'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        "2xl": "24px",
        "3xl": "50px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.2)",
        glow: "0 0 30px rgba(232, 154, 181, 0.2)",
        "glow-lg": "0 0 60px rgba(232, 154, 181, 0.15)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        "gift-shake": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(-2deg)" },
          "20%": { transform: "rotate(2deg)" },
          "30%": { transform: "rotate(-2deg)" },
          "40%": { transform: "rotate(2deg)" },
          "50%": { transform: "rotate(0deg)" },
        },
        "heart-float": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(-180px) scale(0.3)", opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 6s ease-in-out infinite",
        bounce: "bounce 2.5s ease-in-out infinite",
        pulse: "pulse 3s ease-in-out infinite",
        "gift-shake": "gift-shake 0.8s ease-in-out",
        "heart-float": "heart-float 2.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
