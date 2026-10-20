/**
 * spacing.js
 *
 * Spacing constants — margins, paddings, gaps.
 *
 * Using named constants instead of raw numbers prevents
 * inconsistency and makes intent clear at a glance.
 */

export const spacing = {
  xs: 4,    // tiny gap between inline elements
  sm: 8,    // space-sm  (icon → label, badge gaps)
  md: 16,   // space-md / gutter  (standard horizontal padding)
  lg: 24,   // space-lg  (section gaps)
  xl: 32,   // space-xl  (hero / large padding)

  // Named aliases that match the design language
  gutter: 16,       // horizontal screen padding
  gutterSm: 12,     // compact horizontal padding
  margin: 20,       // margin
  marginMobile: 16,
  marginDesktop: 32,
};

/**
 * borderRadius.js (inline with spacing for simplicity)
 */
export const radius = {
  sm: 4,
  DEFAULT: 4,
  lg: 8,
  xl: 12,
  xxl: 16,
  full: 9999, // pill / circle shapes
};
