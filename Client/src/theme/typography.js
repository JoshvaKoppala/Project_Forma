/**
 * typography.js
 *
 * Font sizes, line heights, and font weights used throughout the app.
 *
 * Each "type scale" entry is a flat object you can spread directly into
 * a StyleSheet, e.g.:  fontSize: typography.headlineLg.fontSize
 *
 * Font family is "Plus Jakarta Sans" — add it via expo-font if needed.
 */

export const typography = {
  // headlineLg  →  26px / 700 weight / 34px line-height
  headlineLg: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
  },

  // headlineMd  →  20px / 700 weight / 28px line-height
  headlineMd: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
  },

  // headlineSm  →  18px / 600 weight / 26px line-height
  headlineSm: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },

  // headlineXl  →  32px / 800 weight / 40px line-height
  headlineXl: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800',
  },

  // bodyLg  →  16px / 400 weight / 24px line-height
  bodyLg: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },

  // bodyMd  →  14px / 400 weight / 22px line-height
  bodyMd: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },

  // bodySm  →  13px / 400 weight / 18px line-height
  bodySm: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },

  // labelLg  →  14px / 600 weight / 20px line-height
  labelLg: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },

  // labelMd  →  12px / 600 weight / 16px line-height
  labelMd: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },

  // labelSm  →  11px / 500 weight / 14px line-height
  labelSm: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
  },
};
