import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../../constants";

// Define RTK Query API slice
export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }), // Adjust base URL as needed
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "/items",
    }),
    addItem: builder.mutation({
      query: (item) => ({
        url: "/items",
        method: "POST",
        body: item,
      }),
    }),
    deleteItem: builder.mutation({
      query: (itemId) => ({
        url: `/items/${itemId}`,
        method: "DELETE",
      }),
    }),
    updateItem: builder.mutation({
      query: ({ itemId, item }) => ({
        url: `/items/${itemId}`,
        method: "PUT",
        body: item,
      }),
    }),
  }),
});

// Export RTK Query hooks
export const {
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = itemsApi;
