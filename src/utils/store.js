import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import themeSlice from "./reducers/themeSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import toastSlice from "./reducers/toastSlice";
import boardSlice from "./reducers/boardSlice";
import modelSlice from "./reducers/modelSlice";
import taskSlice from "./reducers/taskSlice";

const rootReducers = combineReducers({
  user: userSlice,
  theme: themeSlice,
  toast: toastSlice,
  boards: boardSlice,
  model: modelSlice,
  tasks: taskSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
