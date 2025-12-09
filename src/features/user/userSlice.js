import {fetchUserProfile, updateUserProfile, fetchUserComments} from './userThunk.js'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    profile: null,
    comments: [],
    isLoading: false,

    profileFetched: false,
    commentsFetched: false,

    isError: null,
    isUpdated: false,
    isFetched: false,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder)=> {
        builder
        // Fetch profile
        .addCase(fetchUserProfile.pending, (state)=> {
            state.isLoading = true
            state.isError = null
            state.profileFetched = false
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.profile = action.payload
            state.profileFetched = true
        })
        .addCase(fetchUserProfile.rejected, (state,action) => {
            state.isLoading = false
            state.isError = action.payload?.message || action.payload || action.error?.message
            state.profileFetched = false
        })

        // Update profile
        .addCase(updateUserProfile.pending, (state) => {
            state.isLoading = true
            state.isError = null
            state.isUpdated = false
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.isLoading = false
            state.profile = action.payload
            state.isUpdated = true
            state.isError = null
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload?.message || action.error?.message
            state.isUpdated = false
        })

        // Fetch user comments
        .addCase(fetchUserComments.pending, (state, action) => {
            state.isLoading = true
            state.commentsFetched = false
            state.comments = []
            state.isError = null
        })
        .addCase(fetchUserComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.comments = action.payload
            state.commentsFetched = true
        })
        .addCase(fetchUserComments.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload?.message || action.payload || action.error?.message
            state.commentsFetched = false
        })
    }
})

export default userSlice.reducer
