export function PostSkeleton() {
    return (
        <div className="w-full max-w-2xl p-4 mx-auto space-y-3 bg-white border-b border-gray-200 animate-pulse">

            {/* Header: avatar + username + time */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />

                <div className="flex items-baseline gap-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-28" />
                    <div className="w-10 h-4 bg-gray-300 rounded" />
                </div>
            </div>

            {/* Title */}
            <div className="w-3/4 h-4 bg-gray-300 rounded" />

            {/* Content */}
            <div className="space-y-2">
                <div className="w-full h-3 bg-gray-300 rounded" />
                <div className="w-11/12 h-3 bg-gray-300 rounded" />
                <div className="w-5/6 h-3 bg-gray-200 rounded" />
            </div>

            {/* Actions */}
            <div className="flex gap-6 pt-2">
                <div className="w-10 h-4 bg-gray-300 rounded" />
                <div className="w-10 h-4 bg-gray-300 rounded" />
            </div>

        </div>
    )
}
