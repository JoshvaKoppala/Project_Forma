/**
 * ChatInputBar.js
 *
 * Floating pill-shaped chat input pinned to the bottom.
 *
 * Figma specs:
 *  - Outer overlay: bg rgba(248,249,255,0.9), backdrop-blur 12
 *    Shadow: 0px -4px 20px -2px rgba(15,23,42,0.05)
 *  - Pill: bg #FFFFFF, border-radius 9999, padding 6px 12px, gap 4px
 *    Shadow: 0 2px 12px -2px rgba(0,112,255,0.08)
 *  - Leading icon: auto_awesome, color #727787, 18.33×18.33
 *  - Input: padding 9px 4px, 13px / 400 / #727787 placeholder
 *  - PDF context toggle: 36px high, border-radius 9999
 *    Shows whether PDF context is included with the request
 *  - Send button: 36×36, bg #0056C6, border-radius 9999
 *    Shadow: 0 1px 2px rgba(0,0,0,0.05)
 *    Icon: arrow_upward, white, 12×12
 *
 * Props:
 *  - value        (string)
 *  - onChangeText (function)
 *  - onSend       (function)
 *  - useContext   (boolean)
 *  - onToggleContext (function)
 *  - placeholder  (string)
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

export default function ChatInputBar({
  value,
  onChangeText,
  onSend,
  useContext,
  onToggleContext,
  placeholder = 'Ask JOSHVA anything...',
}) {
  return (
    // Figma: padding 6px 12px top, gap 4px between input row and nav
    <View style={styles.wrapper}>
      {/* Pill container */}
      <View style={styles.pill}>
        {/* Leading sparkle icon: auto_awesome, #727787, ~18px */}
        <View style={styles.leadingMargin}>
          <MaterialIcons name="auto-awesome" size={18} color="#727787" />
        </View>

        {/* Text input (flex-grow 1) */}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#727787"  // Figma: color #727787
          selectionColor={colors.primary}
          returnKeyType="send"
          onSubmitEditing={onSend}
          multiline={false}
          underlineColorAndroid="transparent"
        />

        {/* Toggle whether the request uses PDF context */}
        <TouchableOpacity
          style={[styles.contextToggle, useContext && styles.contextToggleActive]}
          onPress={onToggleContext}
          accessibilityLabel={useContext ? 'PDF context on' : 'PDF context off'}
          accessibilityRole="switch"
          accessibilityState={{ checked: useContext }}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name={useContext ? 'toggle-on' : 'toggle-off'}
            size={20}
            color={useContext ? colors.primary : colors.onSurfaceVariant}
          />
          <Text style={[styles.contextToggleText, useContext && styles.contextToggleTextActive]}>
            PDF
          </Text>
        </TouchableOpacity>

        {/* Send button: 36×36, bg #0056C6, border-radius 9999 */}
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={onSend}
          accessibilityLabel="Send prompt"
          activeOpacity={0.85}
        >
          {/* Icon: arrow_upward, white, 12px */}
          <MaterialIcons name="arrow-upward" size={18} color={colors.onPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,       // Figma outer padding 16px
    paddingTop: 6,               // Figma: padding 6px top
    paddingBottom: 4,
  },

  // Pill ───────────────────────────────────────────────
  // Figma: bg #FFFFFF, border-radius 9999, padding 6px 12px, gap 4
  // Shadow: 0 2 12 -2 rgba(0,112,255,0.08)
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: 'rgba(0,112,255,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },

  // Leading icon margin: padding-left 4
  leadingMargin: {
    paddingLeft: 4,
  },

  // Text input ─────────────────────────────────────────
  // Figma: padding 9px 4px (top/bottom), flex-grow 1
  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 13,                // Figma: 13px
    lineHeight: 16,
    fontWeight: '400',
    color: colors.onSurface,
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,          // Figma: padding 9px 4px
    paddingHorizontal: 4,
  },

  // PDF context toggle ─────────────────────────────────
  contextToggle: {
    minWidth: 54,
    height: 36,
    borderRadius: 9999,
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#F1F3F9',
  },
  contextToggleActive: {
    backgroundColor: '#EAF1FF',
  },
  contextToggleText: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '600',
  },
  contextToggleTextActive: {
    color: colors.primary,
  },

  // Send button ────────────────────────────────────────
  sendBtn: {
    width: 36,                   // Figma: 36×36
    height: 36,
    borderRadius: 9999,
    backgroundColor: colors.primary,  // #0056C6
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
