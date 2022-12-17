import { configureStore } from "@reduxjs/toolkit";
import baseService from "./services/baseService";
import analytics from "./store/analytics";

export const store = configureStore({
  reducer: {
    [baseService.reducerPath]: baseService.reducer,
    analytics: analytics,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseService.middleware
    ),
});
