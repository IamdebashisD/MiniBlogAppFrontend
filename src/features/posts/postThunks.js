import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js"


export const createPost = createAsyncThunk(
    'post/upload',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await api.post('/post/upload', payload)
            const body = response.data
            if (body.error_code) return rejectWithValue(body)
            return body.data
        } catch(error){
            return rejectWithValue(error.response?.data?.message || error.data?.message)
        }
    }
)

export const updatePost = createAsyncThunk(
    'post/update',
    async ({postId, payload}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/post/update/${postId}`, payload)
            const body = response.data
            if(body.error_code) return rejectWithValue(body)
            return body.data
        } catch(error){
            return rejectWithValue(error.response?.data?.message || error.data?.message)
        }
    }
)

export const deletePost = createAsyncThunk(
    'post/delete',
    async (postId, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/post/delete/${postId}`)
            const body = response.data
            if(body.error_code) return rejectWithValue(body)
            return body.data
        } catch(error){
            return rejectWithValue(error.response?.data?.message || error.data?.message)
        }
    }
)

export const fetchAllPosts = createAsyncThunk(
    'post/fetchAllPosts',
    async ({page=1, per_page=10}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/post/get_all_posts?page=${page}&per_page=${per_page}`)
            const body = response.data
            console.log("FETCH ALL POSTS RESPONSE:", body)
            if (body.error_code) return rejectWithValue(body)
            return body.data
        } catch(error){
            return rejectWithValue(error.response?.data?.message || error.data?.message)
        }
    }
)

export const fetchPostByIdWithComments = createAsyncThunk(
    'post/fetchPostByIdWithComments',
    async (postId, {rejectWithValue}) => {
        try {
            const [postResponse, commentsResponse] = await Promise.all([
                api.get(`/post/get_post_byId/${postId}`),
                api.get(`/comments/get_by_post/${postId}`)
            ])
            const postBody = postResponse.data
            const commentsBody = commentsResponse.data
            if (postBody.error_code) return rejectWithValue(postBody)
            if (commentsBody.error_code) return rejectWithValue(commentsBody)
            return {
                post: postBody.data,
                comments: commentsBody.data
            }
        } catch(error){
            return rejectWithValue(error.response?.data?.message || error.data?.message)
        }
    }
)

export const toggleLikeOnPost = createAsyncThunk(
    'post/toggleLikeOnPost',
    async (postId, {rejectWithValue}) => {
        try {
            const response = await api.post(`/like/toggle_like/${postId}`)
            const body = response.data
            if(body.error_code) return rejectWithValue(body)
            return {
                postId,
                liked: body.data.liked
            }
        } catch(error){
            return rejectWithValue(error.response?.data?.message || error.data?.message)
        }
    }
)