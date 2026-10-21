/**
 * RecentQueries.js
 *
 * Recent conversation list under "RECENT QUERIES".
 *
 * Figma specs:
 *  - Section gap: 8px
 *  - Section title: 14px / 700 / #0B1C30, letter-spacing 0.7, UPPERCASE
 *  - "View History": 11px / 600 / #0056C6
 *  - List card: bg #FFFFFF, border-radius 16, padding 8px, gap 4px
 *  - Shadow: 0px 4px 20px -2px rgba(15,23,42,0.05)
 *  - Each row: padding 12px, border-radius 12, height 62px
 *  - Icon circle: 32×32, bg #E5EEFF, border-radius 9999
 *  - Row title: 14px / 600 / #0B1C30
 *  - Row summary: 13px / 400 / #424655
 *  - Timestamp: 11px / 500 / #727787, padding-left 8px
 *
 * Query icon: chat (MaterialIcons, 16px, #424655)
 *
 * Props:
 *  - queries        (array)    – recent query objects
 *  - onViewHistory  (function) – "View History" press
 *  - onQueryPress   (function) – called with queryId on row tap
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

function formatTimestamp(createdAt) {
  const elapsedMinutes = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);

  if (elapsedMinutes < 1) return 'Just now';
  if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours}h ago`;
  if (elapsedHours < 48) return 'Yesterday';

  return new Date(createdAt).toLocaleDateString();
}

// ─── Single row ───────────────────────────────────────────────────────────────
// Figma: flex-row, justify space-between, padding 12px, border-radius 12, height 62
function QueryRow({ iconName, title, summary, timestamp, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.8}>
      {/* Left: icon circle + text block */}
      <View style={styles.rowLeft}>
        {/* Icon circle: 32×32, bg #E5EEFF, border-radius 9999 */}
        <View style={styles.iconCircle}>
          <MaterialIcons name={iconName} size={16} color="#424655" />
        </View>

        {/* Text: title + summary (truncated) */}
        <View style={styles.textBlock}>
          <Text style={styles.rowTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.rowSummary} numberOfLines={1}>{summary}</Text>
        </View>
      </View>

      {/* Right: timestamp (padding-left 8px) */}
      <View style={styles.timestampMargin}>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function RecentQueries({
  queries = [],
  onViewHistory,
  onQueryPress,
}) {
  return (
    <View style={styles.section}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        {/* Title: 14px / 700 / #0B1C30, UPPERCASE, letter-spacing 0.7 */}
        <Text style={styles.sectionTitle}>Recent Queries</Text>

        {/* View History: 11px / 600 / #0056C6 */}
        <TouchableOpacity onPress={onViewHistory}>
          <Text style={styles.viewHistoryText}>View History</Text>
        </TouchableOpacity>
      </View>

      {/* List card */}
      <View style={styles.listCard}>
        {queries.length > 0 ? (
          queries.map((query) => (
            <QueryRow
              key={query.id}
              iconName="chat"
              title={query.title}
              summary={query.summary}
              timestamp={formatTimestamp(query.createdAt)}
              onPress={() => onQueryPress?.(query.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyState}>No recent queries yet.</Text>
        )}
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
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  viewHistoryText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 11,                // Figma: 11px / 600 / #0056C6
    lineHeight: 14,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
  emptyState: {
    padding: 12,
    color: colors.onSurfaceVariant,
    fontSize: 13,
  },

  // List card ───────────────────────────────────────────
  // Figma: bg #FFFFFF, border-radius 16, padding 8, gap 4
  // Shadow: 0 4 20 -2 rgba(15,23,42,0.05)
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    gap: 4,
    shadowColor: 'rgba(15,23,42,1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  // Row ────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,                 // Figma: padding 12px
    borderRadius: 12,            // Figma: border-radius 12
    minHeight: 62,               // Figma: height 62px
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,                      // Figma: gap 8px
    flex: 1,
    marginRight: 8,
  },

  // Icon circle ────────────────────────────────────────
  iconCircle: {
    width: 32,                   // Figma: 32×32
    height: 32,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainer,  // #E5EEFF
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Text block ─────────────────────────────────────────
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,                // Figma: 14px / 600 / #0B1C30
    lineHeight: 20,
    fontWeight: '600',
    color: '#0B1C30',
  },
  rowSummary: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 13,                // Figma: 13px / 400 / #424655
    lineHeight: 18,
    fontWeight: '400',
    color: '#424655',
  },

  // Timestamp ──────────────────────────────────────────
  // Figma: padding-left 8px
  timestampMargin: {
    paddingLeft: 8,
    flexShrink: 0,
  },
  timestamp: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 11,                // Figma: 11px / 500 / #727787
    lineHeight: 14,
    fontWeight: '500',
    color: '#727787',
  },
});
