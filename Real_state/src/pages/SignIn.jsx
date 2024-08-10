import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector, } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth';

function SignIn() {
   const [formData, setFormData] = useState({});

   const { loading, error } = useSelector((state) => state.user)

   const navigate = useNavigate();

   const dispatch = useDispatch();
   const handlechange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value
      })

   };
   // console.log(formData);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {

         // setLoading(true)\

         dispatch(signInStart())

         const res = await fetch('http://localhost:4000/Api/auth/sign-in', {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
         });

         const data = await res.json()
         console.log(data)

         if (data.success === false) {
            dispatch(signInFailure(data.message))
            // setError(data.message);
            // setLoading(false)
            return;
         }
         // setLoading(false)
         // setError(null)

         dispatch(signInSuccess(data))
         navigate('/')
      } catch (error) {

         dispatch(signInFailure(error.message))
         // setLoading(false);
         // setError(error.message)

      }
   }

   return (
      <>
         <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4' >

               <input onChange={handlechange} type="text" placeholder='Emai' className='border p-3 rounded-lg ' id='email' />

               <input onChange={handlechange}
                  type="text" placeholder='password' className='border p-3 rounded-lg ' id='password' />

               <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase  hover:opacity-95 disabled:opacity-85'>{loading ? 'Loading...' : 'Sign Up'}</button>

               <OAuth />

            </form>

            <div className='flex gap-2 mt-5'>
               <p>Don't Have an account?</p>
               <Link to={'/sign-up'}>
                  <span className='text-blue-700'>Sign up</span>
               </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
         </div>
      </>
   )
}

export default SignIn;