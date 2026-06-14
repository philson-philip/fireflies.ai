/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand (anchored in Fireflies DNA, owned by this system)
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          active: "var(--brand-active)",
          soft: "var(--brand-soft)",
          ring: "var(--brand-ring)",
        },
        // Surfaces
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-subtle": "var(--surface-subtle)",
        "surface-secondary": "var(--surface-secondary)",
        "surface-muted": "var(--surface-muted)",
        // Text
        ink: "var(--ink)",
        "ink-secondary": "var(--ink-secondary)",
        "ink-muted": "var(--ink-muted)",
        "ink-inverse": "var(--ink-inverse)",
        // Lines
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        // Semantic (made accessible — fixes the incoherent status colors in the live app)
        success: { DEFAULT: "var(--success)", soft: "var(--success-soft)" },
        warning: { DEFAULT: "var(--warning)", soft: "var(--warning-soft)" },
        danger: { DEFAULT: "var(--danger)", soft: "var(--danger-soft)" },
        info: { DEFAULT: "var(--info)", soft: "var(--info-soft)" },
        // Transcript "now playing" highlight — brand-tinted, never red
        playing: "var(--playing)",
      },
      fontFamily: {
        display: ['"DM Sans"', "system-ui", "-apple-system", "sans-serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // role-driven scale
        display: ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h1: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h2: ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        h3: ["1.125rem", { lineHeight: "1.3" }],
        h4: ["1rem", { lineHeight: "1.4" }],
        body: ["0.9375rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55" }],
        label: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.01em" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(16,24,40,0.04)",
        raised: "0 2px 4px 0 rgba(16,24,40,0.06)",
        lifted: "0 8px 16px -4px rgba(16,24,40,0.10)",
        floating: "0 12px 28px -6px rgba(16,24,40,0.16)",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.18s var(--ease-soft) both",
        "toast-in": "toast-in 0.22s var(--ease-soft) both",
      },
    },
  },
  plugins: [],
};
