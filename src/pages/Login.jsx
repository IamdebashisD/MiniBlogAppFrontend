import React, { useState } from 'react'
import {loginUser} from '../features/auth/authThunks'
import { useSelector, useDispatch } from 'react-redux'

function Login() {
  const {loading, error} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) =>{
    event.preventDefault()

    if(email.trim() && password.trim()){
      const payloadLoginData = {
        email, password
      }
      console.log(payloadLoginData)
      dispatch(loginUser(payloadLoginData))
      setEmail('')
      setPassword('')
    } 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

        <div className='w-full max-w-md p-8 bg-white shadow-lg rounded-2xl'>

        <h2 className="mb-6 text-2xl font-semibold text-center">
          Sign in
        </h2>
            <form onSubmit={handleLogin} className='space-y-4'>

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
                    >{loading ? 'Logining...' : 'Login'}
                </button>

            </form>

        </div>

    </div>
  )
}

export default Login