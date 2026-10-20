/**
 * colors.js
 *
 * All the app's colors live here.
 * If you want to change a color across the whole app,
 * just change it once in this file — it updates everywhere.
 *
 * These are the same colors used in the design (matching the HTML design tokens).
 */

export const colors = {
  // ── Main backgrounds ───────────────────────────────────────────────────────
  background: '#f8f9ff',          // lightest page background
  surface: '#f8f9ff',             // card / sheet background
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#eff4ff',
  surfaceContainer: '#e5eeff',
  surfaceContainerHigh: '#dce9ff',
  surfaceContainerHighest: '#d3e4fe',
  surfaceDim: '#cbdbf5',
  surfaceBright: '#f8f9ff',
  surfaceVariant: '#d3e4fe',

  // ── Brand blues (primary) ──────────────────────────────────────────────────
  primary: '#0056c6',             // main blue (buttons, active icons)
  primaryContainer: '#006df8',
  primaryFixed: '#d9e2ff',
  primaryFixedDim: '#b0c6ff',
  onPrimary: '#ffffff',           // white text on primary buttons
  onPrimaryContainer: '#fefcff',
  onPrimaryFixed: '#001945',
  onPrimaryFixedVariant: '#00429c',
  inversePrimary: '#b0c6ff',

  // ── Purple / indigo (secondary) ────────────────────────────────────────────
  secondary: '#4b41e1',
  secondaryContainer: '#645efb',
  secondaryFixed: '#e2dfff',
  secondaryFixedDim: '#c3c0ff',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#fffbff',
  onSecondaryFixed: '#0f0069',
  onSecondaryFixedVariant: '#3323cc',

  // ── Green (tertiary — "online" indicator) ─────────────────────────────────
  tertiary: '#006947',
  tertiaryContainer: '#00855b',
  tertiaryFixed: '#6ffbbe',
  tertiaryFixedDim: '#4edea3',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#f5fff6',
  onTertiaryFixed: '#002113',
  onTertiaryFixedVariant: '#005236',

  // ── Text ───────────────────────────────────────────────────────────────────
  onBackground: '#0b1c30',
  onSurface: '#0b1c30',           // main body text
  onSurfaceVariant: '#424655',    // secondary / muted text
  outline: '#727787',             // very muted text (timestamps)
  outlineVariant: '#c2c6d8',      // dividers

  // ── Error / destructive ────────────────────────────────────────────────────
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',

  // ── Misc ───────────────────────────────────────────────────────────────────
  inverseSurface: '#213145',
  inverseOnSurface: '#eaf1ff',
  surfaceTint: '#0058cb',
};
