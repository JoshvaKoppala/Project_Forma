import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'user_token';
const RECENT_QUERIES_LIMIT = 3;
const RECENT_QUERY_TITLE_LENGTH = 100;

const getRecentQueriesKey = (username) =>
  `recent_queries_${encodeURIComponent(username.trim())}`;

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

  getRecentQueries: async (username) => {
    const storedQueries = await SecureStore.getItemAsync(getRecentQueriesKey(username));
    return storedQueries ? JSON.parse(storedQueries) : [];
  },

  addRecentQuery: async (username, query, usePdfContext) => {
    const recentQueries = await storageService.getRecentQueries(username);
    const titleCharacters = [...query.trim()];
    const title = titleCharacters.slice(0, RECENT_QUERY_TITLE_LENGTH).join('');

    recentQueries.unshift({
      id: `${Date.now()}`,
      title: titleCharacters.length > RECENT_QUERY_TITLE_LENGTH ? `${title}…` : title,
      summary: usePdfContext ? 'PDF context' : 'Direct AI',
      createdAt: new Date().toISOString(),
    });

    await SecureStore.setItemAsync(
      getRecentQueriesKey(username),
      JSON.stringify(recentQueries.slice(0, RECENT_QUERIES_LIMIT)),
    );
  },
};