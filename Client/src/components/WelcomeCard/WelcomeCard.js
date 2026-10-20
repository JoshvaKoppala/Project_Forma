/**
 * WelcomeCard.js
 *
 * Hero card at the top of the Home screen.
 *
 * Figma specs:
 *  - Container: padding 24px, bg #FFFFFF, border-radius 16, shadow
 *  - Glow blob: absolute, 160×160, right -48, top -48, blur 32
 *  - Model badge: bg #EFF4FF, padding 4px 10px, gap 6, border-radius 9999
 *  - Heading: 26px / 800 / #0B1C30, letter-spacing -0.65
 *  - Subtitle: 14px / 400 / #424655, line-height 19
 *  - Action btn: padding 12px, bg #EFF4FF, border-radius 12
 *  - Action icon box: 32×32, bg #D9E2FF, border-radius 8
 *
 * Props:
 *  - userName       (string)   – shown in "Welcome back, <name>"
 *  - onDailyAction  (function) – tapping the action button
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

// ─── Model version badge ───────────────────────────────────────────────────────
// Figma: bg #EFF4FF, border-radius 9999, padding 4px 10px, gap 6px
// Dot: 7.77×8, bg #006947
// Text: 11px / 600 / #006947, letter-spacing 0.275
function ModelBadge() {
  return (
    <View style={styles.modelBadge}>
      <View style={styles.modelDot} />
      <Text style={styles.modelBadgeText}>
        Model v1.0{'  '}•{'  '}speed 1 terahertz, memory 1 zettabyte
      </Text>
    </View>
  );
}

// ─── "What did JOSHVA do today?" action button ───────────────────────────────
// Figma: flex-row, justify space-between, padding 12px, bg #EFF4FF, border-radius 12
// Icon box: 32×32, bg #D9E2FF, border-radius 8
// Icon: psychology, color #0056C6 (14.26×15)
// Text: 14px / 600 / #0B1C30
// Arrow: arrow_forward, color #0056C6 (13.33×13.33)
function DailyActionButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.85}>
      {/* Left: icon box + label */}
      <View style={styles.actionLeft}>
        <View style={styles.actionIconBox}>
          <MaterialIcons name="psychology" size={15} color={colors.primary} />
        </View>
        <Text style={styles.actionLabel}>What did JOSHVA do today?</Text>
      </View>

      {/* Right: forward arrow */}
      <MaterialIcons name="arrow-forward" size={13} color={colors.primary} />
    </TouchableOpacity>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function WelcomeCard({ userName = 'Alex', onDailyAction }) {
  return (
    // isolation: isolate + overflow hidden to contain the absolute glow blob
    <View style={styles.card}>
      {/* Decorative glow: absolute, 160×160, right -48, top -48, blur ~32 */}
      <View style={styles.glowBlob} pointerEvents="none" />

      {/* Inner content (z-index 1 over glow) */}
      <View style={styles.content}>
        {/* Row 0: model badge */}
        <ModelBadge />

        {/* Row 1: heading + subtitle (margin top 4px, gap 3.125px) */}
        <View style={styles.headingBlock}>
          <Text style={styles.heading}>Welcome back, {userName}</Text>
          <View style={styles.subtitleMargin}>
            <Text style={styles.subtitle}>
              Ask anything about JOSHVA — your intelligent, smart and funny companion.
            </Text>
          </View>
        </View>

        {/* Row 2: action button (margin top 8px) */}
        <View style={styles.actionMargin}>
          <DailyActionButton onPress={onDailyAction} />
        </View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 24,       // Figma: padding 24px
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,            // Figma: border-radius 16
    overflow: 'hidden',          // clips the glow blob
    shadowColor: 'rgba(15,23,42,1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  // Glow blob ──────────────────────────────────────────
  // Figma: position absolute, 160×160, right -48, top -48
  // bg rgba(217,226,255,0.5), blur 32 (approximated)
  glowBlob: {
    position: 'absolute',
    width: 160,
    height: 160,
    right: -48,
    top: -48,
    borderRadius: 9999,
    backgroundColor: 'rgba(217,226,255,0.5)',
    // React Native doesn't support filter:blur — the blob colour provides ambient effect
  },

  // Content stack ──────────────────────────────────────
  content: {
    gap: 8,                      // Figma inner gap: 8px
  },

  // Model badge ────────────────────────────────────────
  modelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainerLow,  // #EFF4FF
  },
  modelDot: {
    width: 8,                    // Figma: 7.77×8 ≈ 8×8
    height: 8,
    borderRadius: 9999,
    backgroundColor: colors.tertiary,  // #006947
  },
  modelBadgeText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    color: colors.tertiary,      // #006947
    letterSpacing: 0.275,
  },

  // Heading block ──────────────────────────────────────
  headingBlock: {
    marginTop: 4,                // Figma padding top 4px in margin wrapper
  },
  heading: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 26,                // Figma: 26px
    lineHeight: 34,
    fontWeight: '800',
    color: '#0B1C30',
    letterSpacing: -0.65,        // Figma: -0.65px
  },
  subtitleMargin: {
    paddingTop: 3.125,           // Figma: padding 3.125px 0 0
  },
  subtitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,                // Figma: 14px
    lineHeight: 19,              // Figma: line-height 19px
    fontWeight: '400',
    color: '#424655',
  },

  // Action button ──────────────────────────────────────
  actionMargin: {
    paddingTop: 8,               // Figma: padding 8px 0 0
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,                 // Figma: padding 12px
    borderRadius: 12,            // Figma: border-radius 12
    backgroundColor: colors.surfaceContainerLow,  // #EFF4FF
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionIconBox: {
    width: 32,                   // Figma: 32×32
    height: 32,
    borderRadius: 8,             // Figma: border-radius 8
    backgroundColor: colors.primaryFixed,  // #D9E2FF
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,                // Figma: 14px / 600
    lineHeight: 20,
    fontWeight: '600',
    color: '#0B1C30',
  },
});
