import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {} from 'redux';
import userReducer from './userSlice';
import transactionReducer from './transactionSlice';
import accountReducer from './accountSlice';
import authReducer from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import SecureStoreStorage from '@/hooks/secureStore';

const securePersistConfig = {
  key: 'auth',
  storage: SecureStoreStorage,
  whitelist: ['token', 'access'],
};

const generalPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'transaction', 'account'],
};

const rootReducer = combineReducers({
  auth: persistReducer(securePersistConfig, authReducer),
  user: userReducer,
  transaction: transactionReducer,
  account: accountReducer,
});

const persistedReducer = persistReducer(generalPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
