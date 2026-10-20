import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { storageService } from './src/services/storageService';
import { authService } from './src/services/authService';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // 1. App Startup: Check for saved token (Silent Login)
  useEffect(() => {
    const checkSavedSession = async () => {
      try {
        const token = await storageService.getToken();
        if (token) {
          console.log('Saved token found in Keychain! Fetching dashboard...');
          const data = await authService.fetchDashboard(token);
          setDashboardData(data);
        }
      } catch (error) {
        console.log('Session expired or invalid:', error.message);
        await storageService.removeToken();
      } finally {
        setLoading(false);
      }
    };

    checkSavedSession();
  }, []);

  // 2. Logout Handler
  const handleLogout = async () => {
    await storageService.removeToken();
    setDashboardData(null);
  };

  // 3. Show Loading Spinner on initial launch check
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // 4. Render Dashboard Screen if authenticated, otherwise Login Screen
  if (dashboardData) {
    return <DashboardScreen data={dashboardData} onLogout={handleLogout} />;
  }

  return <LoginScreen onLoginSuccess={setDashboardData} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});