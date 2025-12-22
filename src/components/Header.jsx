import { Sparkle, User } from 'lucide-react'

export function Header(){
    return (
        <header className='sticky top-0 z-10 bg-white border-b border-gray-200'>
            <div className='flex items-center justify-between max-w-2xl px-4 py-4 mx-auto'>
                
                <div className="flex items-center gap-2">
                    <Sparkle className="text-purple-600 w-7 h-7"/>
                    <h1 className="text-2xl font-bold text-gray-900">ThoughtSpace</h1>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 text-purple-700 bg-purple-100 rounded-full">
                    <User className="w-5 h-5"/>
                    <span>Guest</span>
                </div>
                
            </div>
        </header>
    )
}