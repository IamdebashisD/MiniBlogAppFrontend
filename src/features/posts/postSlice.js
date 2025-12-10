import { createSlice } from "@reduxjs/toolkit";
import { 
    createPost, 
    updatePost, 
    deletePost, 
    fetchAllPosts, 
    fetchPostByIdWithComments, 
    toggleLikeOnPost
 } from "./postThunks";

const initialState = {
    // Post data
    posts: [],
    currentPost: null,

    // Pagination
    pagination: {
        page: 1,
        per_page: 10,
        total: 0,
        has_more: true
    },

    // loading states
    loading: false,             // For fetching posts
    creating: false,            // For creating post
    updating: false,            // For updating post
    deleting: false,            // For deleting post
    togglingLike: false,        // For like toggle
    fetchingSingle: false,       // For fetching single post

    // Error states
    error: null,
    createError: null,
    updateError: null,
    deleteError: null,
    fetchError: null,
    toggleLikeError: null,
    singleError: null,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        // Clear errors
        clearErrors: (state) => {
            state.error = null
            state.createError = null
            state.updateError = null
            state.deleteError = null
            state.fetchError = null
            state.toggleLikeError = null
            state.singleError = null
        },

        clearCurrentPost: (state) => {
            state.currentPost = null
            state.singleError =  null
        },

        // Update post locally (for optimistic updates)
        updatePostLocally: (state, action) => {
            const { postId, updateData } = action.payload
            const postIndex = state.posts.findIndex(post => post.id === postId)
            if (postIndex !== -1) {
                state.posts[postIndex] = {...state.posts[postIndex], ...updateData}
            }
            if (state.currentPost && state.currentPost.id === postId){
                state.currentPost = {...state.currentPost, ...updateData}
            }
        },

        // Toggle like locally (optimistic update)
        toggleLikeLocally: (state, action) => {
            const postId = action.payload
            const post = state.posts.find(p => p.id === postId)
            if(post){
                post.isLiked = !post.isLiked
                post.likes_count += post.isLiked ? 1 : -1
            }

            if (state.currentPost?.post?.id === postId){
                const p = state.currentPost.post
                p.isLiked = !p.isLiked
                p.likes_count += p.isLiked ? 1 : -1 
            }
        },
    },

    extraReducers: (builder) => {
        builder

        // ========= Fetch all posts =========
        .addCase(fetchAllPosts.pending, (state) => {
            state.loading = true
            state.fetchError = null
        })
        .addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.loading = false
            const {posts, pagination} = action.payload
            state.posts = posts
            state.pagination = pagination
        })
        .addCase(fetchAllPosts.rejected, (state, action) => {
            state.loading = false
            state.fetchError = action.payload || action.error?.message
        })

        // ========= Create Post ===========
        builder
        .addCase(createPost.pending, (state) => {
            state.creating = true
            state.createError = null
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.creating = false
            state.posts.unshift(action.payload)
        })
        .addCase(createPost.rejected, (state, action) => {
            state.creating = false
            state.createError = action.payload || action.error?.message
        })

        // ========= Update Post ===========
        builder
        .addCase(updatePost.pending, (state) => {
            state.updating = true
            state.updateError = null
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            state.updating = false
            const updatePost = action.payload

            const index = state.posts.findIndex(post => post.id === updatePost.id)
            if (index !== -1){
                state.posts[index] = updatePost
            }
            if(state.currentPost?.id === updatePost.id){
                state.currentPost = updatePost
            }
        })
        .addCase(updatePost.rejected, (state, action) => {
            state.updating = false
            state.updateError = action.payload || action.error?.message
        })

        // ========= Delete Post ===========
        builder
        .addCase(deletePost.pending, (state) => {
            state.deleting = true
            state.deleteError = null
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.deleting = false
            const deletedId = action.payload.id

            state.posts = state.posts.filter( post => post.id !== deletedId)
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.deleting = false
            state.deleteError = action.payload || action.error?.message
        })

        // ========= Fetch single Post with comments ===========
        builder
        .addCase(fetchPostByIdWithComments.pending, (state) => {
            state.fetchingSingle = true
            state.singleError = null
        })
        .addCase(fetchPostByIdWithComments.fulfilled, (state, action) => {
            state.fetchingSingle = false
            state.currentPost = action.payload
        })
        .addCase(fetchPostByIdWithComments.rejected, (state, action) => {
            state.fetchingSingle = false
            state.singleError = action.payload || action.error?.message
        })

        // ========= Toggle like ===========
        builder
        .addCase(toggleLikeOnPost.pending, (state) => {
            state.togglingLike = true
            state.toggleLikeError = null
        })
        .addCase(toggleLikeOnPost.fulfilled, (state, action) => {
            state.togglingLike = false

            const {postId, liked} = action.payload

            const post = state.posts.find( p => p.id === postId)
            if(post){
                post.isLiked = liked
                post.likes_count += liked ? 1 : -1
            }

            if(state.currentPost?.post?.id === postId){
                state.currentPost.post.isLiked = liked
                state.currentPost.post.likes_count += liked ? 1 : -1
            }
        })
        .addCase(toggleLikeOnPost.rejected, (state, action) => {
            state.togglingLike = false
            state.toggleLikeError = action.payload || action.error?.message
        })

    }
})


export const { toggleLikeLocally } = postSlice.actions
export default postSlice.reducer