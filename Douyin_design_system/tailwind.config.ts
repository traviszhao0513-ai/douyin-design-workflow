import type { Config } from "tailwindcss";

/**
 * Douyin Delight UI Kit — Tailwind Config
 *
 * All values are sourced from tokens.json (DTCG format).
 * Components MUST reference CSS Variables (--dux-*) at runtime;
 * Tailwind utilities here are for static/utility usage only.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}", "./ui/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",

  theme: {
    extend: {
      // ─── Colors ─────────────────────────────────────────────────
      colors: {
        brand: {
          primary:         "var(--dux-color-brand-primary)",
          secondary:       "var(--dux-color-brand-secondary)",
          "primary-hover":    "var(--dux-color-brand-primary-hover)",
          "primary-active":   "var(--dux-color-brand-primary-active)",
          "primary-disabled": "var(--dux-color-brand-primary-disabled)",
          "primary-surface":  "var(--dux-color-brand-primary-surface)",
        },
        text: {
          primary:   "var(--dux-color-text-primary)",
          secondary: "var(--dux-color-text-secondary)",
          tertiary:  "var(--dux-color-text-tertiary)",
          inverse:   "var(--dux-color-text-inverse)",
          link:      "var(--dux-color-text-link)",
          danger:    "var(--dux-color-text-danger)",
        },
        bg: {
          page:    "var(--dux-color-bg-page)",
          surface: "var(--dux-color-bg-surface)",
          overlay: "var(--dux-color-bg-overlay)",
          subtle:  "var(--dux-color-bg-subtle)",
        },
        border: {
          light:   "var(--dux-color-border-light)",
          medium:  "var(--dux-color-border-medium)",
          focused: "var(--dux-color-border-focused)",
        },
        status: {
          success:         "var(--dux-color-status-success)",
          "success-surface":"var(--dux-color-status-success-surface)",
          warning:         "var(--dux-color-status-warning)",
          "warning-surface":"var(--dux-color-status-warning-surface)",
          error:           "var(--dux-color-status-error)",
          "error-surface": "var(--dux-color-status-error-surface)",
          info:            "var(--dux-color-status-info)",
          "info-surface":  "var(--dux-color-status-info-surface)",
        },
        neutral: {
          0:   "#FFFFFF",
          50:  "#FAFAFA",
          100: "#F4F4F4",
          200: "#E3E3E4",
          300: "#C4C5CB",
          400: "#A5A6AF",
          500: "#8A8B94",
          600: "#6B6C76",
          700: "#4D4E58",
          800: "#2E2F3A",
          900: "#161823",
          950: "#0A0B12",
        },
      },

      // ─── Typography ──────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--dux-font-sans)"],
        mono: ["var(--dux-font-mono)"],
      },
      fontSize: {
        xs:   ["10px", { lineHeight: "1.4" }],
        sm:   ["12px", { lineHeight: "1.5" }],
        base: ["14px", { lineHeight: "1.5" }],
        md:   ["15px", { lineHeight: "1.5" }],
        lg:   ["16px", { lineHeight: "1.5" }],
        xl:   ["17px", { lineHeight: "1.4" }],
        "2xl":["18px", { lineHeight: "1.4" }],
        "3xl":["20px", { lineHeight: "1.375" }],
        "4xl":["22px", { lineHeight: "1.375" }],
        "5xl":["24px", { lineHeight: "1.2" }],
        "6xl":["28px", { lineHeight: "1.2" }],
        "7xl":["32px", { lineHeight: "1.2" }],
        "8xl":["36px", { lineHeight: "1.2" }],
      },
      fontWeight: {
        regular:  "400",
        medium:   "500",
        semibold: "600",
        bold:     "700",
      },

      // ─── Spacing ─────────────────────────────────────────────────
      spacing: {
        "0":  "0px",
        "1":  "4px",
        "2":  "8px",
        "3":  "12px",
        "4":  "16px",
        "5":  "20px",
        "6":  "24px",
        "7":  "28px",
        "8":  "32px",
        "10": "40px",
        "12": "48px",
        "14": "56px",
        "16": "64px",
      },

      // ─── Border Radius ───────────────────────────────────────────
      borderRadius: {
        none: "0px",
        xs:   "4px",
        sm:   "8px",
        md:   "12px",
        lg:   "16px",
        xl:   "20px",
        "2xl":"24px",
        full: "9999px",
      },

      // ─── Shadows ─────────────────────────────────────────────────
      boxShadow: {
        sm:    "0 1px 4px 0 rgba(22,24,35,0.08)",
        md:    "0 4px 12px 0 rgba(22,24,35,0.12)",
        lg:    "0 8px 24px 0 rgba(22,24,35,0.16)",
        xl:    "0 16px 40px 0 rgba(22,24,35,0.20)",
        focus: "0 0 0 3px rgba(43,121,255,0.24)",
      },

      // ─── Transitions ─────────────────────────────────────────────
      transitionDuration: {
        fast:   "100ms",
        normal: "200ms",
        slow:   "300ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
        enter:    "cubic-bezier(0, 0, 0.2, 1)",
        exit:     "cubic-bezier(0.4, 0, 1, 1)",
      },

      // ─── Z-Index ─────────────────────────────────────────────────
      zIndex: {
        base:     "0",
        raised:   "10",
        dropdown: "100",
        sticky:   "200",
        overlay:  "300",
        modal:    "400",
        toast:    "500",
      },
    },
  },

  plugins: [],
};

export default config;
