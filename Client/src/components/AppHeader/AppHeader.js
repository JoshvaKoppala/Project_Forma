/**
 * AppHeader.js
 *
 * Fixed top navigation bar.
 *
 * Figma specs:
 *  - Height: 64px
 *  - Padding: 0px 16px (horizontal)
 *  - Background: rgba(248,249,255,0.85) + blur (approximated with solid bg)
 *  - Shadow: 0px 1px 8px rgba(0,0,0,0.04)
 *
 * Props:
 *  - onAvatarPress  (function) – called when the avatar button is tapped
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

// ─── Online status pill ───────────────────────────────────────────────────────
// Figma: bg #EFF4FF, padding 4px 10px, gap 6px, border-radius 9999
// Shadow: 0px 2px 8px rgba(0,0,0,0.02)
function OnlineBadge() {
  return (
    <View style={styles.onlineBadge}>
      {/* Dot: 8×8, bg #006947 */}
      <View style={styles.onlineDot} />
      {/* Text: 11px / 600 / #006947 */}
      <Text style={styles.onlineText}>online</Text>
    </View>
  );
}

// ─── Left brand section ───────────────────────────────────────────────────────
// Logo box: 36×36, bg #0056C6, border-radius 12, shadow
// "JOSHVA" text: 18px / 800 / #0B1C30, letter-spacing -0.45
// "AI" pill: bg #DCE9FF, padding 2px 6px, border-radius 9999
function BrandLogo() {
  return (
    <View style={styles.brandRow}>
      {/* Blue rounded square with psychology icon */}
      <View style={styles.logoBox}>
        <MaterialIcons name="psychology" size={15} color={colors.onPrimary} />
      </View>

      {/* Name + AI pill */}
      <View style={styles.nameCol}>
        <View style={styles.nameRow}>
          <Text style={styles.appName}>JOSHVA</Text>
          <View style={styles.aiPill}>
            {/* Text: 10px / 700 / #0056C6, letter-spacing 1 */}
            <Text style={styles.aiPillText}>AI</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Avatar button ────────────────────────────────────────────────────────────
// Touch target: min 44×44, padding 6px
// Circle: 32×32, bg #0056C6, border-radius 9999
// Icon: person, white, 12px
function AvatarButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.avatarTouchable}
      accessibilityLabel="Profile Options"
      accessibilityRole="button"
    >
      <View style={styles.avatarCircle}>
        <MaterialIcons name="person" size={12} color={colors.onPrimary} />
      </View>
    </TouchableOpacity>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function AppHeader({ onAvatarPress }) {
  return (
    <View style={styles.header}>
      <BrandLogo />

      {/* Right: online badge + avatar */}
      <View style={styles.rightRow}>
        <OnlineBadge />
        <AvatarButton onPress={onAvatarPress} />
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(248,249,255,0.95)', // Figma: rgba(248,249,255,0.85) + blur
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  // Brand row ──────────────────────────────────────────
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                     // Figma gap: 8px
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 12,           // Figma: border-radius 12
    backgroundColor: colors.primary,  // #0056C6
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  nameCol: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,                     // Figma gap: 4px
  },
  appName: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 18,               // Figma: 18px
    lineHeight: 26,
    fontWeight: '800',
    color: '#0B1C30',
    letterSpacing: -0.45,       // Figma: letter-spacing -0.45px
  },
  aiPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainerHigh, // #DCE9FF
  },
  aiPillText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 10,               // Figma: 10px
    lineHeight: 15,
    fontWeight: '700',
    color: colors.primary,      // #0056C6
    letterSpacing: 1,           // Figma: letter-spacing 1px
    textTransform: 'uppercase',
  },

  // Right side ─────────────────────────────────────────
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                     // Figma gap: 8px
  },

  // Online badge ────────────────────────────────────────
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,                     // Figma gap: 6px
    paddingHorizontal: 10,      // Figma: padding 4px 10px
    paddingVertical: 4,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainerLow,  // #EFF4FF
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  onlineDot: {
    width: 8,                   // Figma: 8×8
    height: 8,
    borderRadius: 9999,
    backgroundColor: colors.tertiary,  // #006947
  },
  onlineText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 11,               // Figma: 11px
    lineHeight: 14,
    fontWeight: '600',
    color: colors.tertiary,     // #006947
  },

  // Avatar ──────────────────────────────────────────────
  avatarTouchable: {
    minWidth: 44,
    minHeight: 44,
    padding: 6,                 // Figma: padding 6px
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 32,                  // Figma: 32×32
    height: 32,
    borderRadius: 9999,
    backgroundColor: colors.primary,  // #0056C6
    alignItems: 'center',
    justifyContent: 'center',
  },
});
