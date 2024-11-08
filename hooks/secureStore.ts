import * as SecureStore from 'expo-secure-store';
import { PersistConfig, Storage } from 'redux-persist';

// Define a utility function to sanitize keys
function sanitizeKey(key: string) {
  // Replace all characters not allowed by SecureStore
  return key.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// Custom SecureStore with key sanitization
const SecureStoreStorage: Storage = {
  async setItem(key, value) {
    const sanitizedKey = sanitizeKey(key);
    await SecureStore.setItemAsync(sanitizedKey, value);
  },
  async getItem(key) {
    const sanitizedKey = sanitizeKey(key);
    const value = await SecureStore.getItemAsync(sanitizedKey);
    return value;
  },
  async removeItem(key) {
    const sanitizedKey = sanitizeKey(key);
    await SecureStore.deleteItemAsync(sanitizedKey);
  },
};

export default SecureStoreStorage;
