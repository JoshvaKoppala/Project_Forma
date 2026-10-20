/**
 * SessionControls.js
 *
 * "Switch Workspace" and "Log Out" buttons.
 *
 * Figma specs:
 *  - Outer wrapper: padding-top 8px, gap 8px
 *  - Switch Workspace: height 48, bg #DCE9FF, border-radius 12, gap 8
 *    - Icon: swap_horiz, color #0B1C30, 15×12
 *    - Text: 14px / 600 / #0B1C30, centered
 *  - Log Out: height 48, bg #FFDAD6, border-radius 12, gap 8
 *    - Shadow: 0 1px 2px rgba(0,0,0,0.05)
 *    - Icon: logout, color #93000A, 13.5×13.5
 *    - Text: 14px / 700 / #93000A, centered
 *  - Confirm bar (when shown):
 *    - bg #FFFFFF, border-radius 16, padding 12, gap 8, shadow
 *    - Body: 13px / 400 / #0B1C30, centered
 *    - Cancel btn: bg surface-container-low, border-radius 8, 9px label
 *    - Confirm btn: bg #BA1A1A, border-radius 8, 9px label white
 *
 * Props:
 *  - onSwitchWorkspace  (function)
 *  - onLogout           (function)
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

// ─── Inline logout confirmation bar ──────────────────────────────────────────
function LogoutConfirmBar({ onConfirm, onCancel }) {
  return (
    <View style={styles.confirmBar}>
      <Text style={styles.confirmText}>
        Are you sure you want to log out of this device?
      </Text>
      <View style={styles.confirmBtns}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutBtn} onPress={onConfirm}>
          <Text style={styles.signOutBtnText}>Yes, Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function SessionControls({ onSwitchWorkspace, onLogout }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutPress  = () => setShowConfirm(true);
  const handleCancel       = () => setShowConfirm(false);
  const handleConfirm      = () => { setShowConfirm(false); onLogout?.(); };

  return (
    // Figma: padding-top 8, gap 8 inside outer section wrapper
    <View style={styles.section}>
      {/* ── Switch Workspace ─────────────────────────── */}
      {/* Figma: flex-row, center, gap 8, height 48, bg #DCE9FF, border-radius 12 */}
      <TouchableOpacity
        style={styles.switchBtn}
        onPress={onSwitchWorkspace}
        activeOpacity={0.85}
      >
        {/* Icon: swap_horiz, 15×12, color #0B1C30 */}
        <MaterialIcons name="swap-horiz" size={18} color="#0B1C30" />
        <Text style={styles.switchText}>Switch Workspace</Text>
      </TouchableOpacity>

      {/* ── Log Out (with confirm) ────────────────────── */}
      <View>
        {/* Figma: flex-row, center, gap 8, height 48, bg #FFDAD6, border-radius 12, shadow */}
        <TouchableOpacity
          style={[styles.logoutBtn, showConfirm && styles.logoutBtnDimmed]}
          onPress={handleLogoutPress}
          disabled={showConfirm}
          activeOpacity={0.9}
        >
          {/* Icon: logout, color #93000A, 13.5×13.5 */}
          <MaterialIcons name="logout" size={14} color="#93000A" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Confirm bar — only visible after tapping Log Out */}
        {showConfirm && (
          <View style={styles.confirmGap}>
            <LogoutConfirmBar onConfirm={handleConfirm} onCancel={handleCancel} />
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  section: {
    paddingTop: 8,               // Figma outer: padding-top 8
    gap: 8,
  },

  // Switch Workspace ───────────────────────────────────
  switchBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: 48,                  // Figma: height 48
    backgroundColor: colors.surfaceContainerHigh, // #DCE9FF
    borderRadius: 12,
  },
  switchText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,                // Figma: 14px / 600 / #0B1C30
    lineHeight: 20,
    fontWeight: '600',
    color: '#0B1C30',
    textAlign: 'center',
  },

  // Log Out button ─────────────────────────────────────
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: 48,                  // Figma: height 48
    backgroundColor: colors.errorContainer,  // #FFDAD6
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutBtnDimmed: {
    opacity: 0.5,
  },
  logoutText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,                // Figma: 14px / 700 / #93000A
    lineHeight: 20,
    fontWeight: '700',
    color: '#93000A',
    textAlign: 'center',
  },

  // Confirm bar ─────────────────────────────────────────
  confirmGap: {
    marginTop: 8,
  },
  confirmBar: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  confirmText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: '#0B1C30',
    textAlign: 'center',
  },
  confirmBtns: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  cancelBtn: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: '#0B1C30',
  },
  signOutBtn: {
    flex: 1,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.error,     // #BA1A1A
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutBtnText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
