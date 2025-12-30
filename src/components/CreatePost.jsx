import {useState} from 'react'
import { Send } from 'lucide-react'
import { createPost } from '../features/posts/postThunks'
import { useDispatch } from 'react-redux'

export function CreatePost() {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    
    const handleSubmit = (event) => {
        event.preventDefault()
        if(title.trim() && content.trim()){
            const payload = { title, content}
            dispatch(createPost(payload))
            setTitle('')
            setContent('')
        }
    } 

  return (
    <div className="p-4 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto">

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    placeholder='Title'
                    maxLength={100}
                    className='w-full p-4 mb-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                />
                <textarea
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    maxLength={1000}
                />

                <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">
                        {content.length}/1000
                    </span>
                    
                    <button
                        type='submit'
                        disabled={ !title.trim() || !content.trim() }
                        className="flex items-center gap-2 px-6 py-2 text-white transition-colors bg-purple-600 rounded-full hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4"/>
                        Post
                    </button>
                </div>
            </form>

        </div>
    </div>
  )
}
