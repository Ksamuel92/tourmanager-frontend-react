import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tourManagerApi } from "../services/api";
import { showReducer } from "../store/shows/show-slice";

export const store = configureStore({
  reducer: {
    [tourManagerApi.reducerPath]: tourManagerApi.reducer,
    show: showReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tourManagerApi.middleware),
});

setupListeners(store.dispatch);
