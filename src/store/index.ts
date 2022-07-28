import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from 'store/slices/userSlice';
import productsReducer from 'store/slices/productsSlice';
import basketReducer from 'store/slices/basketSlice';
import categoriesReducer from 'store/slices/categoriesSlice';

const rootReducer = combineReducers({
  userReducer,
  productsReducer,
  basketReducer,
  categoriesReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer', 'basketReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
