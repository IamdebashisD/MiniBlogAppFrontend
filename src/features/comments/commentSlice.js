import { createSlice } from '@reduxjs/toolkit'
import { fetchCommentsByPostId, addComment } from './commentThunks'



/* 


commentsByPostId: {
  [postId]: {
    items: [],        // comments array
    total: 0,         // total comments count
    loading: false,
    addLoading: false,
    error: null
    addError: null
  }
}   
  
*/




const initialState = {
    commentsByPostId: {}
}


const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        // ========= FETCH COMMENTS =========
        builder
        .addCase(fetchCommentsByPostId.pending, (state, action) => {
            const postId = action.meta.arg

            if (!state.commentsByPostId[postId]){
                state.commentsByPostId[postId] = {
                    items: [],
                    total: 0,
                    loading: true,
                    addLoading: false,
                    error: null,
                    addError: null
                }
            } else {
                state.commentsByPostId[postId].addLoading = true
                state.commentsByPostId[postId].addError = null

            }
        })

        .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
            const postId = action.meta.arg
            const comments = action.payload.data.comments_data

            state.commentsByPostId[postId] = {
                items: comments || [],
                total: comments?.length || 0,
                loading: false,
                addLoading: false,
                error: null,
                addError: null
            }
        })

        .addCase(fetchCommentsByPostId.rejected, (state, action) => {
            const postId = action.meta.arg

            state.commentsByPostId[postId] = {
                items: [],
                total: 0,
                loading: false,
                addLoading: false,
                error: action.error?.message,
                addError: null
            }
        })



        // ========= ADD COMMENT =========
        builder
        .addCase(addComment.pending, (state, action) => {
            const post_id  = action.meta.arg.post_id

            if (!state.commentsByPostId[post_id]){
                state.commentsByPostId[post_id] = {
                    items: [],
                    total: 0,
                    loading: false,
                    addLoading: true,
                    error: null,
                    addError: null
                }
            } else {
                state.commentsByPostId[post_id].addLoading = true 
                state.commentsByPostId[post_id].addError = null 
            }

        })
        .addCase(addComment.fulfilled, (state, action) => {
            const post_id = action.meta.arg.post_id
            console.log('NEW COMMENT:', action.payload)
            const newComment = action.payload

            if(!newComment) return

            state.commentsByPostId[post_id].items.unshift(newComment)
            state.commentsByPostId[post_id].total += 1
            state.commentsByPostId[post_id].addLoading = false
        })
        .addCase(addComment.rejected, (state, action) => {
            const post_id = action.meta.arg.post_id

            state.commentsByPostId[post_id].addLoading = false
            state.commentsByPostId[post_id].addError = action.payload || action.error?.message
        })



    }
})

export default commentsSlice.reducer