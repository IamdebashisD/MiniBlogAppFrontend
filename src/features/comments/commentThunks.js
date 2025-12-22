import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js"

export const addComment = createAsyncThunk(
    'comments/add',
    async ({post_id, content}, {rejectWithValue}) => {
        try {
            const response = await api.post('/comments/add', {post_id, content})
            const body = response.data
            if (body.error_code) return rejectWithValue(body)
            return body.data
        } catch( error) {
            return rejectWithValue(error.response?.data?.message || error.data?.message)
        }
    }
)


export const fetchCommentsByPostId = createAsyncThunk(
    'comments/fetchByPostId',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/comments/get_by_post/${postId}`)
            const body = response.data
            if (body.error_code) return rejectWithValue(body)
            return body
        } catch (error) {
            return rejectWithValue(error.response.data || error.data?.message)
        }
    }
)