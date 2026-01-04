export function CreatePostSkeleton() {
    return (
        // full width divider (important)
        <div className="w-full bg-white border-b border-gray-200 animate-pulse">
            <div className="max-w-2xl p-4 mx-auto space-y-4">

                {/* Title input */}
                <div className="w-full h-12 bg-gray-300 rounded-lg" />

                {/* Textarea */}
                <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-300 rounded" />
                    <div className="w-full h-4 bg-gray-300 rounded" />
                    <div className="w-5/6 h-4 bg-gray-200 rounded" />
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-2">
                    {/* character count */}
                    <div className="w-20 h-3 bg-gray-200 rounded" />

                    {/* post button */}
                    <div className="w-24 bg-gray-300 rounded-full h-9" />
                </div>

            </div>
        </div>
    )
}
