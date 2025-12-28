import { useCallback, useEffect, useState } from 'react'
import { Heart, MessageCircle, Send } from 'lucide-react'
import { CommentSection } from './CommentSection.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLikeOnPost } from '../features/posts/postThunks.js'
import { toggleLikeLocally } from '../features/posts/postSlice.js'
import { fetchCommentsByPostId, addComment } from '../features/comments/commentThunks.js'


export function Post({ post }) {
    const dispatch = useDispatch()
    const [showComments, setShowComments] = useState(false)
    const [commentText, setCommentText] = useState('')

    const onLike = () => {
        dispatch(toggleLikeLocally(post.post_id))
        dispatch(toggleLikeOnPost(post.post_id))
    }


    const handleShowComments = () => {
        setShowComments(!showComments)
    }

    const formatTimestamp = useCallback((date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    }, []);



    const commentsState = useSelector(state => state.comments.commentsByPostId[post.post_id]);

    const comments = commentsState?.items || []
    const totalComments = commentsState?.total || 0
    const addLoading = commentsState?.addLoading || false
    const commentLoading = commentsState?.loading || false



    useEffect(() => {
        if(!commentsState){
            dispatch(fetchCommentsByPostId(post.post_id))
        }
    }, [dispatch, post.post_id]);

    
    const handleCommentSubmit = (event) => {
        event.preventDefault()

        if (!commentText.trim()) return 
        dispatch(addComment({
            post_id: post.post_id,
            content: commentText
        }))
        
        setCommentText('')
    }



    return (
        <div className="p-4 transition-colors bg-white border-b border-gray-200 hover:bg-gray-50">
            <div className="max-w-2xl mx-auto">
                {/* Post Header */}
                <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                        {post.user?.username?.[0]?.toUpperCase() || 'G'}
                    </div>
                    <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{(post?.user?.username)?.length < 20 ? post.user?.username : post.user?.username.slice(0, 15)}</span>
                            <span className="text-sm text-gray-500">
                                {formatTimestamp(new Date(post.created_at))}
                            </span>
                        </div>

                        {/* Post Title */}
                        {post.title && (
                            <h3 className="mt-2 font-semibold leading-normal text-gray-800">{post.title}</h3>
                        )}

                        {/* Post Content */}
                        <p className="mt-2 text-gray-800 whitespace-pre-wrap">{post.content}</p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-6 mt-4">
                            <button
                                onClick={() => onLike(post.post_id)}
                                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-red-500 group"
                            >
                                <Heart
                                    className={`w-5 h-5 ${post.is_liked ? 'fill-red-500 text-red-500' : 'group-hover:scale-110'} transition-transform`}
                                    
                                />
                                <span className={post.is_liked ? 'text-red-500' : ''}>
                                    {post.likes_count}
                                </span>
                            </button>

                            <button
                                onClick={handleShowComments}
                                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-purple-600"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>{totalComments}</span>
                            </button>
                        </div>

                        {/* Comments Section */}
                        {showComments && (
                            <div className="mt-4 space-y-3">
                                <CommentSection comments={comments} loading={commentLoading} />

                                {/* Add Comment */}
                                <form onSubmit={handleCommentSubmit} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Write a comment..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <button
                                        type="submit"
                                        disabled={addLoading || !commentText.trim()}
                                        className="px-4 py-2 text-white transition-colors bg-purple-600 rounded-full hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                       {addLoading ? 'adding...' : <Send className="w-4 h-4" />}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}