import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'user_token';

export const storageService = {
  // Save encrypted JWT
  saveToken: async (token) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  // Retrieve encrypted JWT
  getToken: async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  // Delete token on logout
  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};