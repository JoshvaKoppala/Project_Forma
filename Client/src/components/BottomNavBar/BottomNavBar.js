/**
 * BottomNavBar.js
 *
 * The bottom tab navigation bar shown on all main screens.
 *
 * Tabs:
 *   Chat  |  Knowledge  |  History  |  Profile
 *
 * The active tab is highlighted with the primary blue color.
 * All other tabs are shown in a muted grey.
 *
 * Props:
 *  - activeTab    (string)   – which tab is currently selected:
 *                              'chat' | 'knowledge' | 'history' | 'profile'
 *  - onTabPress   (function) – called with the tab key (string) when tapped
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// ─── Tab configuration ────────────────────────────────────────────────────────
const TABS = [
  { key: 'chat',      icon: 'chat-bubble-outline',  lib: MaterialIcons, label: 'Chat'      },
  { key: 'knowledge', icon: 'book-open',            lib: Feather,       label: 'Knowledge' },
  { key: 'history',   icon: 'clock',                lib: Feather,       label: 'History'   },
  { key: 'profile',   icon: 'user',                 lib: Feather,       label: 'Profile'   },
];

// ─── Single tab button ────────────────────────────────────────────────────────
function TabItem({ tabKey, icon: IconComponent, iconName, label, isActive, onPress }) {
  const color = isActive ? colors.primary : colors.onSurfaceVariant;

  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={() => onPress(tabKey)}
      accessibilityLabel={label}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      <IconComponent
        name={iconName}
        size={22}
        color={color}
        style={styles.tabIcon}
      />
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Main exported component ───────────────────────────────────────────────────
export default function BottomNavBar({ activeTab = 'chat', onTabPress }) {
  return (
    <View style={styles.navbar}>
      {TABS.map((tab) => (
        <TabItem
          key={tab.key}
          tabKey={tab.key}
          icon={tab.lib}
          iconName={tab.icon}
          label={tab.label}
          isActive={activeTab === tab.key}
          onPress={onTabPress}
        />
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: spacing.gutter,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },

  // Individual tab ─────────────────────────────────────
  tab: {
    flex: 1,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  // Icon ───────────────────────────────────────────────
  tabIcon: {
    // Opacity handled via color prop mapping
  },

  // Label text ─────────────────────────────────────────
  tabLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    opacity: 0.7,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
    opacity: 1,
  },
});