import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../features/auth/authThunks'

function Register() {
    const dispatch = useDispatch()
    const {loading, error} = useSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleRegister = (event) => {
        event.preventDefault()

        if(username.trim() && email.trim() && password.trim()){
            const payloadRegisterData = {
                username, 
                email,
                password
            }
            console.log(payloadRegisterData)
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
                        Username 
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
                        Email
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
                <div>  
                    <label className='block mb-1 text-sm font-medium'> 
                        Password
                    </label> 
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        id='password' 
                        className='w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#401B1C]' 
                        placeholder='Enter password'
                        required
                    />
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