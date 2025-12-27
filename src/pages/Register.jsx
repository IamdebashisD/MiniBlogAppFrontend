import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../features/auth/authThunks'

import view from '../assets/likeandUnlike/view.png'
import hidden from '../assets/likeandUnlike/hidden.png'

function Register() {
    const dispatch = useDispatch()
    const {loading, error} = useSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    


    const handleRegister = (event) => {
        event.preventDefault()

        if(username.trim() && email.trim() && password.trim()){
            const payloadRegisterData = {
                username, 
                email,
                password
            }
            // console.log(payloadRegisterData)
            dispatch(registerUser(payloadRegisterData))
            setUsername('')
            setEmail('')
            setPassword('')
        }
    } 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

        <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-2xl'>

        <h2 className="mb-6 text-2xl font-semibold text-center">
          Create Account
        </h2>
            <form onSubmit={handleRegister} className='space-y-4'>

                {/* Username */}
                <div>
                    <label className='block mb-1 text-sm font-medium' > 
                        Username (Required field)
                    </label>
                    <input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" 
                        id='username' 
                        className='w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#401B1C]'
                        placeholder='Enter username'
                        required
                    />
                </div>

                {/* Email */}
                <div >
                    <label className='block mb-1 text-sm font-medium'> 
                        Email (Required field)
                    </label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        id='email'
                        className='w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#401B1C]'  
                        placeholder='Enter email'
                        required
                    />
                </div>

                {/* Password */}
                <div >  
                    <label className='block mb-1 text-sm font-medium'> 
                        Password (Required field)
                    </label> 
                    <div className='relative'>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            type={showPassword ? "text": "password"} 
                            id='userPassword' 
                            className='w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#401B1C]' 
                            placeholder='Enter password'
                            required
                        />
                        <span
                            className='absolute inset-y-0 flex items-center cursor-pointer right-3'
                            onClick={()=>setShowPassword(prev => !prev)}
                        >
                            <img src={showPassword ? hidden: view} alt='eye' width={15} height={14} />
                        </span>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <p className='text-sm text-center text-red-500'>
                        {error}
                    </p>
                )}

                <button
                    disabled={loading}
                    className='px-6 py-3 text-white bg-[#401B1C] hover:bg-[#2E1314] rounded-lg'
                    >{loading ? 'Registering...' : 'Register'}
                </button>

            </form>

        </div>

    </div>
  )
}

export default Register