import { PostSkeleton } from "./Skeletons/postSkeleton"
export function CommentSection({ comments, loading }) {

    const safeComments = Array.isArray(comments)
        ? comments.filter(Boolean)
        : []

    if (safeComments.length === 0) {
        return (
            <p className="text-sm italic text-gray-500">
                No comments yet. Be the first to comment!
            </p>
        )
    }

    const formatTimestamp = (date) => {
        const now = new Date()
        const diffMs = now - date
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Just now'
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        return `${diffDays}d ago`
    }




    return (
        <div className="max-w-xl pl-4 space-y-3 border-l-2 border-gray-200">
            {loading ? (
                <p>
                    { Array.from({ length: safeComments.length }).map((_, i) => (
                        < PostSkeleton key={i} />
                    )) }
                </p>
            ) : (
                safeComments.map(comment => (
                    <div key={comment.id} className="flex max-w-lg gap-2">
                        <div className="flex items-center justify-center flex-shrink-0 text-xs font-semibold text-white rounded-full w-7 h-7 bg-gradient-to-br from-blue-400 to-cyan-400">
                            {comment.user?.username?.[0]?.toUpperCase() || 'G'}
                        </div>

                        <div className="flex-1">
                            <div className="px-3 py-2 bg-gray-100 rounded-lg">
                                <div className="flex gap-2">
                                    <span className="text-sm font-semibold text-gray-900">
                                        {comment.user?.username || 'Guest'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {formatTimestamp(new Date(comment.created_at))}
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-gray-800">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
            
        </div>
    )
}
