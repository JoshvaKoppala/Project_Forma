/**
 * HomeScreen.js
 *
 * The main screen a user sees after logging in.
 *
 * This file is intentionally kept SHORT — it only assembles the
 * pre-built components and wires up their callbacks.
 * All the visual logic lives in the individual component files.
 *
 * Component tree:
 *
 *  <SafeAreaView>                  ← handles notch / status-bar insets
 *    <AppHeader />                 ← top bar (JOSHVA AI + online badge + avatar)
 *    <ScrollView>                  ← scrollable content area
 *      <WelcomeCard />             ← personalized welcome hero card
 *      <InstantActions />          ← 2-column shortcut tiles
 *      <RecentQueries />             ← recent conversation list
 *      <SessionControls />         ← Switch Workspace + Log Out
 *    </ScrollView>
 *    <View (bottom bar)>
 *      <ChatInputBar />            ← floating text input
 *      <BottomNavBar />            ← Chat / Knowledge / History / Profile tabs
 *    </View>
 *  </SafeAreaView>
 *
 * Props:
 *  - data      (any)       – user / session data from the auth service
 *  - onLogout  (function)  – called when the user confirms logout
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ── Import all components from the single barrel export ───────────────────────
import {
  AppHeader,
  WelcomeCard,
  InstantActions,
  RecentQueries,
  SessionControls,
  ChatInputBar,
  BottomNavBar,
} from '../components';

import { colors, spacing } from '../theme';
import { aiAgentService } from '../services/aiAgentService';
import { storageService } from '../services/storageService';

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen({ data, onLogout }) {
  // Which bottom tab is active ('chat' | 'knowledge' | 'history' | 'profile')
  const [activeTab, setActiveTab] = useState('chat');

  // Text currently typed into the chat input bar
  const [chatInput, setChatInput] = useState('');
  const [usePdfContext, setUsePdfContext] = useState(true);
  const [recentQueries, setRecentQueries] = useState([]);
  const username = typeof data === 'string' ? data.trim() : '';

  useEffect(() => {
    let isMounted = true;

    if (!username) {
      setRecentQueries([]);
      return () => {
        isMounted = false;
      };
    }

    setRecentQueries([]);
    storageService.getRecentQueries(username)
      .then((queries) => {
        if (isMounted) setRecentQueries(queries);
      })
      .catch((error) => {
        Alert.alert(
          'Unable to load recent queries',
          error instanceof Error ? error.message : 'An unexpected error occurred.',
        );
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  // Called when user presses the send button
  const handleSend = async () => {
    if (!chatInput.trim()) return;

    try {
      const answer = usePdfContext
        ? await aiAgentService.askWithContext(chatInput)
        : await aiAgentService.askDirectly(chatInput);
      setChatInput((currentInput) => currentInput === chatInput ? '' : currentInput);

      if (username) {
        try {
          await storageService.addRecentQuery(username, chatInput, usePdfContext);
          const queries = await storageService.getRecentQueries(username);
          setRecentQueries(queries);
        } catch (error) {
          Alert.alert(
            'Query completed, but history was not saved',
            error instanceof Error ? error.message : 'An unexpected error occurred.',
          );
        }
      }

      Alert.alert('JOSHVA AI', answer || 'The AI returned an empty response.');
    } catch (error) {
      Alert.alert(
        'Unable to send message',
        error instanceof Error ? error.message : 'An unexpected error occurred.',
      );
    }
  };

  // Called when user taps a recent query row
  const handleQueryPress = (queryId) => {
    console.log('Tapped query:', queryId);
    // TODO: navigate to that conversation thread
  };

  // Called when user taps "View History"
  const handleViewHistory = () => {
    setActiveTab('history');
    // TODO: navigate to history screen / tab
  };

  // Called when user taps "Switch Workspace"
  const handleSwitchWorkspace = () => {
    console.log('Switch workspace tapped');
    // TODO: open workspace switcher modal / screen
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

        {/* ── Top bar ── */}
        <AppHeader onAvatarPress={() => setActiveTab('profile')} />

        {/* ── Scrollable content ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero / greeting card */}
          <WelcomeCard
            userName={data}
            onDailyAction={() => console.log('Daily action tapped')}
          />

          {/* 2-column shortcut tiles */}
          <InstantActions />

          {/* Recent conversations */}
          <RecentQueries
            queries={recentQueries}
            onViewHistory={handleViewHistory}
            onQueryPress={handleQueryPress}
          />

          {/* Workspace + logout controls */}
          <SessionControls
            onSwitchWorkspace={handleSwitchWorkspace}
            onLogout={onLogout}
          />
        </ScrollView>

        {/* ── Pinned bottom bar (input + tab nav) ── */}
        <View style={styles.bottomBar}>
          <ChatInputBar
            value={chatInput}
            onChangeText={setChatInput}
            onSend={handleSend}
            useContext={usePdfContext}
            onToggleContext={() => setUsePdfContext((enabled) => !enabled)}
          />
          <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.gutter,
    gap: spacing.lg,
    paddingBottom: 120,   // extra room so content isn't hidden behind bottom bar
  },

  // Pinned footer ──────────────────────────────────────
  bottomBar: {
    backgroundColor: colors.surface,
    // top shadow (upward)
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
  },
});