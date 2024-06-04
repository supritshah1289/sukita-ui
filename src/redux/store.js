import { setupListeners } from "@reduxjs/toolkit/query";
import {
  configureStore
} from "@reduxjs/toolkit";

import { apiSlice } from "./services/apiSlice";


//import reducers 
import userReducer from './slices/user.slice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// configure listeners using the provided defaults
setupListeners(store.dispatch);

// example for adding additional apiendpoints https://github.com/wpcodevo/setup-redux-toolkit/blob/master/src/redux/store.ts
