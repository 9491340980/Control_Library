/*
 * Shared Tailwind preset for the CareHigh control library.
 *
 * Every app extends this so Tailwind utilities and library components are
 * driven by the SAME design tokens (--ch-* CSS variables). Change a token and
 * both `class="bg-primary"` and <ch-button> update together.
 *
 * Usage in an app's tailwind.config.js:
 *   module.exports = {
 *     presets: [require('@yourcompany/controls/tailwind-preset')],
 *     content: ['./src/** /*.{html,ts}'],
 *   };
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--ch-color-primary)',
          hover: 'var(--ch-color-primary-hover)',
          soft: 'var(--ch-color-primary-soft)',
        },
        secondary: {
          DEFAULT: 'var(--ch-color-secondary)',
          soft: 'var(--ch-color-secondary-soft)',
        },
        surface: {
          DEFAULT: 'var(--ch-color-surface)',
          muted: 'var(--ch-color-surface-muted)',
          soft: 'var(--ch-color-surface-soft)',
        },
        border: {
          DEFAULT: 'var(--ch-color-border)',
          muted: 'var(--ch-color-border-muted)',
          strong: 'var(--ch-color-border-strong)',
        },
        content: {
          primary: 'var(--ch-color-text-primary)',
          strong: 'var(--ch-color-text-strong)',
          secondary: 'var(--ch-color-text-secondary)',
          muted: 'var(--ch-color-text-muted)',
          soft: 'var(--ch-color-text-soft)',
          inverse: 'var(--ch-color-text-inverse)',
        },
        success: { DEFAULT: 'var(--ch-color-success)', soft: 'var(--ch-color-success-soft)' },
        warning: { DEFAULT: 'var(--ch-color-warning)', soft: 'var(--ch-color-warning-soft)' },
        danger: { DEFAULT: 'var(--ch-color-danger)', soft: 'var(--ch-color-danger-soft)' },
        info: { DEFAULT: 'var(--ch-color-info)', soft: 'var(--ch-color-info-soft)' },
      },
      fontFamily: {
        sans: 'var(--ch-font-family-base)',
      },
      fontSize: {
        xs: 'var(--ch-font-size-xs)',
        sm: 'var(--ch-font-size-sm)',
        base: 'var(--ch-font-size-base)',
        md: 'var(--ch-font-size-md)',
        lg: 'var(--ch-font-size-lg)',
        xl: 'var(--ch-font-size-xl)',
      },
      fontWeight: {
        normal: 'var(--ch-font-weight-regular)',
        medium: 'var(--ch-font-weight-medium)',
        semibold: 'var(--ch-font-weight-semibold)',
        bold: 'var(--ch-font-weight-bold)',
      },
      borderRadius: {
        sm: 'var(--ch-radius-sm)',
        md: 'var(--ch-radius-md)',
        lg: 'var(--ch-radius-lg)',
        xl: 'var(--ch-radius-xl)',
        '2xl': 'var(--ch-radius-2xl)',
        full: 'var(--ch-radius-full)',
      },
      boxShadow: {
        sm: 'var(--ch-shadow-sm)',
        md: 'var(--ch-shadow-md)',
        lg: 'var(--ch-shadow-lg)',
      },
    },
  },
};
