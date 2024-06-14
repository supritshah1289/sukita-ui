import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN } from 'src/constants'


const initialState = {
    token: null,
    currentUser: null,
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
      setUser: (state, action) => {
        state.currentUser = action.payload;
      },
    },
})

// Action creators
export const { login, logout, setUser } = userSlice.actions;

//selectors to access variable
export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer

