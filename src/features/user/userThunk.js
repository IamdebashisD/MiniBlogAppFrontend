import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import api from '../../api/axios.js';
import { setUser } from '../../services/token.service.js';

export const fetchUserProfile = createAsyncThunk(
    'user/profile',
    async (_, { rejectWithValue }) => {
        try{
            const response = await api.get('/user/profile')
            const body = response.data
            if(body.error_code) return rejectWithValue(body)
            const data = body.data
            setUser(data)
            return data 
        } catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    'user/updated',
    async (payload, { rejectWithValue}) => {
        try{
            const response = await api.put('/user/updated', payload)
            const body = response.data
            if(body.error_code) return rejectWithValue(body)
            const data = body.data
            setUser(data)
            return data
        } catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const fetchUserComments = createAsyncThunk(
    'user/comments',
    async(userId, {rejectWithValue}) => {
        try{
            const response = await api.get(`/comments/get_by_user/${userId}`)
            const body = response.data
            if(body.error_code) return rejectWithValue(body)
            return body.data
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)