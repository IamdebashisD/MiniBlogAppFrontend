import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios.js'
import { setAccessToken,setRefreshToken, setUser, clearTokens, getRefreshToken } from '../../services/token.service'


export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    try{
        const response = await api.post('auth/login', payload)
        const body = response.data
        if(body.error_code) return rejectWithValue(body);
        const data = body.data
        setAccessToken(data.access_token)
        setRefreshToken(data.refresh_token)
        if(data.user) setUser(data.user);
        return data
    } catch(error){
        return rejectWithValue(error.resposne?.data?.message || error.message);
    }
})


export const registerUser = createAsyncThunk('auth/register', async (payload, {rejectWithValue}) => {
    try{
        const response = await api.post('auth/register', payload);
        const body = response.data
        if(body.error_code) return rejectWithValue(body)
        return body.data
    } catch(error){
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const logoutUser = createAsyncThunk('auth/logout', async (_, {rejectWithValue}) => {
    try{
        await api.post('auth/logout', { refresh_token: getRefreshToken() })
        clearTokens();
        return true
    }catch(error){
        clearTokens();
        return rejectWithValue(error.response?.data || error.message)
    }
})