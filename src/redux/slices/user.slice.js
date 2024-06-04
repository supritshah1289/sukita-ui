import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN } from 'src/constants'


const initialState = {
    token: null,
 }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      login: (state, action) => {
        // Store access token in local storage upon login and set state variable 
        localStorage.setItem("accessToken", action.payload);
        state.token = action.payload
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
})

// Action creators
export const { login, logout, setCurrentUser } = userSlice.actions;

export default userSlice.reducer
