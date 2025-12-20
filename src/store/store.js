// Redux store config
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import userReducer from '../features/user/userSlice.js'
import postReducer from '../features/posts/postSlice.js'
import likeReducer from '../features/likes/likeSlice.js'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        like: likeReducer
    }
})


