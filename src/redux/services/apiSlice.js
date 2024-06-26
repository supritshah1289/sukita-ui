import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "src/utils/authUtil";
import { API_BASE_URL, ACCESS_TOKEN } from "../../constants/index";

// Define our single API slice object
// Define a service using a base URL and expected endpoints
// https://zudemwango.medium.com/how-to-post-and-fetch-data-using-rtk-query-in-react-native-99f94e721885
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  prepareHeaders: (headers, { getState }) => {

    headers.set('Content-Type', 'application/json');
    // headers.set('Access-Control-Allow-Origin', 'https://www.desilekh.com')
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')

    const token = getState().user.token;
    //commented code below to test headers 
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    //   headers.set('Access-Control-Allow-Origin', '*')
    //   headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    // }

    return headers;
  },
  tagTypes: ["ITEMS"], // Define tag types for grouping endpoints
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "/items",
      providesTags: ["ITEMS"], // associate the result of this mutation with the "users" tag
    }),
    getCurrentUser: builder.query({
      query: () => "/user/me",
    }),
    getCagtegories: builder.query({
      query: () => "/categories",
    }),
    getAddresses: builder.query({
      query: () => "/addresses",
    }),
    UserEmailById: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Include access token in the request header
        },
      }),
    }),
    getCurrentUserItems: builder.query({
      query: (currentUserId) => `/items/myItems/${currentUserId}`,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Include access token in the request header
      },
      providesTags: ["ITEMS"], // associate the result of this mutation with the "users" tag
    }),
    addItem: builder.mutation({
      
      query: ({ data, image }) => {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });

        formData.append("data", blob);
        formData.append("file", image, image.name);

        return {
          url: "/items",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["ITEMS"], // invalidate all queries/mutations with the "users" tag when this mutation is executed
    }),
    deleteItem: builder.mutation({
      query: (itemId) => ({
        url: `/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ITEMS"], // invalidate all queries/mutations with the "users" tag when this mutation is executed
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

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetItemsQuery,
  useGetCurrentUserQuery,
  useGetCurrentUserItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useGetCagtegoriesQuery,
  useGetAddressesQuery,
  useUserEmailByIdMutation,
} = apiSlice;
