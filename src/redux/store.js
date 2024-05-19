import { setupListeners } from "@reduxjs/toolkit/query";
import {
  configureStore,
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-imports
  combineReducers,
} from "@reduxjs/toolkit";

import auth from "./services/authSlice";
import { apiSlice } from "./services/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// configure listeners using the provided defaults
setupListeners(store.dispatch);

// example for adding additional apiendpoints https://github.com/wpcodevo/setup-redux-toolkit/blob/master/src/redux/store.ts
