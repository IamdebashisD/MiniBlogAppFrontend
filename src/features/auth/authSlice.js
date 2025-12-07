import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser, logoutUser } from './authThunks'
import { getUser, getAccessToken } from '../../services/token.service'

const initialState = {
    user: getUser(),
    token: getAccessToken(),
    loading: false,
    error: null,
    isAuthenticated: !!getAccessToken()
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserFromStorage: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = !!state.user
        },
        clearAuthState: (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

        //login
        .addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user || action.payload
            state.token = action.payload.access_token
            state.isAuthenticated = true 
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || action.error?.message
        })


        // register
        .addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || action.error?.message
        })
        

        // Logout
        .addCase(logoutUser.pending, (state) => {
            state.loading = true
            state.error = null
            state.isAuthenticated = false
            state.user = null
            state.token = null
        })
        .addCase(logoutUser.fulfilled, (state, action) =>{
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.token = null
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.token = null
            state.isAuthenticated = false
            state.error = action.payload?.message || action.error?.message
        })
    }

})

export const { setUserFromStorage, clearAuthState } = authSlice.actions
export default authSlice.reducer