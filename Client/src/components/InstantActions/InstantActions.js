/**
 * InstantActions.js
 *
 * 2-column grid of shortcut tiles under "INSTANT ACTIONS".
 *
 * Figma specs:
 *  - Section gap: 8px
 *  - Section title: 14px / 700 / #0B1C30, letter-spacing 0.7px, UPPERCASE
 *  - Hint text: 11px / 500 / #424655
 *  - Tiles: 175px wide each, 108px tall, padding 14px, bg #FFFFFF,
 *           border-radius 12, shadow 0px 1px 2px rgba(0,0,0,0.05)
 *  - Icon box: 32×32, bg #DCE9FF, border-radius 8, margin-bottom 8px
 *  - Tile title: 14px / 700 / #0B1C30
 *  - Tile subtitle: 13px / 400 / #424655
 *
 * Tile 1 icon: volunteer_activism → color #006947
 * Tile 2 icon: hub              → color #0056C6
 *
 * Props:
 *  - actions (array) – override the default tiles if needed
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

// ─── Default tile data ─────────────────────────────────────────────────────────
export const DEFAULT_ACTIONS = [
  {
    id: 'ask',
    iconName: 'volunteer-activism',  // MaterialIcons name
    iconColor: colors.tertiary,      // #006947
    title: 'Ask JOSHVA $',
    subtitle: 'results might vary',
  },
  {
    id: 'architecture',
    iconName: 'hub',                 // MaterialIcons name
    iconColor: colors.primary,       // #0056C6
    title: 'Core architecture',
    subtitle: 'How JOSHVA runs',
  },
];

// ─── Single tile ──────────────────────────────────────────────────────────────
// Figma: flex-col, padding 14px, width 175, height 108, bg white,
//        border-radius 12, shadow 0 1px 2px rgba(0,0,0,0.05)
function ActionTile({ iconName, iconColor, title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress} activeOpacity={0.85}>
      {/* Icon box margin wrapper: padding-bottom 8 */}
      <View style={styles.iconMargin}>
        <View style={styles.iconBox}>
          {/* Icon: ~16px, colored */}
          <MaterialIcons name={iconName} size={16} color={iconColor} />
        </View>
      </View>

      {/* Tile title: 14px / 700 / #0B1C30 */}
      <Text style={styles.tileTitle}>{title}</Text>

      {/* Subtitle margin wrapper: padding-top 2 */}
      <View style={styles.subtitleMargin}>
        <Text style={styles.tileSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function InstantActions({ actions = DEFAULT_ACTIONS }) {
  return (
    <View style={styles.section}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Instant Actions</Text>
        <Text style={styles.sectionHint}>Tap to launch</Text>
      </View>

      {/* Tiles row */}
      <View style={styles.tilesRow}>
        {actions.map((action) => (
          <ActionTile key={action.id} {...action} />
        ))}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  section: {
    gap: 8,                      // Figma: gap 8px
  },

  // Section header ─────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,                // Figma: 14px
    lineHeight: 20,
    fontWeight: '700',
    color: '#0B1C30',
    letterSpacing: 0.7,          // Figma: letter-spacing 0.7px
    textTransform: 'uppercase',
  },
  sectionHint: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 11,                // Figma: 11px
    lineHeight: 14,
    fontWeight: '500',
    color: '#424655',
  },

  // Tile row ────────────────────────────────────────────
  tilesRow: {
    flexDirection: 'row',
    gap: 8,                      // Figma: gap 8px
  },

  // Individual tile ─────────────────────────────────────
  tile: {
    flex: 1,                     // equal width (≈175px each with 8px gap in 358px)
    height: 108,                 // Figma: height 108px
    paddingHorizontal: 14,       // Figma: padding 14px
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,            // Figma: border-radius 12
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  // Icon margin wrapper (padding-bottom 8) ─────────────
  iconMargin: {
    paddingBottom: 8,
  },
  iconBox: {
    width: 32,                   // Figma: 32×32
    height: 32,
    borderRadius: 8,             // Figma: border-radius 8
    backgroundColor: colors.surfaceContainerHigh,  // #DCE9FF
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text ────────────────────────────────────────────────
  tileTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,                // Figma: 14px / 700
    lineHeight: 20,
    fontWeight: '700',
    color: '#0B1C30',
  },
  subtitleMargin: {
    paddingTop: 2,               // Figma: padding 2px 0 0
  },
  tileSubtitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 13,                // Figma: 13px / 400
    lineHeight: 18,
    fontWeight: '400',
    color: '#424655',
  },
});
