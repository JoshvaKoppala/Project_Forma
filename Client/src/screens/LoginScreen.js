import React, { useState } from 'react';

import {

  StyleSheet,

  Text,

  View,

  TextInput,

  TouchableOpacity,

  ActivityIndicator,

  Alert,

} from 'react-native';

import * as WebBrowser from 'expo-web-browser';

import * as AuthSession from 'expo-auth-session';

import { CONFIG } from '../config/config';

import { authService } from '../services/authService';

import { storageService } from '../services/storageService';



WebBrowser.maybeCompleteAuthSession();



export default function LoginScreen({ onLoginSuccess }) {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);



  // 1. Password Login Handler

  const handlePasswordLogin = async () => {

    if (!username.trim() || !password.trim()) {

      Alert.alert('Validation Error', 'Please enter both username and password.');

      return;

    }



    setLoading(true);

    try {

      // Step A: Get JWT from Keycloak via authService

      const token = await authService.loginWithPassword(username, password);

      console.log("toke : "+token)

      // Step B: Save token securely via storageService

      await storageService.saveToken(token);

      // Step C: Fetch dashboard data from Spring Boot

      const dashboard = await authService.fetchDashboard(token);

      // Step D: Notify App.js

      onLoginSuccess(dashboard);

    } catch (error) {

      console.error('Login error:', error);

      Alert.alert('Login Failed', error.message);

    } finally {

      setLoading(false);

    }

  };



  // 2. Social Login Handler (Google / GitHub)

  const handleSocialLogin = async (provider) => {

    try {

      setLoading(true);

      const redirectUri = AuthSession.makeRedirectUri();

      const idpHint = provider.toLowerCase();



      const authUrl =

        `${CONFIG.KEYCLOAK_AUTH_URL}` +

        `?client_id=${CONFIG.CLIENT_ID}` +

        `&response_type=code` +

        `&scope=openid` +

        `&redirect_uri=${encodeURIComponent(redirectUri)}` +

        `&kc_idp_hint=${idpHint}`;



      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);



      if (result.type === 'success' && result.url) {

        console.log('Redirected back with URL:', result.url);



        // IGNORE empty redirect bursts that don't contain a code or error

        if (!result.url.includes('code=') && !result.url.includes('error=')) {

          console.log('Ignoring intermediate empty redirect event...');

          return;

        }



        const codeMatch = result.url.match(/[?&]code=([^&]+)/);

        const code = codeMatch ? decodeURIComponent(codeMatch[1]) : null;



        const errorMatch = result.url.match(/[?&]error=([^&]+)/);

        const error = errorMatch ? decodeURIComponent(errorMatch[1]) : null;



        if (error) {

          throw new Error(`Authentication error: ${error}`);

        }



        if (!code) {

          console.log('User dismissed or cancelled login.');

          return;

        }



        console.log('Extracted Code successfully:', code);



        // Proceed with your token exchange...

        try {

          const token = await authService.exchangeSocialCode(code, redirectUri);

          await storageService.saveToken(token);

          const dashboard = await authService.fetchDashboard(token);

          onLoginSuccess(dashboard);

        } catch (exchangeError) {

          console.error('Token Exchange / Dashboard fetch failed:', exchangeError);

          Alert.alert('Login Failed', exchangeError.message || 'Failed to exchange token with server.');

        }

      }

    } catch (error) {

      console.error('Social Login error:', error);

      Alert.alert('Social Login Failed', error.message);

    } finally {

      setLoading(false);

    }

  };



  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>Forma</Text>

        <Text style={styles.subtitle}>Sign in to your account</Text>



        <TextInput

          style={styles.input}

          placeholder="Username"

          placeholderTextColor="#888"

          value={username}

          onChangeText={setUsername}

          autoCapitalize="none"

          editable={!loading}

        />



        <TextInput

          style={styles.input}

          placeholder="Password"

          placeholderTextColor="#888"

          value={password}

          onChangeText={setPassword}

          secureTextEntry

          autoCapitalize="none"

          editable={!loading}

        />



        <TouchableOpacity

          style={[styles.button, loading && styles.buttonDisabled]}

          onPress={handlePasswordLogin}

          disabled={loading}

        >

          {loading ? (

            <ActivityIndicator color="#fff" />

          ) : (

            <Text style={styles.buttonText}>Log In</Text>

          )}

        </TouchableOpacity>



        {/* Divider */}

        <View style={styles.dividerContainer}>

          <View style={styles.dividerLine} />

          <Text style={styles.dividerText}>OR</Text>

          <View style={styles.dividerLine} />

        </View>



        {/* Google */}

        <TouchableOpacity

          style={[styles.socialButton, styles.googleButton]}

          onPress={() => handleSocialLogin('Google')}

          disabled={loading}

        >

          <Text style={styles.googleButtonText}>Sign in with Google</Text>

        </TouchableOpacity>



        {/* GitHub */}

        <TouchableOpacity

          style={[styles.socialButton, styles.githubButton]}

          onPress={() => handleSocialLogin('GitHub')}

          disabled={loading}

        >

          <Text style={styles.githubButtonText}>Sign in with GitHub</Text>

        </TouchableOpacity>

      </View>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#f5f5f5',

    justifyContent: 'center',

    alignItems: 'center',

    padding: 20,

  },

  card: {

    width: '100%',

    maxWidth: 400,

    backgroundColor: '#fff',

    borderRadius: 12,

    padding: 24,

    shadowColor: '#000',

    shadowOpacity: 0.1,

    shadowRadius: 10,

    elevation: 3,

  },

  title: {

    fontSize: 28,

    fontWeight: 'bold',

    color: '#333',

    textAlign: 'center',

    marginBottom: 8,

  },

  subtitle: {

    fontSize: 14,

    color: '#666',

    textAlign: 'center',

    marginBottom: 24,

  },

  input: {

    height: 50,

    borderWidth: 1,

    borderColor: '#ddd',

    borderRadius: 8,

    paddingHorizontal: 16,

    fontSize: 16,

    marginBottom: 16,

    backgroundColor: '#fafafa',

  },

  button: {

    height: 50,

    backgroundColor: '#007AFF',

    borderRadius: 8,

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 8,

  },

  buttonDisabled: {

    backgroundColor: '#7fbbf8',

  },

  buttonText: {

    color: '#fff',

    fontSize: 16,

    fontWeight: '600',

  },

  dividerContainer: {

    flexDirection: 'row',

    alignItems: 'center',

    marginVertical: 20,

  },

  dividerLine: {

    flex: 1,

    height: 1,

    backgroundColor: '#e0e0e0',

  },

  dividerText: {

    marginHorizontal: 10,

    color: '#888',

    fontSize: 14,

  },

  socialButton: {

    height: 48,

    borderRadius: 8,

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 12,

    borderWidth: 1,

  },

  googleButton: {

    backgroundColor: '#fff',

    borderColor: '#dadce0',

  },

  googleButtonText: {

    color: '#3c4043',

    fontSize: 15,

    fontWeight: '600',

  },

  githubButton: {

    backgroundColor: '#24292e',

    borderColor: '#24292e',

  },

  githubButtonText: {

    color: '#fff',

    fontSize: 15,

    fontWeight: '600',

  },

});
