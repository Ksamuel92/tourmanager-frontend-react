import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tourManagerApi } from "../services/api";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [tourManagerApi.reducerPath]: tourManagerApi.reducer,
    authReducer: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tourManagerApi.middleware),
});

setupListeners(store.dispatch);
