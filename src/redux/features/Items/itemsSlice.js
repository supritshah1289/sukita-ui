import { createSlice } from "@reduxjs/toolkit";

import {
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} from "../../services/apiSlice";

// Create Redux slice for managing items state
const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    // Reducer for updating state when new items are fetched
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Extra reducers for handling RTK Query lifecycle actions
    builder.addCase(useGetItemsQuery.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(useAddItemMutation.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(useDeleteItemMutation.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.meta.arg);
    });
    builder.addCase(useUpdateItemMutation.fulfilled, (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.meta.arg.itemId
          ? { ...item, ...action.meta.arg.item }
          : item
      );
    });
  },
});

// Export action creators
export const { setItems } = itemsSlice.actions;

// Export reducer
export default itemsSlice.reducer;

// https://redux-toolkit.js.org/rtk-query/usage/examples
// TODO: invalidate the tags to refresh when the items are updated
// https://codesandbox.io/p/sandbox/github/reduxjs/redux-toolkit/tree/master/examples/query/react/kitchen-sink?file=%2Fsrc%2Fapp%2Fservices%2Fpost.ts%3A29%2C44-29%2C49&from-embed=
