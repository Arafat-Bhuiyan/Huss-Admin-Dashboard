import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import menuReducer from "../features/menuSlice";
import { api } from "../../redux/api/api";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: [
          "register",
          "rehydrate",
          "meta.baseQueryMeta.request",
          "meta.baseQueryMeta.response",
          "meta.arg.originalArgs",
        ],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
