import { createSlice } from "@reduxjs/toolkit";

// current user is an object
const initialState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Store access token in local storage upon login
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state) => {
      // Remove access token from local storage upon logout
      localStorage.removeItem("accessToken");
      state.currentUser = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators
export const { login, logout, setCurrentUser } = authSlice.actions;

// Async action creator for fetching the current user
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    // Fetch current user data from the server
    const response = await fetch("/api/current-user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include access token in the request header
      },
    });
    const currentUser = await response.json();

    // Dispatch action to set the current user in the state
    dispatch(setCurrentUser(currentUser));
  } catch (error) {
    console.error("Error fetching current user:", error);
    // Handle error, dispatch another action, etc.
  }
};

export default authSlice.reducer;
